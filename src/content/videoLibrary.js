/**
 * Biblioteca de vídeos educativos - Curadoria inicial (Issue #63)
 * 
 * Este arquivo contém o modelo de dados para os vídeos educativos selecionados.
 * Estes vídeos são destinados a reforçar o conteúdo dos módulos e podem ser
 * futuramente integrados como videoaulas obrigatórias ou materiais de apoio.
 * 
 * ATENÇÃO: Os metadados abaixo são preliminares e devem ser validados antes de 
 * qualquer implementação de interface ou substituição de videoaulas.
 */

export const videoLibrary = [
  {
    id: 'febraban-porchat-01',
    title: 'Papo Seguro: O Golpe do Motoboy',
    provider: 'FEBRABAN',
    sourceType: 'Institutional Campaign',
    url: 'https://youtu.be/fzZixOUV9os',
    videoId: 'fzZixOUV9os',
    platform: 'YouTube',
    language: 'pt-BR',
    duration: '01:30', // Estimativa
    modules: ['Módulo 4', 'Módulo 5'],
    topics: ['Golpe do Motoboy', 'Segurança Bancária', 'Cartão de Crédito'],
    priority: 'High',
    status: 'Curated',
    notes: 'Campanha com Fábio Porchat. Foco em engenharia social e cartões.'
  },
  {
    id: 'febraban-porchat-02',
    title: 'Papo Seguro: O Golpe da Falsa Central',
    provider: 'FEBRABAN',
    sourceType: 'Institutional Campaign',
    url: 'https://youtu.be/n0GvVfx4Y1s',
    videoId: 'n0GvVfx4Y1s',
    platform: 'YouTube',
    language: 'pt-BR',
    duration: '01:45', // Estimativa
    modules: ['Módulo 4', 'Módulo 5'],
    topics: ['Falsa Central Telefônica', 'Engenharia Social', 'Privacidade'],
    priority: 'High',
    status: 'Curated',
    notes: 'Campanha com Fábio Porchat. Foco em chamadas telefônicas fraudulentas.'
  },
  {
    id: 'febraban-porchat-03',
    title: 'Papo Seguro: O Golpe do WhatsApp',
    provider: 'FEBRABAN',
    sourceType: 'Institutional Campaign',
    url: 'https://youtu.be/DMNxapx10dg',
    videoId: 'DMNxapx10dg',
    platform: 'YouTube',
    language: 'pt-BR',
    duration: '01:20', // Estimativa
    modules: ['Módulo 1', 'Módulo 5'],
    topics: ['WhatsApp', 'Clonagem de Perfil', 'Engenharia Social'],
    priority: 'High',
    status: 'Curated',
    notes: 'Campanha com Fábio Porchat. Foco em sequestro de contas de mensagens.'
  },
  {
    id: 'interpol-think-twice-01',
    title: 'Think Twice: BEC (Business Email Compromise)',
    provider: 'INTERPOL',
    sourceType: 'International Campaign',
    url: 'https://youtu.be/F0dAeLoXago?si=ZvH-yaJ0ZpSSoLcv',
    videoId: 'F0dAeLoXago',
    platform: 'YouTube',
    language: 'en', // Tradução/Legenda necessária
    duration: '00:45',
    modules: ['Módulo 5'],
    topics: ['Email Fraud', 'Business Email Compromise', 'Corporate Security'],
    priority: 'Medium',
    status: 'Curated',
    notes: 'Campanha global Think Twice. Foco em fraudes corporativas por email.'
  },
  {
    id: 'interpol-think-twice-02',
    title: 'Think Twice: Romance Scams',
    provider: 'INTERPOL',
    sourceType: 'International Campaign',
    url: 'https://youtu.be/JUMMtpkzP08?si=3cq8IUW1sDTAlK5y',
    videoId: 'JUMMtpkzP08',
    platform: 'YouTube',
    language: 'en', // Tradução/Legenda necessária
    duration: '00:45',
    modules: ['Módulo 5'],
    topics: ['Romance Scams', 'Online Dating', 'Social Engineering'],
    priority: 'Medium',
    status: 'Curated',
    notes: 'Campanha global Think Twice. Foco em estelionato sentimental.'
  },
  {
    id: 'mjsp-celular-seguro-01',
    title: 'Programa Celular Seguro',
    provider: 'MJSP',
    sourceType: 'Governmental Service',
    url: 'https://youtu.be/DDyur4i9YDY?si=gP4koiJPie5nqJPo',
    videoId: 'DDyur4i9YDY',
    platform: 'YouTube',
    language: 'pt-BR',
    duration: '02:00', // Estimativa
    modules: ['Módulo 6'],
    topics: ['Celular Seguro', 'Resposta a Incidentes', 'Bloqueio de Dispositivo'],
    priority: 'High',
    status: 'Curated',
    notes: 'Tutorial oficial do Ministério da Justiça sobre o aplicativo Celular Seguro.'
  }
];
