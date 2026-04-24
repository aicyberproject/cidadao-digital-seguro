import { Wifi } from 'lucide-react'

export const module3 = {
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
}
