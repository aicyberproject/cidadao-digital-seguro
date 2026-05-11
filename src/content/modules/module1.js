import { Shield } from 'lucide-react'
import { officialLinks } from '../officialLinks'
import { questionBank } from '../questionBank'

export const module1 = {
  id: 'm1',
  title: 'Módulo 1 — Ecossistema de Segurança Digital',
  shortTitle: 'Ecossistema de Segurança Digital',
  icon: Shield,
  theme: 'Cidadania digital, prevenção, cooperação institucional e resposta inicial a golpes.',
  goal:
    'Compreender a segurança digital como responsabilidade compartilhada, reconhecer os principais atores do ecossistema de proteção e aplicar critérios iniciais para identificar, prevenir e reagir a golpes digitais.',

  content: [
    {
      type: 'text',
      title: 'Abertura do módulo',
      body: [
        'Segurança digital também é cidadania. Ela afeta a forma como o cidadão acessa bancos, serviços públicos, compras online, redes sociais, aplicativos de mensagem, trabalho remoto, educação, entretenimento e comunicação familiar.',
        'O cidadão digital seguro não é aquele que conhece todas as técnicas de investigação ou programação. É aquele que sabe reconhecer sinais de risco, adotar hábitos mínimos de proteção, confirmar informações por canais oficiais e reagir de forma organizada quando algo suspeito ocorre.',
        'Este módulo apresenta a lógica geral do curso: identificar o risco, prevenir com método e reagir com segurança. A partir dessa base, os módulos seguintes aprofundarão higiene digital, proteção de dispositivos, consumo seguro, golpes recorrentes e providências em caso de incidente.',
      ],
    },
    {
      type: 'scenario',
      title: 'Pergunta mobilizadora',
      prompt:
        'Imagine que você recebeu uma mensagem dizendo que sua conta bancária será bloqueada em 10 minutos. O texto usa o nome do banco, informa um protocolo, apresenta um link e orienta que você não desligue nem compartilhe a situação com terceiros. Ao mesmo tempo, você se recorda de uma campanha pública alertando para golpes digitais. O que deve ser feito primeiro? Quem orienta preventivamente? Quem atua no setor financeiro? Quem articula políticas públicas? Quem pode investigar crimes dentro de sua atribuição?',
    },
    {
      type: 'text',
      title: 'Segurança digital como responsabilidade compartilhada',
      body: [
        'A proteção do cidadão no ambiente digital não é tarefa de uma única instituição. Ela envolve Estado, sistema financeiro, plataformas digitais, empresas de tecnologia, operadoras de telefonia, comércio eletrônico, escolas, famílias e o próprio usuário.',
        'Golpes digitais normalmente exploram pontos de contato entre esses atores: uma mensagem enviada por aplicativo, um link para página falsa, uma ligação simulando central de atendimento, um perfil de rede social aparentemente legítimo, uma conta bancária receptora ou um anúncio fraudulento.',
        'Quando uma pessoa identifica um golpe, evita clicar em links suspeitos, preserva mensagens, confirma informações por canais oficiais e comunica o fato adequadamente, ela participa ativamente do ecossistema de segurança digital.',
      ],
    },
    {
      type: 'text',
      title: 'O que é crime cibernético neste curso',
      body: [
        'Neste curso, o termo crime cibernético é usado em sentido amplo, abrangendo tanto crimes praticados diretamente contra sistemas, contas, dispositivos e dados quanto crimes tradicionais facilitados por meios digitais.',
        'A imagem popular do “hacker invasor” é insuficiente para compreender o problema atual. Muitas ocorrências envolvem engenharia social, uso indevido de dados pessoais, falsas centrais de atendimento, perfis falsos, páginas fraudulentas, anúncios enganosos, links maliciosos, malware, vazamentos de dados e manipulação emocional da vítima.',
        'Por isso, a prevenção deve combinar conhecimento institucional, hábitos de higiene digital e capacidade de reconhecer padrões de fraude antes que o prejuízo ocorra.',
      ],
    },
    {
      type: 'text',
      title: 'Fraude, golpe e engenharia social',
      body: [
        'Uma distinção útil para fins educativos é diferenciar fraude e golpe. Em muitas fraudes, há movimentação irregular ou ilegítima de recursos sem que o titular compreenda ou autorize adequadamente o ato. Em muitos golpes, a própria vítima é induzida por manipulação, urgência ou falsa confiança a realizar uma ação prejudicial.',
        'A engenharia social é o uso de estratégias psicológicas para induzir alguém a clicar, informar dados, instalar aplicativos, transferir valores, entregar cartões, compartilhar códigos ou confiar em uma identidade falsa.',
        'O criminoso pode se apresentar como funcionário de banco, agente público, entregador, comprador, vendedor, advogado, parente, suporte técnico, investidor, celebridade ou representante de plataforma. O nome do golpe muda, mas a lógica costuma envolver confiança, pressão e redução do tempo de reflexão.',
      ],
    },
    {
      type: 'text',
      title: 'Papéis institucionais no ecossistema',
      body: [
        'A Polícia Federal exerce função investigativa dentro de sua esfera de atribuição, especialmente quando a natureza do fato, a competência legal ou a dimensão interestadual, internacional ou federal justificam sua atuação.',
        'O Ministério da Justiça e Segurança Pública atua na articulação estratégica, na coordenação de políticas públicas e no fortalecimento de ações nacionais de prevenção, capacitação, integração e enfrentamento à criminalidade.',
        'A FEBRABAN, como entidade representativa do setor bancário, tem papel relevante na prevenção setorial, na comunicação antifraude, na orientação ao consumidor e na difusão de boas práticas de segurança em transações financeiras.',
        'Nenhum desses papéis elimina a responsabilidade do cidadão de adotar cautelas básicas: desconfiar de urgências artificiais, não compartilhar códigos, não instalar aplicativos indicados por desconhecidos, confirmar informações por canais oficiais e preservar evidências.',
      ],
    },
    {
      type: 'text',
      title: 'A Aliança Nacional de Combate a Fraudes Bancárias Digitais',
      body: [
        'A cooperação entre setor público e setor privado é essencial porque golpes digitais atravessam fronteiras institucionais. Uma fraude pode começar em uma rede social, seguir por aplicativo de mensagem, envolver linha telefônica, usar conta bancária receptora, passar por plataformas de anúncio e terminar com escoamento rápido dos valores.',
        'A Aliança Nacional de Combate a Fraudes Bancárias Digitais representa uma estratégia de coordenação entre atores públicos e privados para aperfeiçoar prevenção, detecção, repressão, compartilhamento de informações, capacitação, tratamento de vítimas e conscientização da população.',
        'Para o cidadão, a principal mensagem é simples: segurança digital não depende apenas de repressão após o prejuízo. Ela exige prevenção, informação clara, canais confiáveis e resposta rápida.',
      ],
    },
    {
      type: 'text',
      title: 'Padrão europeu de prevenção: reduzir risco antes do incidente',
      body: [
        'A abordagem europeia de prevenção ao cibercrime enfatiza cooperação, conscientização, proteção de dados, segurança de contas, resposta rápida e redução de oportunidades para o criminoso. O objetivo não é transferir culpa para a vítima, mas ampliar sua capacidade de decisão segura.',
        'Boas práticas internacionais de higiene digital incluem usar senhas fortes e únicas, ativar verificação em duas etapas, manter sistemas e aplicativos atualizados, desconfiar de links e anexos inesperados, fazer backup de dados importantes e proteger a rede Wi-Fi.',
        'Essas medidas não eliminam todos os riscos, mas aumentam o custo para o criminoso, reduzem a chance de acesso indevido e dão ao cidadão mais tempo para perceber sinais de fraude.',
      ],
    },
    {
      type: 'text',
      title: 'Sinais de alerta: quando parar antes de agir',
      body: [
        'Golpes digitais costumam dar sinais. Entre os mais importantes estão: urgência extrema, ameaça de bloqueio, promessa de vantagem exagerada, pedido de sigilo, solicitação de senha ou código, orientação para instalar aplicativo, link encurtado ou estranho, mudança para canal não oficial e pressão para transferência imediata.',
        'A presença de um único sinal já exige cautela. A combinação de vários sinais deve levar o cidadão a interromper a interação e buscar confirmação por canal oficial.',
        'A regra prática é: contato recebido não prova identidade. Quem recebeu a mensagem, ligação ou link deve confirmar por outro meio, preferencialmente digitando o endereço oficial, usando o aplicativo já instalado ou procurando atendimento em canal conhecido.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 1 — Falsa central bancária',
      body: [
        'Uma pessoa recebe ligação de suposta central bancária informando compra suspeita, falha de segurança ou risco de bloqueio da conta. O atendente conhece parte dos dados da vítima, usa linguagem profissional e pede confirmação de código, instalação de aplicativo ou transferência para uma “conta segura”.',
        'Esse cenário combina falsa identidade institucional, engenharia social e urgência artificial. A atitude segura é encerrar o contato, não informar códigos, não instalar aplicativos, não transferir valores e procurar o banco por canal oficial.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 2 — Perfil falso e pedido de dinheiro',
      body: [
        'Um criminoso copia a foto de uma pessoa e envia mensagens a familiares dizendo que trocou de número. Depois, solicita transferência urgente para resolver um problema temporário.',
        'A vítima não deve confiar apenas na foto, no nome ou no tom da conversa. Deve confirmar a identidade por outro canal, preferencialmente ligação de voz ou vídeo para o número antigo ou contato presencial. O pedido de urgência é parte da manipulação.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 3 — Link de falsa taxa ou falsa promoção',
      body: [
        'O cidadão recebe mensagem sobre encomenda retida, taxa alfandegária, programa de pontos, benefício social, falsa vaga de emprego ou promoção imperdível. O link leva a uma página visualmente parecida com site oficial.',
        'A aparência da página não basta para comprovar autenticidade. Criminosos conseguem copiar marcas, cores, logotipos e linguagem institucional. O comportamento seguro é não seguir o link recebido e acessar o serviço digitando o endereço oficial ou usando aplicativo legítimo.',
      ],
    },
    {
      type: 'text',
      title: 'Primeira resposta do cidadão',
      body: [
        'O cidadão não deve tentar investigar por conta própria nem confrontar suspeitos. A primeira resposta deve reduzir o dano e preservar informações úteis.',
        'Em caso de suspeita, recomenda-se interromper o contato, não clicar em novos links, não apagar mensagens, registrar números e perfis, salvar comprovantes, capturar telas, comunicar a instituição envolvida por canal oficial e buscar o canal adequado de registro ou atendimento.',
        'A preservação de evidências digitais simples — mensagens, URLs, números, horários, comprovantes, chaves Pix, perfis e capturas de tela — pode ajudar no atendimento, na prevenção de novas vítimas e em eventual apuração.',
      ],
    },
    {
      type: 'video',
      title: 'Videoaula do módulo',
      description:
        'Explique segurança digital como tema de cidadania, apresente o papel institucional de PF, MJSP e FEBRABAN, diferencie prevenção, orientação e investigação, e mostre como reconhecer sinais iniciais de fraude.',
      duration: '8 min',
    },
    {
      type: 'tip',
      title: 'Dica de Especialista',
      text:
        'Quando a situação parecer urgente demais, pause antes de agir. A pressa é uma das ferramentas mais usadas por golpistas. Contato recebido nunca substitui verificação independente por canal oficial.',
    },
    {
      type: 'scam',
      title: 'Momento É Golpe!',
      text:
        'Uma suposta central informa risco na sua conta, pede confirmação imediata de dados, solicita código recebido por SMS ou orienta a instalar um aplicativo de segurança. O principal sinal de alerta é a tentativa de criar urgência antes da verificação independente.',
    },
    {
      type: 'checklist',
      title: 'Checklist de revisão',
      items: [
        'Entendi que segurança digital também é cidadania',
        'Compreendi que a proteção digital envolve Estado, setor privado, plataformas e comportamento do usuário',
        'Sei diferenciar, em linhas gerais, os papéis de PF, MJSP e FEBRABAN',
        'Reconheço que prevenção, orientação, investigação e tratamento de vítimas são dimensões complementares',
        'Compreendi a diferença operacional entre fraude, golpe e engenharia social',
        'Reconheço sinais de alerta como urgência, medo, vantagem excessiva, pedido de sigilo e solicitação de código',
        'Sei que contatos recebidos devem ser confirmados por canais oficiais independentes',
        'Sei que não devo compartilhar senhas, códigos de autenticação ou dados bancários por telefone ou mensagem',
        'Compreendi que preservar mensagens, perfis, números, links e comprovantes pode ajudar em eventual comunicação ou apuração',
        'Entendi a tríade do curso: identificar o risco, prevenir com método e reagir com segurança',
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
        'Analise a seguinte situação: uma pessoa recebeu ligação de suposta central bancária, foi orientada a instalar um aplicativo de segurança, recebeu um link por mensagem, depois encontrou uma campanha pública alertando sobre golpes semelhantes e percebeu que havia informado parcialmente seus dados. Identifique: 1) quais sinais indicavam golpe; 2) qual papel pode caber à PF, ao MJSP, à FEBRABAN e ao próprio cidadão; 3) quais evidências devem ser preservadas; 4) qual deve ser a primeira providência prática da vítima.',
      reflection:
        'A situação apresenta sinais de engenharia social: falsa identidade institucional, urgência, instalação de aplicativo, link externo e solicitação de dados. A PF pode atuar na investigação dentro de sua atribuição; o MJSP atua na articulação estratégica e em políticas públicas; a FEBRABAN e o setor bancário contribuem com prevenção setorial, comunicação antifraude e boas práticas; o cidadão deve interromper contato, não compartilhar novos dados, procurar canais oficiais, preservar evidências e registrar o fato pelo canal adequado.',
    },
  ],

  questionBank: questionBank.m1,
  quizSize: 10,
  quiz: questionBank.m1.slice(0, 10),
}