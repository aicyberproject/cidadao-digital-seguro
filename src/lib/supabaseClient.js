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

// Emissão do certificado do curso (#130). Exige a sessão do participante: a função confere a tentativa
// aprovada no banco, pega o nome em participantes e gera o código no servidor. O cliente envia só a versão.
// Não lança exceção: devolve { codigo, nome } ou null, e quem chama decide a mensagem para o usuário.
export async function registrarCertificadoEmitido({ accessToken, versao }) {
  if (!supabaseUrl || !supabaseAnonKey || !accessToken) return null

  try {
    const resposta = await fetch(`${supabaseUrl}/functions/v1/emitir-certificado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ versao }),
    })

    const dados = await resposta.json().catch(() => null)

    if (!resposta.ok || !dados?.ok || !dados.codigo) return null

    return { codigo: dados.codigo, nome: dados.nome || '' }
  } catch {
    return null
  }
}
