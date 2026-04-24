import { FileCheck } from 'lucide-react'

export const module6 = {
  id: 'm6',
  title: 'Módulo 6 — Resposta a Incidentes e Denúncia',
  shortTitle: 'Resposta a Incidentes e Denúncia',
  icon: FileCheck,
  theme: 'Furto de celular, contenção de danos, preservação de provas e canais de denúncia.',
  goal: 'Ensinar o participante a responder com método quando o incidente já aconteceu.',
  content: [
    {
      type: 'text',
      title: 'Abertura do módulo',
      body: [
        'Quando o incidente já aconteceu, a qualidade da primeira reação influencia muito o tamanho do prejuízo e a utilidade da prova digital.',
        'A lógica deste módulo é simples: conter, preservar, registrar e encaminhar.',
      ],
    },
    {
      type: 'scenario',
      title: 'Pergunta mobilizadora',
      prompt: 'Após o furto do celular, surgem tentativas de Pix, mensagens a familiares e alertas de redefinição de senha. O que deve ser feito primeiro?',
    },
    {
      type: 'text',
      title: 'Contenção e furto de celular',
      body: [
        'Furto de celular é incidente patrimonial e digital ao mesmo tempo. Banco, cartão, chip SIM, IMEI e contas principais exigem contenção rápida.',
      ],
    },
    {
      type: 'text',
      title: 'Preservação de provas e canal adequado',
      body: [
        'Prints, mensagens, links, comprovantes, números, perfis e horários devem ser preservados. Além de banco, operadora e plataforma, é preciso compreender o uso correto do Comunica PF e da Polícia Civil.',
      ],
    },
    {
      type: 'video',
      title: 'Videoaula do módulo',
      description: 'Resposta a incidentes, furto de celular, preservação de provas e canais corretos de encaminhamento.',
      duration: '9 min',
    },
    {
      type: 'tip',
      title: 'Dica de Especialista',
      text: 'Em incidente digital, não tente fazer tudo ao mesmo tempo. Faça primeiro o que reduz o dano e protege a prova.',
    },
    {
      type: 'scam',
      title: 'Momento É Golpe!',
      text: 'Após o furto do aparelho, o criminoso envia mensagens para seus contatos pedindo dinheiro. O foco imediato deve ser conter acessos críticos e preservar evidências do uso indevido.',
    },
    {
      type: 'checklist',
      title: 'Checklist de resposta',
      items: [
        'Sei bloquear banco, cartões e chip SIM com prioridade',
        'Sei o que preservar como prova digital',
        'Consigo organizar um relato mínimo do fato',
        'Entendo a diferença entre Comunica PF e Polícia Civil',
      ],
    },
    {
      type: 'links',
      title: 'Links oficiais e leituras complementares',
      items: [
        { label: 'PF — Comunicação de crimes', url: 'https://www.gov.br/pf/pt-br/canais_atendimento/comunicacao-de-crimes' },
        { label: 'PF — Combate a crimes cibernéticos', url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos' },
      ],
    },
    {
      type: 'activity',
      title: 'Atividade prática',
      prompt: 'Organize a sua sequência ideal de reação para um incidente digital com furto de celular, tentativa de fraude bancária e necessidade de registro oficial.',
      reflection: 'A ordem esperada começa com contenção do dano, segue para preservação da prova, organização do relato e uso do canal institucional adequado.',
    },
  ],
  quiz: [
    {
      question: 'Após o furto do celular, uma prioridade imediata é:',
      options: ['Esperar o dia seguinte', 'Bloquear acessos bancários e o chip', 'Apagar todas as mensagens', 'Trocar o papel de parede'],
      answer: 1,
    },
    {
      question: 'Qual conjunto representa melhor prova digital inicial?',
      options: ['Só memória da vítima', 'Prints, mensagens, links, comprovantes e horários', 'Apenas foto do aparelho', 'Somente um comentário em rede social'],
      answer: 1,
    },
    {
      question: 'Usar o canal correto significa:',
      options: ['Improvisar em qualquer lugar', 'Ignorar banco e plataforma', 'Entender a natureza do caso e acionar as instituições adequadas', 'Postar em grupo de mensagens'],
      answer: 2,
    },
  ],
}
