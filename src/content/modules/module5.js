import { AlertTriangle } from 'lucide-react'

export const module5 = {
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
}
