import { supabase } from './supabaseClient'

// Chamadas ao servidor do curso (#130). O gabarito nunca vem para o cliente: as questões chegam
// sem resposta correta e a conferência acontece nas RPCs. Erros chegam com o código em error.message.

const MENSAGENS_SERVIDOR = {
  nao_autenticado: 'Sua sessão expirou. Entre novamente para continuar.',
  modulo_invalido: 'Módulo inválido.',
  questao_invalida: 'Esta questão não está mais disponível. Refaça o quiz.',
  resposta_invalida: 'Alternativa inválida para esta questão.',
  modulos_pendentes: 'Conclua os seis módulos antes da avaliação final.',
  sem_tentativas: 'As duas tentativas da avaliação final já foram usadas.',
  quiz_ja_aprovado: 'Você já foi aprovado na avaliação final.',
  banco_insuficiente: 'O banco de questões está indisponível no momento. Tente mais tarde.',
  tentativa_invalida: 'Esta tentativa não existe mais. Inicie a avaliação novamente.',
  tentativa_ja_enviada: 'Esta tentativa já foi enviada.',
  respostas_invalidas: 'Não foi possível registrar as respostas. Revise as questões e envie novamente.',
  codigo_invalido: 'Código verificador inválido ou desativado.',
}

export function mensagemDeErroServidor(error) {
  const texto = `${error?.message || ''} ${error?.code || ''}`
  const chave = Object.keys(MENSAGENS_SERVIDOR).find((codigo) => texto.includes(codigo))

  return chave ? MENSAGENS_SERVIDOR[chave] : 'Não foi possível concluir agora. Verifique a conexão e tente novamente.'
}

function exigirCliente() {
  if (!supabase) {
    throw new Error('servico_indisponivel')
  }
  return supabase
}

// Números de módulo (1 a 6) concluídos pelo participante logado. A RLS limita a leitura às próprias linhas.
export async function carregarModulosConcluidos(userId) {
  const cliente = exigirCliente()
  const { data, error } = await cliente.from('progresso_modulos').select('modulo').eq('user_id', userId)

  if (error) throw error

  return new Set((data || []).map((linha) => Number(linha.modulo)))
}

export async function concluirModuloNoServidor(numeroModulo) {
  const cliente = exigirCliente()
  const { error } = await cliente.rpc('concluir_modulo', { p_modulo: numeroModulo })

  if (error) throw error
}

// Formato usado pela interface: `options` mantém a ordem original de alternativas, e a posição
// escolhida é a que vai para o servidor.
export function paraQuestaoUI(item) {
  return {
    id: Number(item.id),
    question: String(item.enunciado || ''),
    options: Array.isArray(item.alternativas) ? item.alternativas.map((texto) => String(texto)) : [],
  }
}

// Sorteio de 10 questões de treino do módulo. Não traz a alternativa correta.
export async function sortearQuestoesModulo(numeroModulo) {
  const cliente = exigirCliente()
  const { data, error } = await cliente.rpc('sortear_questoes_modulo', { p_modulo: numeroModulo })

  if (error) throw error

  return (data || []).map(paraQuestaoUI)
}

// Confere uma resposta de treino. Só o indicador `correta` sai daqui; o gabarito fica no servidor.
export async function responderQuestaoModulo(questaoId, alternativa) {
  const cliente = exigirCliente()
  const { data, error } = await cliente.rpc('responder_questao_modulo', {
    p_questao_id: questaoId,
    p_alternativa: alternativa,
  })

  if (error) throw error

  return { correta: data?.correta === true }
}
