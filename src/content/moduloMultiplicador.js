// Módulo de Formação de Multiplicadores — conteúdo adicional, NÃO integrante da trilha cidadã.
//
// Este módulo NÃO deve ser adicionado a `src/content/modules/index.js`. A matriz de 6 módulos do
// curso Cidadão Digital Seguro está homologada (v2.9.0 e v3.0.0), o certificado declara "6 módulos,
// 20 horas" e a progressão e o desbloqueio da avaliação final dependem dessa estrutura.
//
// Público-alvo: policiais federais que atuarão como capacitadores.
// Pré-requisito: certificado de conclusão do curso Cidadão Digital Seguro (20h).
//
// Destino previsto: conversão para Moodle (plataforma da ANP), onde ocorrerá o credenciamento
// oficial. Por isso o conteúdo é mantido em blocos de dados portáveis (`paragraph`, `list`,
// `callout`), o mesmo vocabulário de `modules/module4.js` a `module6.js`, sem `icon` e sem qualquer
// acoplamento à interface React.
//
// Chaves que NÃO existem nos módulos da trilha cidadã e foram introduzidas aqui — nada as consome
// hoje, e o validador não as conhece:
//   - `prerequisite`: exigência de conclusão do curso base, própria deste módulo.
//   - `habilitacao`: especificação de requisitos para a ANP implementar, não recurso desta aplicação.
//   - `resources[].note`: usada na entrada do Kit de Palestra, que é material interno e não tem URL
//     pública (as demais entradas seguem o padrão `label` + `url`).
//
// Ver: docs/analise-adequacao-capacitacao-multiplicadores.md

