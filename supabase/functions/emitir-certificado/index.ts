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
// Registra, no banco de certificados, o código verificador gerado localmente pelo app
// ao emitir o PDF de conclusão do curso Cidadão Digital Seguro. É esse registro que
// permite ao módulo de multiplicadores validar o código como pertencente a um
// certificado real, sem expor a tabela nem a service role key ao cliente.
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
  let payload;
  try {
    payload = await req.json();
  } catch  {
    return jsonResponse({
      ok: false,
      error: "corpo_invalido"
    }, 400, headers);
  }
  const codigo = String(payload?.codigo || "").trim().toUpperCase();
  const nome = String(payload?.nome || "").trim().slice(0, 200);
  if (!/^CDS-[A-Z0-9]{1,10}-[A-Z0-9]{5,12}$/.test(codigo)) {
    return jsonResponse({
      ok: false,
      error: "codigo_invalido"
    }, 400, headers);
  }
  const { error } = await client.from("certificados").insert({
    codigo,
    nome_participante: nome || null,
    tipo: "curso"
  });
  if (error && error.code !== "23505") {
    return jsonResponse({
      ok: false,
      error: "erro_ao_registrar"
    }, 500, headers);
  }
  return jsonResponse({
    ok: true
  }, 200, headers);
});
