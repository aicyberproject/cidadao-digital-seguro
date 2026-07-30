import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Sem as env vars (dev local sem .env, ou build sem os secrets configurados), o app deve
// continuar funcionando normalmente; apenas o gate de acesso do módulo de multiplicadores
// e o registro de certificados ficam indisponíveis, com mensagem explícita ao usuário.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function validarCertificado(codigoBruto) {
  const codigo = String(codigoBruto || '').trim().toUpperCase()

  if (!codigo) {
    return { valido: false, error: 'Informe o código verificador do certificado.' }
  }

  if (!supabase) {
    return {
      valido: false,
      error: 'Serviço de validação de certificado indisponível no momento. Tente novamente mais tarde.',
    }
  }

  const { data, error } = await supabase.rpc('validar_certificado', { p_codigo: codigo })

  if (error) {
    return { valido: false, error: 'Não foi possível validar o código agora. Verifique a conexão e tente novamente.' }
  }

  if (!data?.valido) {
    return { valido: false, error: 'Código verificador não encontrado ou inválido.' }
  }

  return { valido: true, tipo: data.tipo }
}

export function registrarCertificadoEmitido({ codigo, nome, versao }) {
  if (!supabaseUrl || !supabaseAnonKey) return

  fetch(`${supabaseUrl}/functions/v1/emitir-certificado`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ codigo, nome, versao }),
  }).catch(() => {
    // Falha silenciosa: não deve impedir a emissão local do PDF do certificado.
  })
}
