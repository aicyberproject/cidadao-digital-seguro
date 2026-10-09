import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders
    }
  });
}
// Registra, no banco de certificados, o código verificador gerado localmente pelo app
// ao emitir o PDF de conclusão do curso Cidadão Digital Seguro. É esse registro que
// permite ao módulo de multiplicadores validar o código como pertencente a um
// certificado real, sem expor a tabela nem a service role key ao cliente.
Deno.serve(async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  if (req.method !== "POST") {
    return jsonResponse({
      ok: false,
      error: "method_not_allowed"
    }, 405);
  }
  let payload;
  try {
    payload = await req.json();
  } catch  {
    return jsonResponse({
      ok: false,
      error: "corpo_invalido"
    }, 400);
  }
  const codigo = String(payload?.codigo || "").trim().toUpperCase();
  const nome = String(payload?.nome || "").trim().slice(0, 200);
  if (!/^CDS-[A-Z0-9]{1,10}-[A-Z0-9]{5,12}$/.test(codigo)) {
    return jsonResponse({
      ok: false,
      error: "codigo_invalido"
    }, 400);
  }
  const client = createClient(supabaseUrl, serviceRoleKey);
  const { error } = await client.from("certificados").insert({
    codigo,
    nome_participante: nome || null,
    tipo: "curso"
  });
  if (error && error.code !== "23505") {
    return jsonResponse({
      ok: false,
      error: "erro_ao_registrar"
    }, 500);
  }
  return jsonResponse({
    ok: true
  });
});
