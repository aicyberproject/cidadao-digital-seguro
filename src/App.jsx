import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import {
  Shield,
  Lock,
  Wifi,
  ShoppingCart,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  ListChecks,
  Award,
  ChevronRight,
  Home,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'

const STORAGE_KEY = 'cidadao-digital-seguro-progress-v2'

const officialLinks = [
  {
    label: 'Polícia Federal — Combate a Crimes Cibernéticos',
    url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos',
  },
  {
    label: 'Comunica PF',
    url: 'https://www.gov.br/pf/pt-br/canais_atendimento/comunicacao-de-crimes',
  },
  {
    label: 'MJSP — Portal oficial',
    url: 'https://www.gov.br/mj/pt-br',
  },
  {
    label: 'FEBRABAN — Portal oficial',
    url: 'https://portal.febraban.org.br/',
  },
]

const courseIntro = {
  title: 'Cidadão Digital Seguro',
  subtitle: 'Prevenção e Combate a Crimes Cibernéticos',
  description:
    'Curso online autoinstrucional com progressão por conclusão de atividades. O participante aprende a identificar sinais de risco, prevenir fraudes e reagir corretamente a incidentes digitais.',
  outcomes: [
    'Reconhecer golpes e ameaças digitais recorrentes',
    'Aplicar higiene digital e proteção de dispositivos',
    'Realizar transações online com mais segurança',
    'Preservar provas e usar o canal correto em caso de incidente',
  ],
}

const modules = [
  {
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
  },
  {
    id: 'm2',
    title: 'Módulo 2 — Pilares da Higiene Digital',
    shortTitle: 'Pilares da Higiene Digital',
    icon: Lock,
    theme: 'Autenticação forte, backup, privacidade e proteção de dados.',
    goal: 'Transformar segurança digital em rotina prática por meio de hábitos consistentes.',
    content: [
      {
        type: 'text',
        title: 'Abertura do módulo',
        body: [
          'Muitos incidentes começam com fragilidades pequenas: senha repetida, ausência de 2FA, falta de backup e exposição desnecessária de dados.',
          'Higiene digital significa rotina, não reação isolada.',
        ],
      },
      {
        type: 'scenario',
        title: 'Pergunta mobilizadora',
        prompt:
          'Se uma pessoa usa a mesma senha em vários serviços e publica detalhes da rotina, o problema começa apenas quando ela clica em um link falso?',
      },
      {
        type: 'text',
        title: 'Autenticação forte',
        body: [
          'Senha sozinha não basta. Contas críticas devem ter senhas fortes, diferentes e verificação em duas etapas sempre que possível.',
        ],
      },
      {
        type: 'text',
        title: 'Backup, privacidade e dados',
        body: [
          'Backup protege a recuperação. Privacidade reduz exposição. Proteção de dados diminui o material disponível para fraude e uso indevido.',
        ],
      },
      {
        type: 'video',
        title: 'Videoaula do módulo',
        description: 'Autenticação forte, backup, privacidade e proteção de dados na rotina digital.',
        duration: '7 min',
      },
      {
        type: 'tip',
        title: 'Dica de Especialista',
        text: 'Configure antes de precisar. Quem ativa proteção antes do incidente reage melhor e sofre menos danos.',
      },
      {
        type: 'scam',
        title: 'Momento É Golpe!',
        text: 'Uma mensagem pede revalidação de conta. O clique foi o gatilho, mas o risco já era maior porque a conta não tinha 2FA e a senha era repetida.',
      },
      {
        type: 'checklist',
        title: 'Checklist de revisão',
        items: [
          'Tenho 2FA nas contas mais importantes',
          'Tenho backup ativo e funcional',
          'Revisei permissões e exposição de dados',
          'Forneço apenas as informações necessárias em cadastros',
        ],
      },
      {
        type: 'links',
        title: 'Leituras complementares',
        items: [
          { label: 'PF — Fascículos de segurança digital', url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos' },
          { label: 'PF — Orientações de proteção digital', url: 'https://www.gov.br/pf/pt-br' },
        ],
      },
      {
        type: 'activity',
        title: 'Atividade prática',
        prompt: 'Monte um plano pessoal com quatro ações imediatas: senha, 2FA, backup e revisão de privacidade.',
        reflection: 'Exemplos: ativar 2FA no e-mail, trocar senhas repetidas, configurar backup automático e revisar permissões do celular.',
      },
    ],
    quiz: [
      {
        question: 'Qual medida adiciona uma segunda camada de proteção ao login?',
        options: ['Tema escuro', 'Verificação em duas etapas', 'Print da senha', 'Compartilhar código por telefone'],
        answer: 1,
      },
      {
        question: 'Backup serve principalmente para:',
        options: ['Aumentar likes', 'Evitar toda fraude', 'Permitir recuperação e continuidade', 'Substituir senha forte'],
        answer: 2,
      },
      {
        question: 'Uma prática coerente de proteção de dados é:',
        options: ['Publicar tudo', 'Aceitar qualquer permissão', 'Fornecer apenas o necessário', 'Repetir a mesma senha'],
        answer: 2,
      },
    ],
  },
  {
    id: 'm3',
    title: 'Módulo 3 — Proteção de Dispositivos e Redes',
    shortTitle: 'Proteção de Dispositivos e Redes',
    icon: Wifi,
    theme: 'Celulares, tablets, computadores, redes Wi-Fi e trabalho remoto.',
    goal: 'Proteger o ambiente técnico em que a vida digital acontece.',
    content: [
      {
        type: 'text',
        title: 'Abertura do módulo',
        body: [
          'O celular concentra banco, e-mail, mensagens e autenticação. O computador concentra arquivos e trabalho. O roteador conecta tudo isso.',
          'Segurança digital também depende do ambiente técnico.',
        ],
      },
      {
        type: 'scenario',
        title: 'Pergunta mobilizadora',
        prompt: 'Se alguém instala um aplicativo suspeito em um celular usado para banco e e-mail, o problema está apenas no clique ou também no ambiente técnico?',
      },
      {
        type: 'text',
        title: 'Dispositivos móveis e computadores',
        body: [
          'Atualização, lojas oficiais, tela protegida, permissões controladas e proteção do chip SIM são medidas fundamentais em dispositivos móveis.',
          'No computador, atualização, antivírus, firewall e criptografia reduzem a superfície de ataque.',
        ],
      },
      {
        type: 'text',
        title: 'Redes Wi-Fi e trabalho remoto',
        body: [
          'O roteador precisa de senha forte, criptografia atual e firmware atualizado. No trabalho remoto, uso pessoal e profissional devem ser separados.',
        ],
      },
      {
        type: 'video',
        title: 'Videoaula do módulo',
        description: 'Proteção de celulares, computadores, roteadores, conexões públicas e trabalho remoto seguro.',
        duration: '8 min',
      },
      {
        type: 'tip',
        title: 'Dica de Especialista',
        text: 'O invasor procura o elo mais fácil, não necessariamente o mais importante.',
      },
      {
        type: 'scam',
        title: 'Momento É Golpe!',
        text: 'Um suposto suporte envia link para instalar aplicativo fora da loja oficial. O golpe se apoia em engenharia social e em falha técnica de instalação indevida.',
      },
      {
        type: 'checklist',
        title: 'Checklist técnico',
        items: [
          'Meu celular está atualizado',
          'Uso bloqueio de tela forte e PIN no chip SIM',
          'Meu roteador tem senha alterada e criptografia adequada',
          'Meu ambiente de trabalho remoto usa canais e práticas seguras',
        ],
      },
      {
        type: 'links',
        title: 'Leituras complementares',
        items: [
          { label: 'PF — Segurança em celulares e tablets', url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos' },
          { label: 'PF — Segurança de redes e trabalho remoto', url: 'https://www.gov.br/pf/pt-br' },
        ],
      },
      {
        type: 'activity',
        title: 'Atividade prática',
        prompt: 'Faça um diagnóstico rápido do seu ambiente digital: celular, computador, roteador e contexto de trabalho remoto.',
        reflection: 'Identifique ao menos duas melhorias imediatas em dispositivos e duas na rede ou rotina de conexão.',
      },
    ],
    quiz: [
      {
        question: 'Instalar aplicativo recebido por link, fora da loja oficial, é:',
        options: ['Boa prática', 'Atalho seguro', 'Conduta de risco', 'Forma de backup'],
        answer: 2,
      },
      {
        question: 'A proteção do chip SIM é importante porque:',
        options: ['Aumenta a bateria', 'Evita uso indevido da linha para códigos SMS', 'Melhora o Wi-Fi', 'Substitui 2FA'],
        answer: 1,
      },
      {
        question: 'No trabalho remoto, uma boa prática é:',
        options: ['Misturar contas pessoais e corporativas', 'Usar links aleatórios', 'Utilizar canais oficiais e, quando aplicável, VPN', 'Desativar atualização'],
        answer: 2,
      },
    ],
  },
  {
    id: 'm4',
    title: 'Módulo 4 — Transações e Consumo Seguro',
    shortTitle: 'Transações e Consumo Seguro',
    icon: ShoppingCart,
    theme: 'Banco via internet e comércio eletrônico.',
    goal: 'Aplicar proteção digital a banco, compras, vendas e pagamentos online.',
    content: [
      {
        type: 'text',
        title: 'Abertura do módulo',
        body: [
          'Grande parte dos golpes financeiros começa antes do pagamento: no aplicativo falso, no perfil não verificado, no link clicado ou na negociação fora da plataforma.',
        ],
      },
      {
        type: 'scenario',
        title: 'Pergunta mobilizadora',
        prompt: 'Quando uma oferta parece muito vantajosa e a conversa é desviada para fora da plataforma, o risco começou no pagamento ou antes dele?',
      },
      {
        type: 'text',
        title: 'Banco via internet e apps financeiros',
        body: [
          'Apps oficiais, sistema atualizado, senha forte, limites adequados, notificações e cartão virtual reduzem risco e prejuízo.',
        ],
      },
      {
        type: 'text',
        title: 'Comércio eletrônico e pagamento seguro',
        body: [
          'Compra segura depende de verificar URL, perfil oficial, reputação da plataforma e do vendedor, além da permanência da negociação no ambiente legítimo.',
        ],
      },
      {
        type: 'video',
        title: 'Videoaula do módulo',
        description: 'Apps bancários, limites, alertas, comércio eletrônico, perfis oficiais e conferência de pagamento.',
        duration: '8 min',
      },
      {
        type: 'tip',
        title: 'Dica de Especialista',
        text: 'Em transações digitais, a pressa é uma aliada do golpista. Verificar é parte do pagamento seguro.',
      },
      {
        type: 'scam',
        title: 'Momento É Golpe!',
        text: 'Uma promoção leva a página parecida com a oficial, seguida de pagamento por Pix. O golpe se construiu por etapas: anúncio, canal, oferta e conferência insuficiente.',
      },
      {
        type: 'checklist',
        title: 'Checklist de conferência',
        items: [
          'Verifico canal e reputação antes da operação',
          'Mantenho a negociação dentro da plataforma oficial',
          'Confiro destinatário do Pix ou beneficiário do boleto',
          'Se algo der errado, sei o que preservar como prova',
        ],
      },
      {
        type: 'links',
        title: 'Leituras complementares',
        items: [
          { label: 'PF — Segurança em banco via internet', url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos' },
          { label: 'PF — Segurança em comércio eletrônico', url: 'https://www.gov.br/pf/pt-br' },
        ],
      },
      {
        type: 'activity',
        title: 'Atividade prática',
        prompt: 'Simule a verificação de uma compra online: canal, reputação, forma de pagamento e sinais de fraude.',
        reflection: 'A sequência esperada envolve verificação do ambiente, do vendedor, da forma de pagamento e da confirmação final dos dados críticos.',
      },
    ],
    quiz: [
      {
        question: 'Qual prática aumenta bastante o risco em marketplaces?',
        options: ['Negociar fora da plataforma', 'Ler avaliações', 'Usar app oficial', 'Conferir Pix'],
        answer: 0,
      },
      {
        question: 'Antes de fazer um Pix, é essencial:',
        options: ['Confiar no print', 'Conferir o destinatário', 'Acelerar a transação', 'Ignorar notificações'],
        answer: 1,
      },
      {
        question: 'Cartão virtual ajuda porque:',
        options: ['Substitui toda cautela', 'Dispensa conferência', 'Reduz exposição do cartão físico em compras online', 'Impede todos os golpes'],
        answer: 2,
      },
    ],
  },
  {
    id: 'm5',
    title: 'Módulo 5 — Catálogo de Ameaças e Golpes',
    shortTitle: 'Catálogo de Ameaças e Golpes',
    icon: AlertTriangle,
    theme: 'Tipologias de fraudes, códigos maliciosos e vazamento de dados.',
    goal: 'Reconhecer a lógica dos golpes, seus sinais e suas combinações.',
    content: [
      {
        type: 'text',
        title: 'Abertura do módulo',
        body: [
          'Golpes digitais não são aleatórios. Eles seguem padrões. Quando o cidadão reconhece a tipologia, interrompe a manipulação com mais clareza.',
        ],
      },
      {
        type: 'scenario',
        title: 'Pergunta mobilizadora',
        prompt: 'Uma ligação do banco pede instalação de aplicativo, seguida de link por mensagem. É um golpe só ou uma cadeia de golpes?',
      },
      {
        type: 'text',
        title: 'Golpes de manipulação e de oferta',
        body: [
          'Phishing, falsa central, conta segura e falso perfil usam medo, urgência e autoridade aparente. Falsa venda, falsa taxa e falso investimento usam promessa de vantagem.',
        ],
      },
      {
        type: 'text',
        title: 'Malware, invasão de conta e vazamento de dados',
        body: [
          'Mão fantasma, invasão de conta e malware mostram que muitos golpes também operam por dentro do dispositivo ou da conta da vítima. Vazamentos tornam os golpes mais convincentes.',
        ],
      },
      {
        type: 'video',
        title: 'Videoaula do módulo',
        description: 'Lógica dos golpes, tipologias recorrentes, apoio técnico, malware e vazamento de dados.',
        duration: '9 min',
      },
      {
        type: 'tip',
        title: 'Dica de Especialista',
        text: 'Se a situação estiver confusa, tente nomear a lógica da abordagem: medo, urgência, vantagem, controle do dispositivo ou uso de dados vazados.',
      },
      {
        type: 'scam',
        title: 'Momento É Golpe!',
        text: 'Ligação do banco mais app de suporte, mais link por mensagem, mais tentativa de acesso posterior. Um caso assim pode combinar falsa central, mão fantasma, phishing e invasão de conta.',
      },
      {
        type: 'checklist',
        title: 'Checklist de reconhecimento',
        items: [
          'Reconheço sinais de phishing e falsa central',
          'Sei diferenciar golpe emocional de golpe com apoio técnico',
          'Entendo o que é mão fantasma',
          'Compreendo que vazamento de dados aumenta o risco futuro',
        ],
      },
      {
        type: 'links',
        title: 'Leituras complementares',
        items: [
          { label: 'PF — Glossário de tipologias e orientações de fraude', url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos' },
          { label: 'PF — Materiais sobre códigos maliciosos e vazamento de dados', url: 'https://www.gov.br/pf/pt-br' },
        ],
      },
      {
        type: 'activity',
        title: 'Atividade prática',
        prompt: 'Classifique três situações do cotidiano em tipologias de golpe. Identifique o elemento emocional, o elemento técnico e o principal sinal de alerta.',
        reflection: 'A resposta esperada deve relacionar a situação à tipologia correta e explicar brevemente a lógica usada pelo criminoso.',
      },
    ],
    quiz: [
      {
        question: 'A falsa central é um golpe que se apoia principalmente em:',
        options: ['Autoridade aparente e urgência', 'Desconto real', 'Backup automático', 'Wi-Fi público'],
        answer: 0,
      },
      {
        question: 'Mão fantasma envolve, em geral:',
        options: ['Troca de roteador', 'Instalação de acesso remoto ou mecanismo equivalente', 'Política de privacidade', 'Senha anotada em papel'],
        answer: 1,
      },
      {
        question: 'Após um vazamento de dados, é esperado:',
        options: ['Fim dos riscos', 'Redução de golpes', 'Aumento de tentativas mais personalizadas', 'Dispensa de 2FA'],
        answer: 2,
      },
    ],
  },
  {
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
  },
]

const finalAssessment = [
  {
    question: 'Em um caso com ligação do banco, instalação de app de suporte e link enviado por mensagem, quais tipologias podem estar presentes?',
    options: ['Apenas compra online comum', 'Falsa central, mão fantasma e phishing', 'Somente vazamento de dados', 'Apenas problema técnico legítimo'],
    answer: 1,
  },
  {
    question: 'Diante de furto de celular com apps bancários e e-mail logados, qual é a prioridade inicial mais coerente?',
    options: ['Publicar nas redes sociais primeiro', 'Trocar a capinha do aparelho', 'Conter o dano com bloqueios e proteção dos acessos críticos', 'Ignorar até receber mais mensagens'],
    answer: 2,
  },
  {
    question: 'Qual conjunto descreve melhor uma resposta organizada a incidente digital?',
    options: ['Conter, preservar, registrar e encaminhar', 'Apagar, esquecer, improvisar e esperar', 'Compartilhar, acelerar, arriscar e pagar', 'Mudar de número e nada mais'],
    answer: 0,
  },
  {
    question: 'Em compras online, qual prática aumenta muito o risco?',
    options: ['Conferir reputação', 'Usar app oficial', 'Negociar fora da plataforma', 'Verificar destinatário'],
    answer: 2,
  },
  {
    question: 'Após vazamento de dados, é correto concluir que:',
    options: ['O problema terminou e não há novas ameaças', 'É provável aumento de golpes personalizados', 'Não faz sentido trocar senhas', '2FA perdeu utilidade'],
    answer: 1,
  },
]

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function defaultProgress() {
  const moduleState = Object.fromEntries(
    modules.map((m, index) => [
      m.id,
      {
        unlocked: index === 0,
        contentSeen: {},
        checklist: {},
        activityDone: false,
        videoDone: false,
        quizAnswers: {},
        quizPassed: false,
        completed: false,
      },
    ]),
  )

  return {
    started: false,
    introSeen: false,
    moduleState,
    finalAssessmentAnswers: {},
    finalAssessmentPassed: false,
    certificateUnlocked: false,
  }
}

function scoreQuiz(quiz, answers) {
  let correct = 0
  quiz.forEach((q, i) => {
    if (answers[i] === q.answer) correct += 1
  })
  return { correct, total: quiz.length, passed: correct / quiz.length >= 0.7 }
}

function ProgressBar({ value }) {
  return (
    <div className="progress-shell">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  )
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`.trim()}>{children}</div>
}

function SectionTag({ children }) {
  return <span className="tag">{children}</span>
}

function ModuleProgress({ mod, state }) {
  const totalSteps = mod.content.length + 3
  const seenCount = Object.values(state.contentSeen).filter(Boolean).length
  const checklistDone = Object.keys(state.checklist).length > 0 && Object.values(state.checklist).every(Boolean) ? 1 : 0
  const activityDone = state.activityDone ? 1 : 0
  const videoDone = state.videoDone ? 1 : 0
  const quizDone = state.quizPassed ? 1 : 0
  const percent = Math.min(100, Math.round(((seenCount + checklistDone + activityDone + videoDone + quizDone) / totalSteps) * 100))
  return <ProgressBar value={percent} />
}

function ScreenCard({ title, children, icon: Icon }) {
  return (
    <Card>
      <div className="card-header">
        <div className="icon-title">
          {Icon ? (
            <div className="icon-box">
              <Icon size={18} />
            </div>
          ) : null}
          <h2>{title}</h2>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </Card>
  )
}

export default function App() {
  const [progressState, setProgressState] = useState(defaultProgress())
  const [currentView, setCurrentView] = useState('home')
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0].id)
  const [screenIndex, setScreenIndex] = useState(0)
  const [participantName, setParticipantName] = useState('')

  useEffect(() => {
    const loaded = loadProgress()
    if (loaded) setProgressState(loaded)
  }, [])

  useEffect(() => {
    saveProgress(progressState)
  }, [progressState])

  const selectedModule = useMemo(() => modules.find((m) => m.id === selectedModuleId) || modules[0], [selectedModuleId])
  const selectedModuleState = progressState.moduleState[selectedModule.id]
  const currentItem = selectedModule.content[screenIndex]
  const allModulesCompleted = modules.every((m) => progressState.moduleState[m.id].completed)
  const moduleQuizResult = scoreQuiz(selectedModule.quiz, selectedModuleState.quizAnswers || {})
  const finalResult = scoreQuiz(finalAssessment, progressState.finalAssessmentAnswers || {})

  function generateCertificatePdf() {
    if (!progressState.certificateUnlocked) return
    const cleanName = participantName.trim() || 'Participante'
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const today = new Date().toLocaleDateString('pt-BR')

    doc.setFillColor(248, 245, 240)
    doc.rect(0, 0, 297, 210, 'F')

    doc.setDrawColor(139, 94, 52)
    doc.setLineWidth(2)
    doc.rect(10, 10, 277, 190)
    doc.setLineWidth(0.6)
    doc.rect(14, 14, 269, 182)

    doc.setTextColor(91, 70, 51)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(26)
    doc.text('CERTIFICADO DE CONCLUSAO', 148.5, 38, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    doc.text('Certificamos que', 148.5, 58, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.text(cleanName.toUpperCase(), 148.5, 76, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    const lines = doc.splitTextToSize(
      'concluiu com aproveitamento o curso Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos, em formato online autoinstrucional, com carga horária sugerida de 12 a 18 horas, contemplando identificação de riscos, prevenção de fraudes e resposta a incidentes digitais.',
      220
    )
    doc.text(lines, 148.5, 92, { align: 'center' })

    doc.setFontSize(12)
    doc.text(`Data de conclusão: ${today}`, 148.5, 132, { align: 'center' })
    doc.text('Status: aprovado na avaliação final integradora', 148.5, 141, { align: 'center' })

    doc.setDrawColor(139, 94, 52)
    doc.line(95, 164, 202, 164)
    doc.setFont('helvetica', 'bold')
    doc.text('Cidadão Digital Seguro', 148.5, 171, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.text('Certificação digital gerada pela aplicação do curso', 148.5, 178, { align: 'center' })

    const fileName = `certificado-cidadao-digital-seguro-${cleanName.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}.pdf`
    doc.save(fileName)
  }

  function startCourse() {
    setProgressState((prev) => ({ ...prev, started: true, introSeen: true }))
    setCurrentView('module')
    setSelectedModuleId(modules[0].id)
    setScreenIndex(0)
  }

  function goHome() {
    setCurrentView('home')
    setScreenIndex(0)
  }

  function markSeen(itemIndex) {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: {
          ...prev.moduleState[selectedModule.id],
          contentSeen: { ...prev.moduleState[selectedModule.id].contentSeen, [itemIndex]: true },
        },
      },
    }))
  }

  function toggleChecklist(item) {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: {
          ...prev.moduleState[selectedModule.id],
          checklist: {
            ...prev.moduleState[selectedModule.id].checklist,
            [item]: !prev.moduleState[selectedModule.id].checklist[item],
          },
        },
      },
    }))
  }

  function setVideoDone() {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: { ...prev.moduleState[selectedModule.id], videoDone: true },
      },
    }))
  }

  function setActivityDone() {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: { ...prev.moduleState[selectedModule.id], activityDone: true },
      },
    }))
  }

  function answerModuleQuiz(idx, answer) {
    setProgressState((prev) => {
      const nextAnswers = { ...prev.moduleState[selectedModule.id].quizAnswers, [idx]: answer }
      const result = scoreQuiz(selectedModule.quiz, nextAnswers)
      return {
        ...prev,
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...prev.moduleState[selectedModule.id],
            quizAnswers: nextAnswers,
            quizPassed: result.passed,
          },
        },
      }
    })
  }

  function completeModule() {
    const moduleIndex = modules.findIndex((m) => m.id === selectedModule.id)
    const nextModule = modules[moduleIndex + 1]

    setProgressState((prev) => {
      const updated = {
        ...prev,
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...prev.moduleState[selectedModule.id],
            completed: true,
          },
        },
      }

      if (nextModule) {
        updated.moduleState[nextModule.id] = {
          ...updated.moduleState[nextModule.id],
          unlocked: true,
        }
      }

      return updated
    })

    if (nextModule) {
      setSelectedModuleId(nextModule.id)
      setScreenIndex(0)
    } else {
      setCurrentView('final-review')
    }
  }

  function answerFinalAssessment(idx, answer) {
    setProgressState((prev) => {
      const nextAnswers = { ...prev.finalAssessmentAnswers, [idx]: answer }
      const result = scoreQuiz(finalAssessment, nextAnswers)
      return {
        ...prev,
        finalAssessmentAnswers: nextAnswers,
        finalAssessmentPassed: result.passed,
        certificateUnlocked: result.passed,
      }
    })
  }

  function resetCourse() {
    const fresh = defaultProgress()
    setProgressState(fresh)
    saveProgress(fresh)
    setCurrentView('home')
    setSelectedModuleId(modules[0].id)
    setScreenIndex(0)
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="eyebrow"><Shield size={14} /> Curso online com progressão por conclusão de atividades</div>
          <h1>{courseIntro.title}</h1>
          <p className="subtitle">{courseIntro.subtitle}</p>
        </div>
        <div className="top-actions">
          <button className="button button-outline" onClick={goHome}><Home size={16} /> Início</button>
          <button className="button button-outline" onClick={resetCourse}><RotateCcw size={16} /> Reiniciar</button>
        </div>
      </div>

      <div className="layout-grid">
        <aside className="sidebar">
          <Card>
            <div className="card-header">
              <h2>Trilha do curso</h2>
              <p className="muted">Os módulos são liberados progressivamente.</p>
            </div>
            <div className="card-body sidebar-list">
              {modules.map((m, idx) => {
                const state = progressState.moduleState[m.id]
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`module-chip ${state.unlocked ? '' : 'locked'}`}
                    onClick={() => {
                      if (!state.unlocked) return
                      setSelectedModuleId(m.id)
                      setCurrentView('module')
                      setScreenIndex(0)
                    }}
                    disabled={!state.unlocked}
                  >
                    <div className="module-chip-head">
                      <div className="module-chip-left">
                        <div className="icon-box small"><Icon size={16} /></div>
                        <div>
                          <div className="mini-muted">Etapa {idx + 1}</div>
                          <div className="module-chip-title">{m.shortTitle}</div>
                        </div>
                      </div>
                      {state.completed ? <CheckCircle2 className="success-icon" size={18} /> : null}
                    </div>
                    <ModuleProgress mod={m} state={state} />
                  </button>
                )
              })}

              <div className="final-box">
                <div className="final-box-head">
                  <span>Avaliação final</span>
                  {progressState.finalAssessmentPassed ? <CheckCircle2 className="success-icon" size={18} /> : null}
                </div>
                <ProgressBar value={finalResult.passed ? 100 : Math.round((finalResult.correct / finalResult.total) * 100) || 0} />
                <button
                  className="button full"
                  disabled={!allModulesCompleted}
                  onClick={() => setCurrentView('final-review')}
                >
                  Ir para a etapa final
                </button>
              </div>
            </div>
          </Card>
        </aside>

        <main className="content-column">
          {currentView === 'home' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Bem-vindo ao curso" icon={Shield}>
                <p className="muted-body">{courseIntro.description}</p>
                <div className="grid-2">
                  {courseIntro.outcomes.map((item) => (
                    <div key={item} className="info-box">{item}</div>
                  ))}
                </div>
                <div className="tags-row">
                  <SectionTag>Identificar</SectionTag>
                  <SectionTag>Prevenir</SectionTag>
                  <SectionTag>Reagir</SectionTag>
                </div>
                <div className="actions-row">
                  <button className="button" onClick={startCourse}>Começar agora <ChevronRight size={16} /></button>
                  <button className="button button-outline" onClick={() => setCurrentView('structure')}>Como funciona a trilha</button>
                </div>
              </ScreenCard>

              <div className="grid-3">
                <Card><div className="card-header"><h2>Formato</h2></div><div className="card-body muted-body">Curso autoinstrucional em trilha progressiva, com conteúdos, atividades práticas, quizzes e avaliação final integradora.</div></Card>
                <Card><div className="card-header"><h2>Liberação</h2></div><div className="card-body muted-body">Cada módulo é liberado após a conclusão da etapa anterior, incluindo atividade obrigatória e quiz com aproveitamento mínimo.</div></Card>
                <Card><div className="card-header"><h2>Certificação</h2></div><div className="card-body muted-body">O certificado é liberado ao final da trilha, após aprovação na avaliação integradora.</div></Card>
              </div>
            </motion.div>
          )}

          {currentView === 'structure' && (
            <ScreenCard title="Como funciona esta trilha" icon={ListChecks}>
              <div className="grid-2">
                <div className="info-box">
                  <h3>Etapas de cada módulo</h3>
                  <div className="line-list">
                    <div>Conteúdo principal</div>
                    <div>Videoaula do módulo</div>
                    <div>Dica de especialista</div>
                    <div>Momento É Golpe!</div>
                    <div>Checklist</div>
                    <div>Leitura complementar</div>
                    <div>Atividade prática</div>
                    <div>Quiz do módulo</div>
                  </div>
                </div>
                <div className="info-box">
                  <h3>Regras de desbloqueio</h3>
                  <div className="line-list">
                    <div>A próxima etapa só é liberada após a conclusão da anterior</div>
                    <div>O quiz do módulo exige aproveitamento mínimo de 70%</div>
                    <div>A atividade prática e o checklist são obrigatórios</div>
                    <div>A avaliação final só abre após os seis módulos concluídos</div>
                  </div>
                </div>
              </div>
              <button className="button" onClick={startCourse}>Ir para a trilha</button>
            </ScreenCard>
          )}

          {currentView === 'module' && selectedModule && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title={selectedModule.title} icon={selectedModule.icon}>
                <p className="muted-body">{selectedModule.theme}</p>
                <p className="muted-small">Objetivo: {selectedModule.goal}</p>
                <ModuleProgress mod={selectedModule} state={selectedModuleState} />
                <div className="tags-row">
                  <SectionTag>Etapa {modules.findIndex((m) => m.id === selectedModule.id) + 1}</SectionTag>
                  {selectedModuleState.completed ? <SectionTag>Concluído</SectionTag> : null}
                </div>
              </ScreenCard>

              {screenIndex < selectedModule.content.length && currentItem && (
                <ScreenCard
                  title={currentItem.title}
                  icon={
                    currentItem.type === 'video'
                      ? PlayCircle
                      : currentItem.type === 'links'
                        ? BookOpen
                        : currentItem.type === 'checklist'
                          ? ListChecks
                          : currentItem.type === 'activity'
                            ? FileCheck
                            : AlertTriangle
                  }
                >
                  {currentItem.type === 'text' && (
                    <div className="stack-md">
                      {currentItem.body.map((p) => <p className="muted-body" key={p}>{p}</p>)}
                    </div>
                  )}

                  {currentItem.type === 'scenario' && <div className="scenario-box">{currentItem.prompt}</div>}
                  {currentItem.type === 'tip' && <div className="tip-box">{currentItem.text}</div>}
                  {currentItem.type === 'scam' && <div className="scam-box">{currentItem.text}</div>}

                  {currentItem.type === 'video' && (
                    <div className="stack-md">
                      <div className="video-box">
                        <PlayCircle size={42} />
                        <div className="video-title">{currentItem.description}</div>
                        <div className="muted-small">Duração sugerida: {currentItem.duration}</div>
                      </div>
                      <button className="button" onClick={() => { setVideoDone(); markSeen(screenIndex) }}>Marcar videoaula como assistida</button>
                    </div>
                  )}

                  {currentItem.type === 'checklist' && (
                    <div className="stack-md">
                      {currentItem.items.map((item) => (
                        <label key={item} className="check-row">
                          <input
                            type="checkbox"
                            checked={!!selectedModuleState.checklist[item]}
                            onChange={() => toggleChecklist(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentItem.type === 'links' && (
                    <div className="grid-2">
                      {currentItem.items.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="link-card">
                          <div className="link-card-title">{link.label}</div>
                          <div className="link-card-url">{link.url}</div>
                          <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  )}

                  {currentItem.type === 'activity' && (
                    <div className="stack-md">
                      <div className="info-box">{currentItem.prompt}</div>
                      <details className="details-box">
                        <summary>Ver orientação de resposta</summary>
                        <p>{currentItem.reflection}</p>
                      </details>
                      <button className="button" onClick={() => { setActivityDone(); markSeen(screenIndex) }}>Marcar atividade como concluída</button>
                    </div>
                  )}

                  {currentItem.type !== 'video' && currentItem.type !== 'activity' && (
                    <button className="button" onClick={() => markSeen(screenIndex)}>Marcar etapa como lida</button>
                  )}

                  <div className="actions-between">
                    <button className="button button-outline" disabled={screenIndex === 0} onClick={() => setScreenIndex((s) => Math.max(0, s - 1))}>Voltar</button>
                    <button
                      className="button"
                      onClick={() => setScreenIndex((s) => Math.min(selectedModule.content.length, s + 1))}
                      disabled={!selectedModuleState.contentSeen[screenIndex] && currentItem.type !== 'checklist'}
                    >
                      Próxima etapa
                    </button>
                  </div>
                </ScreenCard>
              )}

              {screenIndex === selectedModule.content.length && (
                <ScreenCard title={`Quiz do ${selectedModule.shortTitle}`} icon={CheckCircle2}>
                  <div className="stack-lg">
                    {selectedModule.quiz.map((q, idx) => (
                      <div key={q.question} className="quiz-box">
                        <div className="quiz-question">{idx + 1}. {q.question}</div>
                        <div className="stack-sm">
                          {q.options.map((opt, optionIndex) => (
                            <label key={opt} className="radio-row">
                              <input
                                type="radio"
                                name={`${selectedModule.id}-${idx}`}
                                checked={selectedModuleState.quizAnswers[idx] === optionIndex}
                                onChange={() => answerModuleQuiz(idx, optionIndex)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="info-box muted-body">
                    Resultado atual: {moduleQuizResult.correct}/{moduleQuizResult.total} acertos. Aproveitamento mínimo: 70%.
                  </div>

                  <div className="actions-row">
                    <button className="button button-outline" onClick={() => setScreenIndex(selectedModule.content.length - 1)}>Voltar ao conteúdo</button>
                    <button
                      className="button"
                      disabled={!(selectedModuleState.activityDone && selectedModuleState.videoDone && moduleQuizResult.passed)}
                      onClick={completeModule}
                    >
                      {modules.findIndex((m) => m.id === selectedModule.id) === modules.length - 1 ? 'Ir para a etapa final' : 'Concluir módulo e liberar próximo'}
                    </button>
                  </div>

                  {!selectedModuleState.activityDone || !selectedModuleState.videoDone ? (
                    <div className="warning-text">Para concluir o módulo, a atividade prática e a videoaula precisam estar marcadas como concluídas.</div>
                  ) : null}
                </ScreenCard>
              )}
            </motion.div>
          )}

          {currentView === 'final-review' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Revisão geral do curso" icon={BookOpen}>
                <p className="muted-body">Você concluiu a trilha principal. Agora, revise a jornada completa antes de realizar a avaliação final integradora.</p>
                <div className="grid-2">
                  {modules.map((m) => (
                    <div key={m.id} className="info-box">
                      <div className="link-card-title">{m.shortTitle}</div>
                      <div className="muted-small">{m.goal}</div>
                    </div>
                  ))}
                </div>
                <button className="button" onClick={() => setCurrentView('final-assessment')}>Iniciar avaliação final</button>
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'final-assessment' && (
            <ScreenCard title="Avaliação final integradora" icon={Award}>
              <p className="muted-body">Estudo de caso transversal para verificar identificação do golpe, falhas preventivas, ordem correta da reação, preservação de provas e escolha do canal institucional adequado.</p>
              <div className="stack-lg">
                {finalAssessment.map((q, idx) => (
                  <div key={q.question} className="quiz-box">
                    <div className="quiz-question">{idx + 1}. {q.question}</div>
                    <div className="stack-sm">
                      {q.options.map((opt, optionIndex) => (
                        <label key={opt} className="radio-row">
                          <input
                            type="radio"
                            name={`final-${idx}`}
                            checked={progressState.finalAssessmentAnswers[idx] === optionIndex}
                            onChange={() => answerFinalAssessment(idx, optionIndex)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="info-box muted-body">Resultado atual: {finalResult.correct}/{finalResult.total} acertos. Aproveitamento mínimo: 70%.</div>
              <div className="actions-row">
                <button className="button" onClick={() => setCurrentView('certificate')} disabled={!progressState.finalAssessmentPassed}>Ir para certificação</button>
              </div>
              {!progressState.finalAssessmentPassed ? <div className="warning-text">Conclua a avaliação com aproveitamento mínimo para liberar o certificado.</div> : null}
            </ScreenCard>
          )}

          {currentView === 'certificate' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Certificação" icon={Award}>
                <div className="certificate-box">
                  <Award size={48} />
                  <h3>Parabéns pela conclusão</h3>
                  <p>Você concluiu a trilha formativa e foi aprovado na avaliação final integradora. O curso reforça a tríade: identificar o risco, prevenir com método e reagir com segurança.</p>
                  <div className="muted-small">Certificado em PDF disponível para emissão imediata</div>
                </div>

                <div className="tabs-grid">
                  <div className="info-box">
                    <div className="link-card-title">Emitir certificado</div>
                    <div className="line-list">
                      <div>Curso: Cidadão Digital Seguro — Prevenção e Combate a Crimes Cibernéticos</div>
                      <div>Carga horária sugerida: 12 a 18 horas</div>
                      <div>Status: concluído com aproveitamento</div>
                    </div>
                    <div className="stack-sm" style={{ marginTop: '12px' }}>
                      <label htmlFor="participantName" className="muted-body">Nome do participante para o PDF</label>
                      <input
                        id="participantName"
                        className="text-input"
                        type="text"
                        placeholder="Digite o nome completo"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                      />
                      <button className="button" onClick={generateCertificatePdf}>Baixar certificado em PDF</button>
                    </div>
                  </div>
                  <div className="info-box">
                    <div className="link-card-title">Materiais permanentes</div>
                    <div className="line-list">
                      <div>Revisar módulos concluídos</div>
                      <div>Retomar checklists e atividades</div>
                      <div>Consultar leituras complementares</div>
                      <div>Usar a trilha como referência de prevenção</div>
                    </div>
                  </div>
                </div>

                <div className="grid-2">
                  {officialLinks.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="link-card">
                      <div className="link-card-title">{link.label}</div>
                      <div className="link-card-url">{link.url}</div>
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              </ScreenCard>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
