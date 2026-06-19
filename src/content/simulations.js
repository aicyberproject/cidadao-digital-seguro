export const simulationCategories = [
  'Golpes e fraudes digitais',
  'Transações e consumo seguro',
  'Dispositivos e redes',
  'Autenticação e contas',
  'Privacidade e proteção de dados',
  'Desinformação e conteúdo falso',
  'Resposta a incidentes e denúncia',
]

export const simulationModules = [
  'Módulo 1',
  'Módulo 2',
  'Módulo 3',
  'Módulo 4',
  'Módulo 5',
  'Módulo 6',
  'Transversal',
]

export const quickSimulations = [
  {
    id: 'sms-encomenda-retida',
    title: 'SMS sobre encomenda retida',
    situation: 'Você recebeu um SMS informando que sua encomenda foi retida e precisa pagar uma taxa.',
    category: 'Golpes e fraudes digitais',
    relatedModule: 'Módulo 5',
    modules: ['Módulo 5'],
    tags: ['smishing', 'mensagem', 'encomenda', 'correios', 'taxa'],
    recommendedAction: 'Nunca clique em links de cobrança recebidos por SMS. Para verificar encomendas, use o site ou aplicativo oficial dos Correios ou da transportadora informando o código de rastreamento.',
    scenario:
      'Sua encomenda foi retida. Pague a taxa de liberação em até 30 minutos para evitar devolução. Acesse: entrega-segura.exemplo/pagamento',
    warningSigns: [
      'Urgência artificial',
      'Link enviado por mensagem',
      'Cobrança inesperada',
      'Ameaça de perda ou devolução',
    ],
    options: [
      {
        label: 'Clicar no link e pagar logo para evitar problema.',
        isCorrect: false,
        feedback: 'Essa é uma resposta arriscada. Golpistas usam urgência e links falsos para roubar dados e valores.',
      },
      {
        label: 'Não clicar no link e consultar a entrega no site ou app oficial da transportadora/loja.',
        isCorrect: true,
        feedback: 'Correto. A melhor conduta é confirmar por canal oficial independente, sem usar o link recebido.',
      },
      {
        label: 'Responder ao SMS pedindo mais informações.',
        isCorrect: false,
        feedback: 'Responder pode confirmar que seu número está ativo e manter você dentro da engenharia social.',
      },
    ],
    finalGuidance: 'Na dúvida, não clique. Digite o endereço oficial no navegador ou use o aplicativo legítimo.',
  },
  {
    id: 'falsa-central-banco',
    title: 'Ligação da falsa central do banco',
    situation: 'Alguém liga dizendo ser da central de segurança do seu banco sobre uma fraude.',
    category: 'Transações e consumo seguro',
    relatedModule: 'Módulo 4',
    modules: ['Módulo 4'],
    tags: ['falsa central', 'banco', 'telefone', 'cartão', 'engenharia social'],
    recommendedAction: 'Desligue imediatamente a ligação suspeita. Bancos nunca pedem transferências, senhas ou Pix para contas de segurança. Entre em contato com o banco pelo número oficial impresso atrás do seu cartão.',
    scenario:
      '"Olá, detectamos uma tentativa de compra suspeita em seu cartão. Para sua segurança, precisamos transferir seus fundos para uma conta segura temporária enquanto bloqueamos seu cartão."',
    warningSigns: [
      'Pressão emocional/medo',
      'Pedido de transferência de dinheiro',
      'Conceito de "conta segura"',
      'Linguagem técnica convincente',
    ],
    options: [
      {
        label: 'Seguir as instruções para proteger meu dinheiro imediatamente.',
        isCorrect: false,
        feedback: 'Bancos nunca pedem transferências ou senhas por telefone. Isso é um golpe clássico de falsa central.',
      },
      {
        label: 'Desligar e ligar para o número oficial do banco (atrás do cartão) por conta própria.',
        isCorrect: true,
        feedback: 'Correto. Sempre encerre o contato e procure a instituição por canais oficiais independentes.',
      },
      {
        label: 'Pedir o nome e o cargo do atendente antes de continuar.',
        isCorrect: false,
        feedback: 'Golpistas usam nomes e cargos falsos para parecerem legítimos. A melhor conduta é desligar.',
      },
    ],
    finalGuidance: 'Bancos não pedem transferências, senhas ou tokens por telefone. Desligue e verifique você mesmo.',
  },
  {
    id: 'familiar-numero-novo',
    title: 'Familiar em número novo pedindo Pix',
    situation: 'Um contato que parece ser um familiar escreve de um número novo pedindo ajuda financeira.',
    category: 'Golpes e fraudes digitais',
    relatedModule: 'Módulo 5',
    modules: ['Módulo 5'],
    tags: ['perfil falso', 'whatsapp', 'Pix', 'familiar', 'urgência'],
    recommendedAction: 'Nunca envie dinheiro ou faça Pix a pedido de um conhecido que mudou de número. Ligue diretamente por voz ou vídeo para o número antigo para confirmar a identidade antes de qualquer transação.',
    scenario:
      '"Oi, troquei de número, anota aí. Tive um problema com meu banco e preciso pagar uma conta urgente hoje. Pode me fazer um Pix de R$ 800? Te devolvo amanhã cedo!"',
    warningSigns: [
      'Uso de identidade conhecida',
      'Número de telefone novo',
      'Urgência no pedido de dinheiro',
      'Problema técnico como justificativa',
    ],
    options: [
      {
        label: 'Fazer o Pix para ajudar, pois é um familiar próximo.',
        isCorrect: false,
        feedback: 'Golpistas usam fotos e dados públicos para se passarem por familiares. Nunca transfira dinheiro sem confirmar.',
      },
      {
        label: 'Tentar ligar para o número antigo do familiar ou fazer uma videochamada para o novo.',
        isCorrect: true,
        feedback: 'Correto. Sempre confirme a identidade da pessoa por voz ou vídeo antes de realizar qualquer transferência.',
      },
      {
        label: 'Responder perguntando quem é.',
        isCorrect: false,
        feedback: 'O golpista pode dar nomes e informações para te convencer. O ideal é a verificação direta por voz/vídeo.',
      },
    ],
    finalGuidance: 'Se um conhecido pedir dinheiro por número novo, desconfie. Ligue para o número antigo para confirmar.',
  },
  {
    id: 'qr-code-taxa-inesperada',
    title: 'QR Code para pagar taxa inesperada',
    situation: 'Você recebe uma mensagem com um QR Code para pagar uma taxa obrigatória de um serviço público.',
    category: 'Transações e consumo seguro',
    relatedModule: 'Módulo 4',
    modules: ['Módulo 4'],
    tags: ['QR Code', 'cobrança', 'pagamento', 'multa', 'falso'],
    recommendedAction: 'Ao ler qualquer QR Code de pagamento, confira atentamente o nome do recebedor e o valor na tela de confirmação do seu aplicativo bancário antes de autorizar a transação.',
    scenario:
      'Alerta: Regularize sua situação cadastral hoje para evitar multas. Escaneie o QR Code abaixo para pagar a taxa de manutenção anual obrigatória.',
    warningSigns: [
      'Ameaça de multa',
      'Cobrança por canal não oficial',
      'QR Code como única forma de pagamento',
      'Urgência',
    ],
    options: [
      {
        label: 'Escanear o QR Code e pagar para evitar a multa.',
        isCorrect: false,
        feedback: 'QR Codes podem ser adulterados ou criados por criminosos para desviar pagamentos. Não use códigos recebidos por mensagem.',
      },
      {
        label: 'Ignorar a mensagem e procurar o site oficial do órgão para verificar se há débitos.',
        isCorrect: true,
        feedback: 'Correto. Órgãos públicos e empresas sérias não enviam QR Codes de cobrança por mensagens espontâneas.',
      },
      {
        label: 'Escanear apenas para ver o valor e quem é o recebedor.',
        isCorrect: false,
        feedback: 'Escanear o código pode te direcionar para um site malicioso. Verifique sempre no canal oficial.',
      },
    ],
    finalGuidance: 'Confira sempre o nome do recebedor na tela do banco antes de confirmar qualquer pagamento via QR Code.',
  },
  {
    id: 'loja-rede-social-barata',
    title: 'Perfil falso de loja com preço muito baixo',
    situation: 'Você vê um anúncio em rede social de um smartphone premium com 70% de desconto.',
    category: 'Transações e consumo seguro',
    relatedModule: 'Módulo 4',
    modules: ['Módulo 4'],
    tags: ['compras', 'anúncio', 'loja virtual', 'desconto', 'fraude'],
    recommendedAction: 'Desconfie de descontos exagerados. Antes de comprar, verifique o selo de autenticidade da loja nas redes sociais, pesquise o site oficial no navegador e consulte a reputação no Reclame Aqui.',
    scenario:
      'QUEIMA DE ESTOQUE! Somente hoje: Smartphone de última geração de R$ 5.999 por R$ 1.200. Poucas unidades. Compre agora pelo link: super-desconto-promo.exemplo',
    warningSigns: [
      'Preço muito abaixo do mercado',
      'Urgência extrema (queima de estoque)',
      'Link de site desconhecido',
      'Anúncio em rede social sem selo de verificação',
    ],
    options: [
      {
        label: 'Aproveitar a oferta antes que acabe.',
        isCorrect: false,
        feedback: 'Preços irreais são a principal isca para sites falsos que roubam dados de cartão e nunca entregam o produto.',
      },
      {
        label: 'Pesquisar o preço no site oficial da marca e verificar a reputação da loja no Reclame Aqui.',
        isCorrect: true,
        feedback: 'Correto. Se a oferta parece boa demais para ser verdade, provavelmente é um golpe.',
      },
      {
        label: 'Comprar usando boleto para ser mais seguro.',
        isCorrect: false,
        feedback: 'Boletos também podem ser falsificados e são difíceis de contestar após o pagamento. O risco continua alto.',
      },
    ],
    finalGuidance: 'Desconfie de ofertas milagrosas. Pesquise em sites confiáveis e verifique a reputação da loja.',
  },
  {
    id: 'suporte-remoto-falso',
    title: 'Pedido de acesso remoto por suposto atendente',
    situation: 'Um suposto atendente de TI liga dizendo que seu computador está infectado.',
    category: 'Dispositivos e redes',
    relatedModule: 'Módulo 3',
    modules: ['Módulo 3'],
    tags: ['falso suporte', 'acesso remoto', 'computador', 'invasão', 'software'],
    recommendedAction: 'Nunca instale programas de acesso remoto (como AnyDesk ou TeamViewer) a pedido de terceiros por ligação. Empresas legítimas de suporte de TI não fazem esse tipo de solicitação ativa.',
    scenario:
      '"Identificamos vírus ativos em sua rede. Para remover agora e evitar que seus dados sejam roubados, instale o aplicativo de suporte "AnyHelp" e me passe o código que aparecer."',
    warningSigns: [
      'Contato espontâneo sobre segurança',
      'Pedido de instalação de software',
      'Pedido de acesso remoto',
      'Alerta de vírus sem varredura local',
    ],
    options: [
      {
        label: 'Instalar o programa para que o especialista resolva o problema.',
        isCorrect: false,
        feedback: 'Dar acesso remoto a estranhos permite que eles controlem seu dispositivo, roubem arquivos e senhas.',
      },
      {
        label: 'Desligar a ligação e realizar uma varredura com seu próprio antivírus atualizado.',
        isCorrect: true,
        feedback: 'Correto. Empresas legítimas não ligam pedindo para acessar seu computador remotamente para "limpar vírus".',
      },
      {
        label: 'Passar o código mas ficar observando o que ele faz na tela.',
        isCorrect: false,
        feedback: 'Criminosos são rápidos e podem ocultar janelas ou baixar arquivos maliciosos antes que você perceba.',
      },
    ],
    finalGuidance: 'Nunca dê acesso remoto ao seu dispositivo para desconhecidos. É a forma mais direta de invasão.',
  },
  {
    id: 'noticia-alarmista-boato',
    title: 'Notícia alarmista pedindo compartilhamento',
    situation: 'Você recebe um vídeo informando sobre uma mudança drástica e perigosa em uma lei.',
    category: 'Desinformação e conteúdo falso',
    relatedModule: 'Módulo 1',
    modules: ['Módulo 1'],
    tags: ['boato', 'desinformação', 'notícia falsa', 'compartilhamento'],
    recommendedAction: 'Antes de repassar mensagens alarmistas ou sensacionalistas, pause e faça uma busca rápida em sites confiáveis de checagem de fatos ou portais de notícias oficiais.',
    scenario:
      'URGENTE! A partir de amanhã todos os seus dados bancários serão públicos. O governo acabou de aprovar a lei sigilo-zero. Repasse para todos os seus contatos agora!',
    warningSigns: [
      'Linguagem alarmista/sensacionalista',
      'Pedido de compartilhamento em massa',
      'Ausência de fonte oficial mencionada',
      'Erros gramaticais ou formatação estranha',
    ],
    options: [
      {
        label: 'Repassar para meus amigos para que eles fiquem sabendo.',
        isCorrect: false,
        feedback: 'Compartilhar informações falsas ajuda a espalhar pânico e desinformação. Sempre verifique antes.',
      },
      {
        label: 'Pesquisar o assunto em sites de checagem de fatos ou portais de notícias conhecidos.',
        isCorrect: true,
        feedback: 'Correto. Boatos costumam ter apelo emocional e urgência. A verificação em fontes confiáveis é essencial.',
      },
      {
        label: 'Acreditar se o vídeo tiver muitas visualizações.',
        isCorrect: false,
        feedback: 'O número de visualizações não é prova de veracidade; conteúdos falsos costumam viralizar rápido.',
      },
    ],
    finalGuidance: 'Recebeu algo alarmista? Pause, verifique em sites confiáveis e não repasse sem ter certeza.',
  },
  {
    id: 'deepfake-autoridade',
    title: 'Vídeo de autoridade pedindo dinheiro/dados',
    situation: 'Você vê um vídeo de uma autoridade famosa anunciando um programa de indenização.',
    category: 'Desinformação e conteúdo falso',
    relatedModule: 'Módulo 5',
    modules: ['Módulo 5'],
    tags: ['deepfake', 'inteligência artificial', 'vídeo falso', 'indenização'],
    recommendedAction: 'Desconfie de pronunciamentos em vídeo onde figuras públicas oferecem vantagens financeiras fáceis. Verifique a existência de programas de indenização apenas nos canais oficiais terminados em .gov.br.',
    scenario:
      'No vídeo, a voz e o rosto da autoridade dizem: "Liberamos o saque de R$ 2.500 para todos os cidadãos. Clique abaixo e informe seu CPF para receber via Pix agora."',
    warningSigns: [
      'Oferta de dinheiro fácil de autoridade',
      'Voz ou movimentos faciais levemente robóticos',
      'Pedido de CPF/Pix por rede social',
      'Promessa incomum para o órgão citado',
    ],
    options: [
      {
        label: 'Clicar no link e informar meus dados para receber o valor.',
        isCorrect: false,
        feedback: 'Isso é um Deepfake usado para coletar dados e aplicar golpes. Governos não pagam indenizações dessa forma.',
      },
      {
        label: 'Ignorar e denunciar o post como desinformação na plataforma.',
        isCorrect: true,
        feedback: 'Correto. Inteligência artificial pode imitar rostos e vozes com perfeição para enganar as pessoas.',
      },
      {
        label: 'Comentar no post perguntando se alguém já recebeu.',
        isCorrect: false,
        feedback: 'Golpistas costumam usar perfis falsos nos comentários para dizer que "deu certo" e te convencer.',
      },
    ],
    finalGuidance: 'Desconfie de vídeos de autoridades prometendo dinheiro ou prêmios. Verifique sempre nos portais .gov.br.',
  },
  {
    id: 'alerta-vazamento-dados',
    title: 'Alerta de vazamento com link para "verificar"',
    situation: 'Um e-mail informa que seus dados vazaram e oferece um site para você conferir se está seguro.',
    category: 'Privacidade e proteção de dados',
    relatedModule: 'Módulo 5',
    modules: ['Módulo 5'],
    tags: ['vazamento', 'dados pessoais', 'cpf', 'e-mail', 'phishing'],
    recommendedAction: 'Evite inserir seu CPF ou dados sensíveis em links recebidos por e-mail ou mensagens sobre supostos vazamentos. Utilize ferramentas oficiais seguras, como o Registrato do Banco Central.',
    scenario:
      'URGENTE: Seus dados foram expostos em um vazamento massivo. Clique aqui: verifique-seu-cpf.exemplo e informe seus dados para ver o que vazou.',
    warningSigns: [
      'Uso de um problema real (vazamento) para criar medo',
      'Link externo para fornecer dados sensíveis',
      'Remetente desconhecido ou genérico',
      'Urgência',
    ],
    options: [
      {
        label: 'Entrar no site e colocar meu CPF para conferir.',
        isCorrect: false,
        feedback: 'Sites falsos de "verificação" são criados justamente para coletar o que ainda não vazou.',
      },
      {
        label: 'Não clicar. Se estiver preocupado, usar serviços oficiais como o Registrato do Banco Central.',
        isCorrect: true,
        feedback: 'Correto. Nunca informe dados em sites sugeridos por e-mails ou mensagens não solicitadas.',
      },
      {
        label: 'Responder o e-mail perguntando de onde eles conseguiram meu contato.',
        isCorrect: false,
        feedback: 'Responder confirma que seu e-mail é válido e te torna alvo de mais tentativas de phishing.',
      },
    ],
    finalGuidance: 'Deseja monitorar seus dados? Use o Registrato do Banco Central ou fontes oficiais reconhecidas.',
  },
  {
    id: 'celular-furtado-mensagens',
    title: 'Celular furtado e mensagens de recuperação',
    situation: 'Após ter o celular furtado, você começa a receber mensagens no seu e-mail de recuperação.',
    category: 'Resposta a incidentes e denúncia',
    relatedModule: 'Módulo 6',
    modules: ['Módulo 6'],
    tags: ['furto', 'resposta a incidentes', 'rastreamento', 'senha', 'bloqueio'],
    recommendedAction: 'Se o seu celular for roubado ou furtado, use apenas as ferramentas oficiais de rastreamento (como Encontre meu Dispositivo da Apple ou Google). Desconsidere qualquer mensagem recebida no e-mail de recuperação que peça suas senhas.',
    scenario:
      'Uma mensagem diz: "Seu dispositivo furtado foi localizado. Para ver a localização exata e bloquear o acesso, clique aqui e confirme sua senha do ID Apple/Google."',
    warningSigns: [
      'Pedido de senha após incidente real',
      'Link de localização que pede credenciais',
      'Oportunismo após o furto',
      'Urgência para "bloquear"',
    ],
    options: [
      {
        label: 'Clicar e colocar a senha para conseguir bloquear o ladrão.',
        isCorrect: false,
        feedback: 'Criminosos usam isso para tirar o dispositivo do seu rastreamento e resetá-lo. Fabricantes não pedem senhas assim.',
      },
      {
        label: 'Não clicar. Acessar o site oficial de rastreamento direto pelo navegador em outro aparelho seguro.',
        isCorrect: true,
        feedback: 'Correto. Golpistas enviam mensagens falsas para tentar liberar o aparelho furtado que está bloqueado.',
      },
      {
        label: 'Tentar responder a mensagem dizendo que já fez o boletim de ocorrência.',
        isCorrect: false,
        feedback: 'O golpista usará qualquer interação para tentar te enganar e conseguir a senha de desbloqueio.',
      },
    ],
    finalGuidance: 'Fabricantes nunca enviam links pedindo sua senha para "localizar" ou "bloquear" aparelhos furtados.',
  },
]
