import { Shield } from 'lucide-react'
import { officialLinks } from '../officialLinks'

export const module1 = {
  id: 'm1',
  title: 'Módulo 1 — Ecossistema de Segurança Digital',
  shortTitle: 'Ecossistema de Segurança Digital',
  icon: Shield,
  theme: 'O papel da PF, do MJSP e da FEBRABAN. A importância da prevenção.',
  goal: 'Compreender quem faz o quê no ecossistema institucional de proteção digital.',
  content: [
    {
      type: 'text',
      title: 'Abertura do módulo',
      body: [
        'Segurança digital também é cidadania. Ela afeta banco, consumo, trabalho, comunicação e vida privada.',
        'Neste módulo, o participante entende o papel institucional da Polícia Federal, do Ministério da Justiça e Segurança Pública e da FEBRABAN.',
      ],
    },
    {
      type: 'scenario',
      title: 'Pergunta mobilizadora',
      prompt:
        'Se uma mensagem informa bloqueio de conta e uma campanha pública alerta para golpes bancários, quem investiga, quem articula e quem orienta?',
    },
    {
      type: 'text',
      title: 'O que a PF considera crime cibernético',
      body: [
        'No contexto institucional, crimes cibernéticos incluem fraudes bancárias eletrônicas, crimes de alta tecnologia e outras condutas praticadas com uso de sistemas e redes digitais.',
        'Isso mostra que crime cibernético não se resume à imagem popular do invasor técnico.',
      ],
    },
    {
      type: 'text',
      title: 'Papéis institucionais',
      body: [
        'A PF exerce função investigativa dentro de sua esfera de atribuição. O MJSP atua na articulação estratégica e coordenação de políticas públicas. A FEBRABAN atua na prevenção setorial e comunicação antifraude.',
      ],
    },
    {
      type: 'video',
      title: 'Videoaula do módulo',
      description:
        'Explique segurança digital como tema de cidadania e o papel institucional de PF, MJSP e FEBRABAN.',
      duration: '6 min',
    },
    {
      type: 'tip',
      title: 'Dica de Especialista',
      text: 'Quando a situação parecer urgente demais, pause antes de agir. Contato recebido nunca substitui verificação por canal oficial.',
    },
    {
      type: 'scam',
      title: 'Momento É Golpe!',
      text: 'Uma suposta central informa risco na sua conta e pede confirmação imediata de dados. O principal sinal de alerta é a tentativa de criar urgência antes da verificação independente.',
    },
    {
      type: 'checklist',
      title: 'Checklist de revisão',
      items: [
        'Entendi que segurança digital também é cidadania',
        'Sei diferenciar PF, MJSP e FEBRABAN',
        'Compreendi por que a prevenção ganhou centralidade',
      ],
    },
    {
      type: 'links',
      title: 'Leitura complementar e links oficiais',
      items: officialLinks,
    },
    {
      type: 'activity',
      title: 'Atividade prática',
      prompt:
        'Associe cada instituição à sua função principal e registre mentalmente um caso em que o uso de canal oficial seria indispensável.',
      reflection:
        'PF investiga na sua atribuição, MJSP articula e coordena, FEBRABAN atua fortemente na prevenção setorial.',
    },
  ],
  quiz: [
    {
      question: 'Qual instituição tem papel investigativo em crimes cibernéticos dentro de sua esfera de atribuição?',
      options: ['FEBRABAN', 'Polícia Federal', 'Operadora de telefonia', 'Marketplace'],
      answer: 1,
    },
    {
      question: 'O MJSP atua principalmente em qual dimensão, neste curso?',
      options: ['Articulação estratégica e apoio à população', 'Emissão de boletos', 'Bloqueio de cartão', 'Venda de antivírus'],
      answer: 0,
    },
    {
      question: 'A prevenção ganhou centralidade porque:',
      options: ['Os golpes deixaram de existir', 'A vida digital ficou irrelevante', 'Fraudes digitais exigem coordenação e comportamento preventivo', 'Senhas já não importam'],
      answer: 2,
    },
  ],
}
