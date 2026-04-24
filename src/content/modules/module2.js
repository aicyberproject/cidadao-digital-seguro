import { Lock } from 'lucide-react'

export const module2 = {
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
}
