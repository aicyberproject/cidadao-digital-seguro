export const educationalVideos = [
  {
    title: 'O que é Segurança Digital?',
    description: 'Uma introdução clara e simples sobre o ecossistema de segurança na internet e por que ela é fundamental hoje.',
    source: 'Cidadão Digital Seguro',
    theme: 'Conceitos básicos',
    relatedModule: 'Módulo 1',
    status: 'Disponível',
    url: 'https://youtu.be/example1',
  },
  {
    title: 'Higiene Digital: Melhores Práticas',
    description: 'Dicas práticas sobre senhas, autenticação em duas etapas e comportamento seguro nas redes.',
    source: 'Cidadão Digital Seguro',
    theme: 'Higiene Digital',
    relatedModule: 'Módulo 2',
    status: 'Disponível',
    url: 'https://youtu.be/example2',
  },
  {
    title: 'Protegendo seu Wi-Fi doméstico',
    description: 'Como configurar seu roteador de forma segura para evitar invasões e uso indevido da sua rede.',
    source: 'Cidadão Digital Seguro',
    theme: 'Redes e Dispositivos',
    relatedModule: 'Módulo 3',
    status: 'Em preparação',
    url: '',
  },
  {
    title: 'Compras Online: Como não cair em ciladas',
    description: 'Passo a passo para identificar sites falsos e garantir que sua transação financeira seja protegida.',
    source: 'FEBRABAN',
    theme: 'Consumo Seguro',
    relatedModule: 'Módulo 4',
    status: 'Disponível',
    url: 'https://portal.febraban.org.br/AntiFraude/',
  },
  {
    title: 'Entendendo o Phishing',
    description: 'Exemplos reais de mensagens fraudulentas e como o criminoso tenta enganar o usuário.',
    source: 'Cidadão Digital Seguro',
    theme: 'Ameaças e Golpes',
    relatedModule: 'Módulo 5',
    status: 'Disponível',
    url: 'https://youtu.be/example5',
  },
  {
    title: 'Como registrar uma ocorrência digital',
    description: 'Onde ir e quais provas reunir ao ser vítima de um crime cibernético.',
    source: 'Polícia Federal',
    theme: 'Resposta a Incidentes',
    relatedModule: 'Módulo 6',
    status: 'Em preparação',
    url: '',
  },
  {
    title: 'Privacidade nas Redes Sociais',
    description: 'Ajustando as configurações das principais redes para reduzir sua exposição digital.',
    source: 'CERT.br',
    theme: 'Privacidade',
    relatedModule: 'Módulo 2',
    status: 'Disponível',
    url: 'https://cartilha.cert.br/fasciculos/privacidade/',
  },
]

export const videoSources = [...new Set(educationalVideos.map((item) => item.source))]
export const videoThemes = [...new Set(educationalVideos.map((item) => item.theme))]
export const videoModules = [...new Set(educationalVideos.map((item) => item.relatedModule))]
