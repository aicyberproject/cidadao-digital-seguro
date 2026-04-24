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
        'Segurança digital também é cidadania. Ela afeta banco, consumo, trabalho, comunicação, acesso a serviços públicos, compras online e proteção da vida privada.',
        'Prevenir crimes cibernéticos não depende apenas de conhecimento técnico avançado. Depende, sobretudo, de reconhecer riscos, confirmar informações por canais oficiais e saber qual instituição deve ser acionada em cada situação.',
        'Neste módulo, o participante entende o papel institucional da Polícia Federal, do Ministério da Justiça e Segurança Pública e da FEBRABAN dentro de um ecossistema de prevenção, orientação, articulação e resposta a incidentes digitais.',
      ],
    },
    {
      type: 'scenario',
      title: 'Pergunta mobilizadora',
      prompt:
        'Imagine que você recebeu uma mensagem dizendo que sua conta bancária será bloqueada em 10 minutos. Ao mesmo tempo, viu uma campanha pública alertando para golpes digitais. Quem orienta preventivamente, quem articula políticas públicas, quem atua no setor financeiro e quem pode investigar crimes dentro de sua atribuição?',
    },
    {
      type: 'text',
      title: 'Segurança digital como responsabilidade compartilhada',
      body: [
        'A proteção do cidadão no ambiente digital não é tarefa de uma única instituição. Ela envolve Estado, sistema financeiro, plataformas digitais, empresas, escolas, famílias e o próprio usuário.',
        'Quando uma pessoa identifica um golpe, evita clicar em links suspeitos, preserva provas e comunica o fato pelo canal adequado, ela participa ativamente desse ecossistema de segurança.',
      ],
    },
    {
      type: 'text',
      title: 'O que a PF considera crime cibernético',
      body: [
        'No contexto institucional, crimes cibernéticos incluem fraudes bancárias eletrônicas, crimes de alta tecnologia e outras condutas praticadas com uso de sistemas, redes, dispositivos e serviços digitais.',
        'Isso mostra que crime cibernético não se resume à imagem popular do invasor técnico. Muitas ocorrências envolvem engenharia social, uso indevido de dados pessoais, falsas centrais de atendimento, links maliciosos e manipulação da confiança da vítima.',
      ],
    },
    {
      type: 'text',
      title: 'Papéis institucionais',
      body: [
        'A Polícia Federal exerce função investigativa dentro de sua esfera de atribuição, especialmente quando a natureza do fato, a competência legal ou a dimensão interestadual, internacional ou federal justificam sua atuação.',
        'O Ministério da Justiça e Segurança Pública atua na articulação estratégica, na coordenação de políticas públicas e no fortalecimento de ações nacionais de prevenção e enfrentamento à criminalidade.',
        'A FEBRABAN, como entidade representativa do setor bancário, tem papel relevante na prevenção setorial, na comunicação antifraude, na orientação ao consumidor e na difusão de boas práticas de segurança em transações financeiras.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 1 — Mensagem falsa do banco',
      body: [
        'Uma pessoa recebe SMS informando que sua conta será bloqueada e que precisa clicar em um link para regularizar o acesso. A mensagem cria urgência, usa aparência institucional e tenta retirar a vítima do canal oficial.',
        'Nesse caso, a atitude preventiva correta é não clicar no link, acessar o banco somente pelo aplicativo oficial ou canal conhecido e preservar a mensagem se houver suspeita de tentativa de fraude.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 2 — Campanha pública de prevenção',
      body: [
        'Uma campanha orienta cidadãos a não compartilhar senhas, códigos de autenticação ou dados bancários por telefone. Esse tipo de comunicação não substitui a investigação criminal, mas reduz a exposição coletiva a golpes recorrentes.',
        'A prevenção funciona melhor quando a população reconhece padrões de fraude antes do prejuízo: urgência artificial, promessa de vantagem, pedido de sigilo, solicitação de código e tentativa de migração para canais não oficiais.',
      ],
    },
    {
      type: 'video',
      title: 'Videoaula do módulo',
      description:
        'Explique segurança digital como tema de cidadania, apresente o papel institucional de PF, MJSP e FEBRABAN e mostre por que prevenção, orientação e investigação são dimensões complementares.',
      duration: '6 min',
    },
    {
      type: 'tip',
      title: 'Dica de Especialista',
      text: 'Quando a situação parecer urgente demais, pause antes de agir. Contato recebido nunca substitui verificação por canal oficial. A pressa é uma das ferramentas mais usadas por golpistas.',
    },
    {
      type: 'scam',
      title: 'Momento É Golpe!',
      text: 'Uma suposta central informa risco na sua conta e pede confirmação imediata de dados, senha ou código recebido por SMS. O principal sinal de alerta é a tentativa de criar urgência antes da verificação independente.',
    },
    {
      type: 'checklist',
      title: 'Checklist de revisão',
      items: [
        'Entendi que segurança digital também é cidadania',
        'Compreendi que a proteção digital envolve Estado, setor privado e comportamento do usuário',
        'Sei diferenciar, em linhas gerais, os papéis de PF, MJSP e FEBRABAN',
        'Reconheço que prevenção, orientação e investigação são dimensões complementares',
        'Sei que canais oficiais devem ser usados para confirmar mensagens suspeitas',
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
        'Analise a seguinte situação: uma pessoa recebeu ligação de suposta central bancária, foi orientada a clicar em um link e depois encontrou uma campanha pública alertando sobre golpes semelhantes. Identifique qual papel pode caber à PF, ao MJSP, à FEBRABAN e ao próprio cidadão.',
      reflection:
        'A PF pode atuar na investigação dentro de sua atribuição; o MJSP atua na articulação estratégica e em políticas públicas; a FEBRABAN orienta o setor financeiro e consumidores; o cidadão deve desconfiar da urgência, confirmar por canais oficiais, não compartilhar códigos e preservar evidências.',
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
      options: [
        'Articulação estratégica e coordenação de políticas públicas',
        'Emissão de boletos bancários',
        'Bloqueio direto de cartão do consumidor',
        'Venda de antivírus',
      ],
      answer: 0,
    },
    {
      question: 'A prevenção ganhou centralidade porque:',
      options: [
        'Os golpes deixaram de existir',
        'A vida digital ficou irrelevante',
        'Fraudes digitais exigem coordenação institucional e comportamento preventivo',
        'Senhas já não importam',
      ],
      answer: 2,
    },
    {
      question: 'Em uma mensagem suspeita que cria urgência para clicar em link bancário, a atitude mais segura é:',
      options: [
        'Clicar rapidamente antes do prazo acabar',
        'Responder à mensagem pedindo confirmação',
        'Acessar apenas canais oficiais e preservar a mensagem suspeita',
        'Enviar o código de autenticação para encerrar o problema',
      ],
      answer: 2,
    },
    {
      question: 'Qual alternativa descreve melhor o ecossistema de segurança digital?',
      options: [
        'Um sistema em que apenas o usuário é responsável por evitar crimes',
        'Uma atuação compartilhada entre instituições públicas, setor privado, plataformas e cidadãos',
        'Uma área limitada a especialistas em programação',
        'Um conjunto de medidas que só importa depois do prejuízo',
      ],
      answer: 1,
    },
  ],
}