import { ShoppingCart } from 'lucide-react'

export const module4 = {
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
}