export const moduloMultiplicador = {
  id: 'mult',
  title: 'Módulo de Formação de Multiplicadores',
  shortTitle: 'Formação de multiplicadores',
  subtitle:
    'Preparação do policial federal para apresentar o conteúdo de prevenção a fraudes bancárias eletrônicas ao público em geral, com mensagem padronizada, limites de fala definidos e condução didática.',
  duration: '70 min',
  level: 'Formação de capacitadores',
  prerequisite:
    'Certificado de conclusão do curso Cidadão Digital Seguro (6 módulos, 20 horas).',
  summary:
    'Este módulo não reapresenta o conteúdo de segurança digital: parte do princípio de que você já o domina, por ter concluído o curso. O foco aqui é outro — como levar esse conteúdo a uma plateia leiga, o que você pode e não pode afirmar como agente público, e o que fazer quando a palestra sai do roteiro.',
  objectives: [
    'Conduzir o Kit de Palestra Pública padronizado preservando a uniformidade da mensagem institucional.',
    'Reconhecer e respeitar os limites de fala do agente público em atividade preventiva.',
    'Explicar tipologias de fraude bancária eletrônica com profundidade suficiente para sustentar perguntas da plateia.',
    'Adaptar linguagem, exemplos e ritmo ao público concreto sem alterar o conteúdo padronizado.',
    'Responder a perguntas difíceis, casos concretos em andamento e presença de vítimas sem extrapolar atribuição.',
    'Preparar, executar e autoavaliar uma apresentação pública.',
  ],
  lessons: [
    {
      id: 'mult-l1',
      title: 'O programa e o papel do multiplicador',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'A repressão penal a fraudes bancárias eletrônicas é necessária, mas atua depois do prejuízo. O volume e a velocidade dessas fraudes tornam a prevenção o instrumento de maior alcance imediato. É isso que este programa persegue: reduzir o número de vítimas antes que exista um inquérito.',
        },
        {
          type: 'paragraph',
          text:
            'O multiplicador é o elo entre o conteúdo padronizado e o público. Sua função não é produzir conteúdo novo, nem representar posição institucional sobre casos, nem prestar atendimento individual. É entregar, com fidelidade e didática, uma mensagem que já foi tecnicamente validada.',
        },
        {
          type: 'list',
          title: 'O que se espera do multiplicador',
          items: [
            'Apresentar o conteúdo padronizado com fidelidade, adaptando a forma e não a substância.',
            'Manter a mensagem uniforme, para que a orientação recebida em qualquer localidade seja a mesma.',
            'Indicar sempre o curso completo como continuidade, não como alternativa à palestra.',
            'Reconhecer o limite da própria atribuição e encaminhar o que estiver fora dela.',
            'Reportar a realização da atividade conforme o procedimento institucional definido.',
          ],
        },
        {
          type: 'callout',
          title: 'Por que a padronização importa',
          text:
            'Orientação preventiva divergente gera desconfiança e desfaz o efeito da campanha. Se um cidadão ouve numa palestra que deve fazer algo e noutra que não deve, o resultado prático é que ele não faz nada. A padronização não limita o multiplicador: protege a mensagem.',
        },
      ],
    },
    {
      id: 'mult-l2',
      title: 'Limites de fala e conduta do agente público',
      estimatedTime: '10 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Esta é a lição mais importante do módulo. Ao apresentar em nome da instituição, o multiplicador responde pelo que diz. As vedações abaixo derivam das diretrizes de conteúdo sensível já homologadas para o curso e das obrigações próprias do agente público.',
        },
        {
          type: 'list',
          title: 'Não prometer o que não se pode garantir',
          items: [
            'Não afirmar que valores perdidos em fraude serão recuperados. Mecanismos administrativos de devolução existem e devem ser mencionados como tentativa célere, jamais como resultado assegurado.',
            'Não afirmar que os autores serão identificados ou punidos. A apuração criminal é técnica e não admite promessa em palestra.',
            'Não estimar prazos de investigação, de devolução de valores ou de resposta institucional.',
          ],
        },
        {
          type: 'list',
          title: 'Sigilo e casos concretos',
          items: [
            'Não mencionar investigação em curso, operação, alvo, dado de inquérito ou informação sujeita a sigilo funcional.',
            'Não usar caso real identificável como exemplo, ainda que sem nomear a vítima: detalhes de local, valor e data tornam pessoas reconhecíveis na própria comunidade.',
            'Preferir exemplos genéricos, ou padrões de golpe amplamente divulgados por fontes oficiais.',
          ],
        },
        {
          type: 'list',
          title: 'Não substituir outras funções',
          items: [
            'Não prestar orientação jurídica individual: o multiplicador não é advogado da vítima nem define a via processual do caso dela.',
            'Não realizar atendimento de caso concreto durante ou após a palestra. O encaminhamento correto é indicar o canal oficial competente.',
            'Não assumir compromisso de acompanhar, agilizar ou interceder em caso individual.',
            'Não orientar o cidadão a investigar, confrontar ou negociar com o suspeito — conduta que agrava o dano e expõe a vítima.',
          ],
        },
        {
          type: 'list',
          title: 'Postura institucional',
          items: [
            'Observar as normas institucionais sobre uso de uniforme, identificação e identidade visual.',
            'Diante de imprensa presente no evento, não conceder entrevista sobre casos ou investigações; remeter à assessoria de comunicação competente.',
            'Verificar previamente se há gravação ou transmissão do evento e conduzir a fala considerando que ela pode ser reproduzida fora de contexto.',
          ],
        },
        {
          type: 'callout',
          title: 'Terminologia',
          text:
            'Ao orientar o cidadão sobre o que guardar após um incidente, diga "evidências digitais", não "provas". "Prova" é categoria do processo, definida por quem o conduz. A distinção evita criar no público a impressão de que um print de tela, por si, decide um caso.',
        },
        {
          type: 'callout',
          title: 'Regra de segurança para o apresentador',
          text:
            'Diante de qualquer pergunta cuja resposta você não tenha com segurança, a conduta correta é dizer que não vai responder de improviso e indicar o canal oficial ou o curso completo. Resposta incerta dada por policial federal é recebida pela plateia como orientação oficial.',
        },
      ],
    },
    {
      id: 'mult-l3',
      title: 'Tipologias de fraude bancária eletrônica',
      estimatedTime: '10 min',
      content: [
        {
          type: 'paragraph',
          text:
            'O curso cidadão apresenta os golpes por sua aparência, que é o que o público reconhece. O multiplicador precisa enxergar a estrutura por baixo da aparência: é isso que permite explicar um golpe novo, que ainda não tem nome, sem esperar material atualizado.',
        },
        {
          type: 'list',
          title: 'Estrutura comum a praticamente todas as fraudes',
          items: [
            'Obtenção de contato ou de dado prévio da vítima, que confere verossimilhança à abordagem.',
            'Construção de autoridade ou de vínculo: instituição financeira, órgão público, empresa conhecida ou pessoa próxima.',
            'Criação de pressão temporal ou emocional, que suprime a verificação.',
            'Indução ao ato: transferir, pagar, informar código, autorizar, instalar ou clicar.',
            'Dissipação imediata do valor, tratada na lição seguinte.',
          ],
        },
        {
          type: 'list',
          title: 'Famílias de tipologia',
          items: [
            'Fraude por engenharia social pura: falsa central de atendimento, falso parente, falso suporte técnico, falso funcionário. O criminoso não invade nada — convence.',
            'Fraude com apoio técnico: aplicativo de acesso remoto instalado pela própria vítima, aplicativo falso de instituição financeira, sobreposição de tela em dispositivo móvel.',
            'Fraude documental sobre o instrumento de pagamento: alteração de dados de beneficiário, substituição de código de barras, substituição de QR Code.',
            'Fraude por apropriação de identidade digital: tomada de conta de aplicativo de mensagens ou de rede social e uso do vínculo de confiança para pedir valores a terceiros.',
            'Fraude na relação de consumo: anúncio, loja ou leilão inexistentes, com pagamento por instrumento sem proteção ao comprador.',
          ],
        },
        {
          type: 'callout',
          title: 'Por que isto importa na palestra',
          text:
            'Quando alguém da plateia descrever um golpe que não está nos slides — e isso acontece com frequência —, você não precisa reconhecer o golpe. Precisa reconhecer a estrutura, apontar em qual família ele se encaixa e indicar a conduta preventiva correspondente.',
        },
      ],
    },
    {
      id: 'mult-l4',
      title: 'Cadeia de dissipação e por que o tempo decide',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'O Kit de Palestra afirma, no bloco de resposta a incidentes, que "o tempo é decisivo". O multiplicador precisa saber por quê, porque essa é a informação que efetivamente muda o comportamento de quem ouve.',
        },
        {
          type: 'paragraph',
          text:
            'O valor obtido por fraude não permanece parado. Ele é fracionado e movimentado por contas de passagem, frequentemente abertas em nome de terceiros — os chamados laranjas, muitas vezes recrutados sob falsa oferta de trabalho ou de renda fácil. A cada movimentação, a possibilidade de bloqueio administrativo diminui.',
        },
        {
          type: 'list',
          title: 'Consequências práticas a transmitir ao público',
          items: [
            'A comunicação imediata à instituição financeira, pelo canal oficial, é o que pode alcançar o valor antes da próxima movimentação.',
            'Vergonha e hesitação são o principal fator de perda de tempo. Tratar isso explicitamente na palestra tem efeito prático mensurável.',
            'Aguardar orientação de terceiros, tentar contato com o golpista ou negociar devolução consome exatamente a janela útil.',
            'O registro da ocorrência é necessário, mas não substitui o acionamento imediato da instituição financeira: são medidas paralelas, não sequenciais.',
          ],
        },
        {
          type: 'callout',
          title: 'Cuidado ao explicar a cadeia',
          text:
            'Explique a dissipação para justificar a urgência, nunca para sugerir que o rastreamento é simples ou que a devolução é provável. O objetivo é produzir reação rápida, não expectativa de reembolso.',
        },
        {
          type: 'callout',
          title: 'Prevenção do lado do laranja',
          text:
            'Vale incluir na fala, quando o público for jovem ou em situação de vulnerabilidade econômica: emprestar conta, abrir conta para terceiro ou receber valores de desconhecido mediante comissão não é favor nem trabalho informal — é conduta que pode gerar responsabilização penal. Esse é um recorte preventivo pouco explorado e de alto valor.',
        },
      ],
    },
    {
      id: 'mult-l5',
      title: 'Fluxo institucional e enquadramento legal',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'O multiplicador não precisa dominar direito penal, mas será perguntado sobre ele. O objetivo desta lição é permitir uma resposta correta e contida — e, sobretudo, evitar afirmação equivocada sobre atribuição e sobre o destino do caso.',
        },
        {
          type: 'list',
          title: 'O que o público mais pergunta',
          items: [
            'Onde registro a ocorrência? Registro em unidade policial ou pelo canal eletrônico disponível na respectiva unidade federativa, com as evidências já preservadas.',
            'Isso é caso de Polícia Federal ou de Polícia Civil? A atribuição depende de critérios legais do caso concreto. A resposta segura é orientar o registro e esclarecer que a distribuição de atribuição é feita pelas autoridades, não pela vítima.',
            'O que acontece depois? O registro pode dar origem a procedimento de apuração. Não prometa desdobramento, prazo ou resultado.',
            'Vou recuperar meu dinheiro? Existem mecanismos administrativos de tentativa de devolução junto ao sistema financeiro. São tentativa, não garantia. Não vá além disso.',
          ],
        },
        {
          type: 'callout',
          title: 'Bloco pendente de validação jurídica',
          text:
            'A tipificação penal aplicável às fraudes eletrônicas — incluindo as alterações trazidas pela Lei 14.155/2021 e as regras de competência correlatas — deve ser redigida e revisada pela área jurídica competente antes da primeira turma. Este material deliberadamente NÃO enuncia artigos, penas ou critérios de competência: fazê-lo sem validação formal criaria risco de o multiplicador reproduzir informação incorreta em nome da instituição. Trate este bloco como lacuna consciente, a ser preenchida por quem tem atribuição para tanto.',
        },
        {
          type: 'list',
          title: 'Encaminhamentos que o multiplicador pode indicar com segurança',
          items: [
            'Canal oficial da instituição financeira da vítima, para contestação e bloqueio.',
            'Operadora de telefonia e serviço oficial de bloqueio de aparelho, em caso de furto ou roubo.',
            'Fluxo oficial de recuperação de conta da plataforma afetada.',
            'Unidade policial ou canal eletrônico de registro de ocorrência.',
            'Órgãos de defesa do consumidor, quando a relação for de consumo.',
            'Canais oficiais de comunicação de crimes da Polícia Federal, observada a atribuição.',
          ],
        },
      ],
    },
    {
      id: 'mult-l6',
      title: 'Conduzindo o Kit de Palestra padronizado',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'O Kit de Palestra Pública já existe e é o instrumento oficial: 15 slides, com sugestão de fala nas notas de cada um, para 20 a 25 minutos de apresentação mais espaço para perguntas. Não construa material próprio nem substitua os slides.',
        },
        {
          type: 'list',
          title: 'Como usar as notas do apresentador',
          items: [
            'As notas são roteiro, não texto para decorar. Leitura literal soa artificial e reduz a atenção da plateia.',
            'Mantenha a ordem dos blocos: a sequência vai do reconhecimento do risco à ação, e inverter isso deixa o público alarmado sem saber o que fazer.',
            'Preserve o fechamento com indicação do curso completo. É o que converte a palestra em aprendizado continuado.',
          ],
        },
        {
          type: 'list',
          title: 'Ajuste de duração',
          items: [
            'Formato completo, 20 a 25 minutos: todos os 15 slides conforme o kit.',
            'Formato reduzido, cerca de 10 minutos: priorize os blocos de fraude em pagamentos, reconhecimento de golpes e resposta imediata; comprima o bloco de ecossistema e mantenha o checklist de bolso e o fechamento.',
            'Formato ampliado, 40 a 50 minutos: mantenha os 15 slides e amplie com perguntas dirigidas e exemplos regionais, sem acrescentar slides.',
          ],
        },
        {
          type: 'callout',
          title: 'O checklist de bolso é o entregável da palestra',
          text:
            'De uma palestra de 20 minutos, o público retém poucas coisas. As cinco regras de ouro do checklist são o que deve sobreviver. Reserve tempo real para elas e considere distribuí-las em material impresso.',
        },
        {
          type: 'callout',
          title: 'Plano B',
          text:
            'Prepare-se para apresentar sem projeção e sem internet. Os seis blocos e as cinco regras devem ser apresentáveis apenas com a fala. Falha de equipamento é a ocorrência mais comum em atividade externa.',
        },
      ],
    },
    {
      id: 'mult-l7',
      title: 'Adaptação por público sem alterar a mensagem',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Padronização de mensagem não significa uniformidade de linguagem. O conteúdo e as orientações permanecem idênticos; o que muda são exemplos, vocabulário, ritmo e a ênfase relativa entre os blocos.',
        },
        {
          type: 'list',
          title: 'Pessoas idosas',
          items: [
            'Ritmo mais lento, uma ideia por vez, repetição deliberada das regras principais.',
            'Ênfase em falsa central de atendimento, falso parente e falso benefício ou empréstimo.',
            'Evitar termos em inglês: prefira "mensagem falsa" a "phishing", explicando o termo técnico apenas uma vez.',
            'Tratar explicitamente a vergonha de relatar, que nesse público é o principal obstáculo à reação rápida.',
            'Incluir orientação sobre a quem recorrer de imediato na família ou na rede de apoio.',
          ],
        },
        {
          type: 'list',
          title: 'Comerciantes, microempreendedores e profissionais autônomos',
          items: [
            'Ênfase em fraude no instrumento de pagamento: comprovante falso, QR Code substituído, boleto alterado.',
            'Conferência de recebimento no próprio aplicativo da instituição, nunca no comprovante apresentado pelo cliente.',
            'Riscos de conta compartilhada com funcionários e de dispositivo de trabalho compartilhado.',
            'Cuidado específico com pedido de estorno sob pressão e com falso cliente que alega erro de valor.',
          ],
        },
        {
          type: 'list',
          title: 'Servidores públicos e ambiente corporativo',
          items: [
            'Ênfase em mensagem que imita comunicação interna, falso setor de tecnologia e falso pedido de chefia.',
            'Reforço do dever de comunicar tentativa de fraude ao setor responsável, e não apenas ignorá-la.',
            'Cuidado com uso de dispositivo pessoal para acesso a sistema institucional.',
          ],
        },
        {
          type: 'list',
          title: 'Jovens e estudantes',
          items: [
            'Ênfase em apropriação de conta de rede social e de aplicativo de mensagens, e no uso do vínculo de confiança para atingir terceiros.',
            'Abordar explicitamente o recrutamento como laranja mediante falsa oferta de renda, conforme a lição 4.',
            'Ênfase em fraude em compra e venda entre pessoas físicas e em anúncio irreal.',
          ],
        },
        {
          type: 'list',
          title: 'Público com baixo letramento digital ou de área rural',
          items: [
            'Partir do dispositivo que a pessoa efetivamente usa, normalmente apenas o celular.',
            'Ênfase em recebimento de benefício, falso empréstimo e falsa central.',
            'Substituir instrução de configuração por instrução de conduta: o que não fazer quando o telefone toca.',
            'Considerar limitação de conectividade ao indicar o curso completo, oferecendo alternativa impressa.',
          ],
        },
        {
          type: 'callout',
          title: 'O que nunca muda',
          text:
            'Independentemente do público: as cinco regras de ouro, a orientação de usar canal oficial independente, a vedação de compartilhar senha ou código, a urgência de acionar a instituição financeira e a indicação do curso completo.',
        },
      ],
    },
    {
      id: 'mult-l8',
      title: 'Manejo de plateia, preparação e autoavaliação',
      estimatedTime: '10 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Uma palestra sobre fraude bancária atrai pessoas que estão vivendo o problema. É previsível que apareçam casos em curso, pedidos de ajuda individual, revolta contra instituições financeiras e contra a própria polícia, e vítimas em sofrimento. As notas do kit cobrem o caso fácil, que é a dúvida técnica fora de escopo. Esta lição trata do caso difícil.',
        },
        {
          type: 'list',
          title: 'Situações previsíveis e conduta',
          items: [
            'Pessoa relata caso em andamento e pede orientação individual: acolha brevemente, não peça detalhes em público, não opine sobre o caso e indique o canal oficial. Ofereça falar ao final, sem prometer atendimento.',
            'Pessoa pergunta se vai receber o dinheiro de volta: responda que existem mecanismos de tentativa de devolução, que a rapidez aumenta a chance e que não há garantia. Não vá além.',
            'Pessoa manifesta revolta contra a instituição financeira: não endosse nem defenda a instituição; redirecione para a conduta preventiva e para o canal de contestação.',
            'Pessoa manifesta revolta contra a polícia ou afirma que denúncia não serve para nada: não entre em disputa, reconheça a frustração, explique o valor do registro para a apuração e retome o eixo preventivo.',
            'Pessoa se emociona ou expõe situação íntima: interrompa a exposição com cuidado, evite que ela se exponha diante da plateia e ofereça conversa ao final.',
            'Pergunta sobre investigação, operação ou caso noticiado: não comente. Remeta à assessoria de comunicação competente.',
            'Pergunta técnica que você não sabe responder: diga que não vai responder de improviso e indique o curso completo ou o canal oficial.',
          ],
        },
        {
          type: 'callout',
          title: 'A pergunta que não deve ser respondida em público',
          text:
            'Qualquer pergunta que exija examinar o caso concreto de alguém. Responder equivale a prestar atendimento individual sem os elementos necessários, diante de plateia, com risco de orientação errada e de exposição da vítima.',
        },
        {
          type: 'list',
          title: 'Checklist de preparação, antes de sair',
          items: [
            'Versão vigente do Kit de Palestra conferida.',
            'Duração acordada com o organizador e formato escolhido.',
            'Perfil e tamanho estimado do público conhecidos, para escolher os exemplos.',
            'Projeção, som, cabo e adaptador verificados, com plano B sem projeção.',
            'Material impresso do checklist de bolso, se houver distribuição.',
            'Condições de acessibilidade do local verificadas com o organizador.',
            'Definido se haverá gravação, transmissão ou presença de imprensa.',
            'Dados de reporte da atividade prontos para registro posterior.',
          ],
        },
        {
          type: 'list',
          title: 'Autoavaliação, depois da palestra',
          items: [
            'Cumpri o tempo acordado?',
            'Apresentei os seis blocos na ordem e fechei com as cinco regras?',
            'Indiquei o curso completo?',
            'Mantive-me dentro dos limites de fala, sem promessa de recuperação de valores, sem comentar caso concreto e sem orientação jurídica individual?',
            'Alguma pergunta ficou sem resposta e precisa ser levada ao conteúdo ou à área competente?',
            'Registrei os dados da atividade conforme o procedimento institucional?',
          ],
        },
      ],
    },
  ],
  checklist: [
    'Concluí o curso Cidadão Digital Seguro e domino o conteúdo que vou apresentar.',
    'Conheço os limites de fala e sei o que não posso afirmar como agente público.',
    'Sei explicar a estrutura comum das fraudes, e não apenas os golpes nomeados nos slides.',
    'Sei justificar a urgência da comunicação à instituição financeira sem prometer devolução.',
    'Sei conduzir o Kit de Palestra nos formatos reduzido, completo e ampliado.',
    'Sei adaptar exemplos e linguagem ao público sem alterar a mensagem padronizada.',
    'Tenho conduta definida para caso concreto, vítima presente, revolta e pergunta sobre investigação.',
    'Cumpri o checklist de preparação logística antes da atividade.',
    'Sei como reportar a atividade realizada.',
  ],
  practicalActivity: {
    title: 'Preparação de uma apresentação real',
    description:
      'Escolha um público concreto entre os tratados na lição 7 e prepare a condução do Kit de Palestra para ele. A atividade não pede material novo: pede decisões de condução, registradas por escrito.',
    steps: [
      'Identifique o público, o tamanho estimado e a duração disponível.',
      'Escolha o formato (reduzido, completo ou ampliado) e justifique a escolha.',
      'Indique quais exemplos você usará em cada bloco, verificando que nenhum permite identificar caso ou pessoa real.',
      'Redija a frase exata com que responderá à pergunta "vou recuperar meu dinheiro?".',
      'Redija a frase exata com que encerrará um pedido de orientação sobre caso individual.',
      'Liste os itens do checklist logístico aplicáveis ao local previsto.',
    ],
  },
  habilitacao: {
    // Especificação de requisitos para implementação pela ANP. Não é funcionalidade desta aplicação.
    observacao:
      'O credenciamento oficial do multiplicador ocorrerá na plataforma da ANP. Os requisitos abaixo são especificação, não recurso implementado aqui.',
    requisitos: [
      'Certificado de conclusão do curso Cidadão Digital Seguro (6 módulos, 20 horas).',
      'Aproveitamento mínimo no quiz deste módulo, no mesmo critério do curso base.',
      'Apresentação supervisionada avaliada por multiplicador ou instância já habilitada — requisito prático, não substituível por prova objetiva.',
      'Definição institucional de prazo de validade da habilitação e de periodicidade de reciclagem.',
    ],
  },
  resources: [
    {
      label: 'Kit de Palestra Pública — Cidadão Digital Seguro (material institucional interno)',
      note: 'Instrumento oficial de apresentação, 15 slides com notas de apresentador.',
    },
    {
      label: 'Curso Cidadão Digital Seguro (pré-requisito)',
      url: 'https://aicyberproject.github.io/cidadao-digital-seguro/',
    },
    {
      label: 'MJSP — Sofri um golpe, e agora?',
      url: 'https://www.gov.br/mj/pt-br/acesso-a-informacao/acoes-e-programas/sofri-um-golpe-e-agora',
    },
    {
      label: 'Polícia Federal — Combate a Crimes Cibernéticos',
      url: 'https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos',
    },
    {
      label: 'CERT.br — Fascículo Golpes: Caiu? Veja o que Fazer',
      url: 'https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf',
    },
    {
      label: 'Campanha #DigaNãoAosGolpes — FEBRABAN',
      url: 'https://portal.febraban.org.br/AntiFraude/',
    },
  ],
}

export default moduloMultiplicador
