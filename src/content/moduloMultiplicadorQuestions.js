// Banco de questões do Módulo de Formação de Multiplicadores.
//
// NÃO integra `src/content/questionBank/index.js`; não é conteúdo da trilha cidadã.
// Mesmo formato dos bancos existentes: { question, options[4], answer: índice da correta }.
//
// 20 questões, para quiz de 10 sorteadas, mantendo o critério de 70% de aproveitamento do curso base.
// Peso concentrado em limites de fala e manejo de plateia: são os pontos de maior risco institucional.
//
// Construção dos distratores: cada distrator enuncia uma conduta ERRADA plausível, com o mesmo nível
// de especificidade e extensão da alternativa correta. Isso é deliberado; se a resposta correta for
// sistematicamente a mais longa e detalhada, o candidato passa escolhendo a opção maior sem ler o
// conteúdo, o que inviabiliza a avaliação justamente no módulo em que o aproveitamento condiciona a
// habilitação. A posição da resposta e a extensão relativa das alternativas foram distribuídas.

export const moduloMultiplicadorQuestions = [
  {
    question:
      'Durante a palestra, um participante pergunta se vai recuperar o dinheiro perdido em um Pix aplicado por golpista. Qual é a resposta adequada do multiplicador?',
    options: [
      'Garantir que, com o registro de ocorrência e a contestação junto ao banco, o valor será integralmente devolvido em alguns dias úteis.',
      'Afirmar que a devolução depende apenas da agilidade da investigação policial e do volume de casos na unidade responsável.',
      'Explicar que existem mecanismos de tentativa de devolução, que a rapidez aumenta a chance e que não há garantia de sucesso.',
      'Orientar que ele tente contato com o golpista para negociar a devolução antes de acionar o banco, preservando as mensagens.',
    ],
    answer: 2,
  },
  {
    question: 'Qual é a função do multiplicador neste programa?',
    options: [
      'Produzir material próprio adaptado a cada localidade, aproveitando os casos de fraude mais comentados na região.',
      'Entregar com fidelidade e didática um conteúdo padronizado já tecnicamente validado.',
      'Prestar atendimento preliminar às vítimas que comparecerem à palestra e orientá-las individualmente.',
      'Representar a posição institucional sobre casos de fraude noticiados na região onde apresenta.',
    ],
    answer: 1,
  },
  {
    question:
      'Um participante relata, no meio da palestra, um caso concreto em andamento e pede orientação sobre o que fazer. Qual conduta é correta?',
    options: [
      'Pedir os detalhes do caso e orientar publicamente, de modo que toda a plateia aprenda com um exemplo real e recente, sem mencionar o nome da vítima.',
      'Informar que não pode tratar do assunto, encerrar a intervenção e seguir imediatamente para o próximo slide da apresentação.',
      'Comprometer-se a acompanhar pessoalmente o andamento do caso e a retornar o contato depois da palestra.',
      'Acolher brevemente sem pedir detalhes, não opinar sobre o caso e indicar o canal oficial, oferecendo conversa ao final sem prometer atendimento.',
    ],
    answer: 3,
  },
  {
    question:
      'Por que o multiplicador deve dizer "evidências digitais" em vez de "provas" ao orientar o cidadão sobre o que guardar após um incidente?',
    options: [
      'Porque "prova" é categoria do processo e o termo cria no público a impressão de que um print decide o caso.',
      'Porque a palavra "provas" constitui terminologia vedada em qualquer documento ou manifestação de natureza institucional.',
      'Porque a legislação impõe o uso da expressão "evidências digitais" em toda atividade de prevenção conduzida por agentes públicos.',
      'Porque "evidências digitais" é a tradução técnica correta do termo e "provas" pertence apenas ao registro da linguagem coloquial.',
    ],
    answer: 0,
  },
  {
    question:
      'Alguém da plateia descreve um golpe que não consta nos slides do kit. Qual é a conduta mais adequada?',
    options: [
      'Informar que aquele golpe não integra o conteúdo padronizado e recomendar que a pessoa procure informação em fontes oficiais depois.',
      'Improvisar uma explicação técnica detalhada sobre o funcionamento daquele golpe específico e sobre como ele é investigado.',
      'Reconhecer a estrutura comum da fraude, apontar a que família ela pertence e indicar a conduta preventiva correspondente.',
      'Pedir que a pessoa procure a delegacia para obter a explicação adequada sobre aquela modalidade.',
    ],
    answer: 2,
  },
  {
    question:
      'Qual é o objetivo de explicar ao público a cadeia de dissipação de valores (contas de passagem e laranjas)?',
    options: [
      'Demonstrar que o rastreamento do dinheiro é tecnicamente simples e que costuma produzir resultado quando há registro de ocorrência.',
      'Justificar a urgência de acionar imediatamente a instituição financeira, sem criar expectativa de reembolso.',
      'Mostrar que o registro de ocorrência se torna dispensável quando o valor já foi movimentado para outras contas.',
      'Convencer a vítima de que a recuperação é provável desde que ela procure o banco no mesmo dia do ocorrido.',
    ],
    answer: 1,
  },
  {
    question: 'Sobre o uso de exemplos na palestra, qual orientação é correta?',
    options: [
      'Usar casos reais da região sem nomear a vítima, porque a proximidade com o cotidiano da plateia aumenta a credibilidade da fala.',
      'Usar casos de investigações já concluídas é permitido, desde que o procedimento não esteja mais submetido a sigilo.',
      'Qualquer exemplo pode ser usado se o multiplicador não mencionar o nome da instituição financeira envolvida.',
      'Preferir exemplos genéricos ou padrões divulgados por fontes oficiais, porque local, valor e data tornam pessoas reconhecíveis na comunidade.',
    ],
    answer: 3,
  },
  {
    question:
      'Um participante pergunta se determinado caso é de atribuição da Polícia Federal ou da Polícia Civil. Qual resposta é segura?',
    options: [
      'Orientar o registro da ocorrência e esclarecer que a distribuição de atribuição é feita pelas autoridades, não pela vítima.',
      'Definir a atribuição na hora, com base no valor envolvido e na quantidade de vítimas atingidas pela mesma fraude.',
      'Afirmar que toda fraude bancária eletrônica é de atribuição da Polícia Federal, por envolver o sistema financeiro nacional.',
      'Afirmar que toda fraude praticada pela internet é de atribuição da Polícia Civil do estado onde reside a vítima.',
    ],
    answer: 0,
  },
  {
    question:
      'Por que este material não enuncia artigos, penas e critérios de competência sobre fraude eletrônica?',
    options: [
      'Porque o tema não desperta interesse do público que costuma comparecer às palestras de prevenção.',
      'Porque o multiplicador está impedido de mencionar qualquer aspecto legal durante a apresentação ao público.',
      'Porque a tipificação deve ser redigida e revisada pela área jurídica competente, sob pena de o multiplicador reproduzir informação incorreta.',
      'Porque a legislação brasileira ainda não disciplinou de forma específica as fraudes praticadas por meio eletrônico.',
    ],
    answer: 2,
  },
  {
    question: 'Ao apresentar para um público de pessoas idosas, qual adaptação é adequada?',
    options: [
      'Reduzir o número de regras de ouro apresentadas ao final, para não sobrecarregar a memória do público presente.',
      'Substituir o bloco de resposta a incidentes pela orientação de procurar sempre um familiar antes de qualquer providência.',
      'Omitir o bloco de catálogo de golpes, porque a descrição das fraudes tende a assustar esse público desnecessariamente.',
      'Manter conteúdo e orientações idênticos, ajustando ritmo, vocabulário e ênfase, e tratando explicitamente a vergonha de relatar.',
    ],
    answer: 3,
  },
  {
    question: 'O que significa "padronização da mensagem" na condução das palestras?',
    options: [
      'Manter conteúdo e orientações idênticos, podendo variar exemplos, vocabulário, ritmo e ênfase.',
      'Ler literalmente as notas do apresentador em todos os slides, para assegurar que nada seja acrescentado ou omitido.',
      'Apresentar sempre no mesmo tempo total, independentemente do perfil e do tamanho do público presente.',
      'Utilizar exatamente os mesmos exemplos em qualquer localidade, de modo que a experiência seja idêntica.',
    ],
    answer: 0,
  },
  {
    question:
      'Há imprensa presente no evento e um jornalista pergunta ao multiplicador sobre uma operação recente. Qual conduta é correta?',
    options: [
      'Responder apenas aquilo que já foi divulgado publicamente pela própria imprensa a respeito da operação.',
      'Responder em caráter pessoal, deixando expressamente consignado que não fala em nome da instituição.',
      'Não conceder entrevista sobre casos ou investigações e remeter à assessoria de comunicação competente.',
      'Responder somente se a pergunta não envolver nomes de investigados nem detalhes de diligências realizadas.',
    ],
    answer: 2,
  },
  {
    question:
      'Para um público de comerciantes e microempreendedores, qual ênfase é mais pertinente?',
    options: [
      'Configuração de roteador doméstico e proteção da rede Wi-Fi residencial contra acesso de terceiros.',
      'Fraude no instrumento de pagamento, conferindo o recebimento no aplicativo da instituição e não no comprovante apresentado pelo cliente.',
      'Proteção de perfis pessoais em redes sociais e ajuste das configurações de privacidade de fotos e publicações.',
      'Rotina de backup de arquivos pessoais como proteção contra sequestro de dados por ransomware.',
    ],
    answer: 1,
  },
  {
    question:
      'Diante de uma pergunta técnica cuja resposta o multiplicador não tem com segurança, qual é a conduta correta?',
    options: [
      'Oferecer a resposta que considera mais provável, sinalizando à plateia que pode haver alguma imprecisão.',
      'Pedir que outro participante que conheça o tema responda, complementando depois com a própria avaliação.',
      'Responder com base na experiência pessoal, deixando claro que não se trata de orientação oficial da instituição.',
      'Dizer que não vai responder de improviso e indicar o curso completo ou o canal oficial.',
    ],
    answer: 3,
  },
  {
    question:
      'Qual elemento está presente em praticamente todas as tipologias de fraude bancária eletrônica?',
    options: [
      'Criação de pressão temporal ou emocional que suprime a verificação pela vítima.',
      'Invasão técnica do aplicativo da instituição financeira por exploração de falha do sistema.',
      'Uso de programa malicioso instalado no dispositivo sem qualquer ação ou autorização da vítima.',
      'Contato presencial prévio entre o criminoso e a vítima, necessário para obter dados de confiança.',
    ],
    answer: 0,
  },
  {
    question: 'Sobre o recrutamento de laranjas, qual orientação preventiva é correta transmitir?',
    options: [
      'Emprestar a conta bancária a terceiro configura irregularidade meramente administrativa perante a instituição financeira.',
      'A conduta somente se torna relevante se a pessoa souber com exatidão a origem ilícita dos valores recebidos.',
      'Emprestar conta, abrir conta para terceiro ou receber valores de desconhecido mediante comissão pode gerar responsabilização penal.',
      'O tema não deve ser abordado em palestras para público jovem, por desviar o foco da prevenção patrimonial.',
    ],
    answer: 2,
  },
  {
    question: 'A palestra terá apenas 10 minutos. Como o multiplicador deve proceder?',
    options: [
      'Apresentar os quinze slides em ritmo acelerado, para não omitir nenhuma parte do conteúdo padronizado.',
      'Priorizar fraude em pagamentos, reconhecimento de golpes e resposta imediata, mantendo o checklist de bolso e o fechamento.',
      'Apresentar somente o bloco de resposta a incidentes, que concentra a orientação de maior utilidade prática.',
      'Recusar a atividade, porque o kit padronizado pressupõe vinte a vinte e cinco minutos de apresentação.',
    ],
    answer: 1,
  },
  {
    question:
      'Um participante manifesta revolta e afirma que registrar ocorrência não serve para nada. Qual conduta é adequada?',
    options: [
      'Concordar que o sistema é ineficiente em casos como aquele, de modo a criar empatia com a plateia.',
      'Rebater a afirmação apresentando dados de produtividade institucional e exemplos de casos solucionados.',
      'Encerrar antecipadamente o espaço de perguntas, para evitar que o clima do evento se deteriore.',
      'Não entrar em disputa, reconhecer a frustração, explicar o valor do registro e retomar o eixo preventivo.',
    ],
    answer: 3,
  },
  {
    question:
      'Qual é o entregável que deve sobreviver na memória do público após uma palestra de 20 minutos?',
    options: [
      'As cinco regras de ouro do checklist de bolso.',
      'A lista completa das tipologias de fraude apresentadas durante a palestra.',
      'Os nomes das instituições que compõem o ecossistema de segurança digital.',
      'A explicação sobre a cadeia de dissipação de valores e as contas de passagem.',
    ],
    answer: 0,
  },
  {
    question: 'Sobre o encerramento da palestra, qual orientação é correta?',
    options: [
      'Apresentar o curso completo como alternativa à palestra, destinada a quem quiser realmente se aprofundar no tema.',
      'Omitir a indicação do curso quando o público tiver baixa conectividade, para não gerar expectativa frustrada.',
      'Indicar o curso completo como continuidade, preservando o fechamento previsto no kit.',
      'Substituir a indicação do curso pelo contato direto do multiplicador, que pode orientar casos específicos depois.',
    ],
    answer: 2,
  },
]

export default moduloMultiplicadorQuestions
