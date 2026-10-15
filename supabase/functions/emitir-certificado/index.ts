import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
// Produção e preview compartilham a mesma origem, porque o cabeçalho Origin não tem caminho.
const ORIGENS_PERMITIDAS = [
  "https://aicyberproject.github.io",
  "http://localhost:5173"
];
// Tentativas por IP em uma hora. Alto de propósito: muitos servidores compartilham o mesmo IP de saída.
const LIMITE_POR_HORA = 100;
// Alfabeto sem caracteres ambíguos (0/O, 1/I), para o código ser lido e digitado sem erro.
const ALFABETO_CODIGO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const HEADERS_BASE = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin"
};
function headersPara(origin) {
  return origin ? { ...HEADERS_BASE, "Access-Control-Allow-Origin": origin } : { ...HEADERS_BASE };
}
function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}
// IP do cliente, guardado só como hash. O segredo do próprio servidor serve de salt e nunca sai dele.
// Assume que o primeiro valor de x-forwarded-for é o IP de origem: confirmar em teste antes de depender do limite.
async function hashDoIp(req) {
  const ip = (req.headers.get("x-forwarded-for") || "desconhecido").split(",")[0].trim();
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${serviceRoleKey}:${ip}`));
  return Array.from(new Uint8Array(digest)).map((b)=>b.toString(16).padStart(2, "0")).join("");
}
// Código no formato CDS-<versão>-<8 caracteres>, gerado aleatoriamente no servidor.
function gerarCodigo(versao) {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let sufixo = "";
  for (const b of bytes) {
    sufixo += ALFABETO_CODIGO[b % ALFABETO_CODIGO.length];
  }
  return `CDS-${versao}-${sufixo}`;
}
// Emissão só para quem tem tentativa aprovada no quiz final (#130). O nome vem de participantes,
// nunca do corpo da requisição, e o código é gerado aqui. Um certificado por participante no curso.
Deno.serve(async (req)=>{
  const origin = req.headers.get("origin");
  // Navegadores enviam Origin em toda chamada cross-origin. Origem fora da lista é recusada.
  // Curl e scripts não são barrados aqui: o limite por IP é que contém esses casos.
  if (origin && !ORIGENS_PERMITIDAS.includes(origin)) {
    return jsonResponse({
      ok: false,
      error: "origem_nao_permitida"
    }, 403, { Vary: "Origin" });
  }
  const headers = headersPara(origin);
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers
    });
  }
  if (req.method !== "POST") {
    return jsonResponse({
      ok: false,
      error: "method_not_allowed"
    }, 405, headers);
  }
  const client = createClient(supabaseUrl, serviceRoleKey);
  // Conta a tentativa antes de validar o corpo, para que tentativas inválidas também contem.
  // Se o contador falhar, a emissão continua: o certificado tem prioridade sobre o limite.
  const { data: dentroDoLimite, error: erroLimite } = await client.rpc("registrar_tentativa_emissao", {
    p_ip_hash: await hashDoIp(req),
    p_limite: LIMITE_POR_HORA
  });
  if (erroLimite) {
    console.error("rate_limit_indisponivel", erroLimite.message);
  } else if (dentroDoLimite === false) {
    return jsonResponse({
      ok: false,
      error: "limite_excedido"
    }, 429, headers);
  }
  // Identifica o participante pelo token do próprio usuário. Sem token válido, nada é emitido.
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  const { data: dadosUsuario, error: erroUsuario } = token
    ? await client.auth.getUser(token)
    : { data: null, error: { message: "sem_token" } };
  const uid = dadosUsuario?.user?.id;
  if (erroUsuario || !uid) {
    return jsonResponse({
      ok: false,
      error: "nao_autenticado"
    }, 401, headers);
  }
  // A aprovação é conferida no banco. Código enviado pelo cliente não é aceito em nenhum caso.
  const { data: aprovada, error: erroAprovacao } = await client
    .from("tentativas_quiz_final")
    .select("id")
    .eq("user_id", uid)
    .eq("aprovada", true)
    .limit(1)
    .maybeSingle();
  if (erroAprovacao) {
    return jsonResponse({
      ok: false,
      error: "erro_ao_consultar"
    }, 500, headers);
  }
  if (!aprovada) {
    return jsonResponse({
      ok: false,
      error: "quiz_nao_aprovado"
    }, 403, headers);
  }
  const { data: participante, error: erroParticipante } = await client
    .from("participantes")
    .select("nome")
    .eq("user_id", uid)
    .maybeSingle();
  if (erroParticipante || !participante) {
    return jsonResponse({
      ok: false,
      error: "participante_nao_encontrado"
    }, 403, headers);
  }
  // Idempotente: se o participante já tem certificado do curso, devolve o existente.
  const buscarExistente = () =>
    client
      .from("certificados")
      .select("codigo, nome_participante")
      .eq("participante_id", uid)
      .eq("tipo", "curso")
      .maybeSingle();
  const { data: existente, error: erroExistente } = await buscarExistente();
  if (erroExistente) {
    return jsonResponse({
      ok: false,
      error: "erro_ao_consultar"
    }, 500, headers);
  }
  if (existente) {
    return jsonResponse({
      ok: true,
      codigo: existente.codigo,
      nome: existente.nome_participante,
      emitido: false
    }, 200, headers);
  }
  const corpo = await lerCorpo(req);
  const versao = String(corpo?.versao ?? "").replace(/[^0-9]/g, "").slice(0, 10) || "0";
  const nome = String(participante.nome || "").trim().slice(0, 200);
  const { error } = await client.from("certificados").insert({
    codigo: gerarCodigo(versao),
    nome_participante: nome || null,
    tipo: "curso",
    participante_id: uid
  });
  if (error && error.code !== "23505") {
    return jsonResponse({
      ok: false,
      error: "erro_ao_registrar"
    }, 500, headers);
  }
  // Em caso de corrida (23505), a linha que venceu é a que vale: devolve essa.
  const { data: emitido, error: erroFinal } = await buscarExistente();
  if (erroFinal || !emitido) {
    return jsonResponse({
      ok: false,
      error: "erro_ao_registrar"
    }, 500, headers);
  }
  return jsonResponse({
    ok: true,
    codigo: emitido.codigo,
    nome: emitido.nome_participante,
    emitido: true
  }, 200, headers);
});
async function lerCorpo(req) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}
