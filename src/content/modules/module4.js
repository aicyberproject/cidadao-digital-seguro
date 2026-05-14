import { CreditCard } from 'lucide-react'
import { questionBank } from '../questionBank'

const module4 = {
  id: 'm4',
  title: 'Transações e Consumo Seguro',
  shortTitle: 'Transações seguras',  
  subtitle: 'Banco via internet, Pix, compras online, marketplaces e prevenção de fraudes financeiras digitais.',
  icon: CreditCard,  
  duration: '45 min',
  level: 'Intermediário',
  summary:
    'Neste módulo, você aprenderá a realizar transações financeiras e compras pela internet com mais segurança, reconhecendo sinais de golpe, verificando canais oficiais, protegendo dados de pagamento e reagindo corretamente diante de movimentações suspeitas.',
  objectives: [
    'Reconhecer os principais riscos em transações bancárias, Pix, boletos, QR Codes e pagamentos digitais.',
    'Identificar sinais de falsas compras, falsos comprovantes, anúncios fraudulentos e golpes em marketplaces.',
    'Aplicar boas práticas de segurança em aplicativos financeiros, comércio eletrônico e redes sociais comerciais.',
    'Diferenciar canais oficiais de comunicação de contatos fraudulentos por telefone, mensagem, anúncio ou perfil falso.',
    'Orientar a primeira reação segura diante de transação suspeita, movimentação indevida ou golpe consumado.',
  ],
  lessons: [
    {
      id: 'm4-l1',
      title: 'Transações digitais: praticidade com risco calculado',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'A internet tornou pagamentos, compras e operações bancárias mais rápidos e acessíveis. A mesma praticidade, porém, também é explorada por fraudadores, que tentam induzir a vítima a clicar, pagar, transferir, instalar aplicativos ou informar dados sensíveis.',
        },
        {
          type: 'paragraph',
          text:
            'A regra central deste módulo é simples: transação segura exige controle do canal, conferência dos dados e recusa a decisões sob pressão. O cidadão deve saber de onde veio a solicitação, para quem está pagando, qual é o ambiente usado e se a operação faz sentido.',
        },
        {
          type: 'list',
          title: 'Antes de qualquer transação, pergunte:',
          items: [
            'Estou usando o aplicativo ou site oficial?',
            'Digitei o endereço ou cliquei em link recebido?',
            'O destinatário do pagamento corresponde ao fornecedor real?',
            'Há urgência, ameaça, promessa de vantagem ou pressão para agir?',
            'Consigo confirmar a informação por outro canal confiável?',
          ],
        },
        {
          type: 'callout',
          title: 'Comando de segurança',
          text:
            'Não faça pagamentos ou transferências sob pressão. Pare, confira os dados, confirme pelo canal oficial e só então decida.',
        },
      ],
    },
    {
      id: 'm4-l2',
      title: 'Banco via internet e aplicativos financeiros',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Aplicativos financeiros concentram acesso a contas, cartões, empréstimos, investimentos e pagamentos. Por isso, devem ser tratados como ambientes de alta sensibilidade. A segurança não depende apenas do banco: também depende do comportamento do usuário e da proteção do dispositivo.',
        },
        {
          type: 'list',
          title: 'Boas práticas essenciais',
          items: [
            'Instale aplicativos financeiros apenas pelas lojas oficiais do sistema operacional.',
            'Confira o nome do aplicativo e o desenvolvedor antes de instalar.',
            'Use senha forte no celular e no aplicativo financeiro.',
            'Ative biometria, quando disponível, sem abandonar senhas robustas.',
            'Não salve senhas bancárias em bloco de notas, fotos, contatos, navegador, mensagens ou e-mail.',
            'Mantenha sistema operacional e aplicativos sempre atualizados.',
            'Evite acessar contas bancárias em redes Wi-Fi públicas ou dispositivos de terceiros.',
          ],
        },
        {
          type: 'callout',
          title: 'Banco não pede senha',
          text:
            'Desconfie de qualquer contato que peça senha, token, código de verificação, QR Code, instalação de aplicativo, compartilhamento de tela ou transferência para “proteger” dinheiro.',
        },
      ],
    },
    {
      id: 'm4-l3',
      title: 'Canais oficiais, falsa central e anúncios patrocinados',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Muitos golpes começam com uma aparência de legitimidade: ligação de suposta central bancária, mensagem com logotipo conhecido, perfil verificado falso, anúncio patrocinado ou página parecida com a original. O objetivo é fazer a vítima sair do caminho oficial e agir dentro do ambiente controlado pelo criminoso.',
        },
        {
          type: 'list',
          title: 'Sinais de alerta',
          items: [
            'Contato ativo informando invasão de conta, compra suspeita ou bloqueio urgente.',
            'Pedido de confirmação de senha, token ou código recebido por SMS.',
            'Orientação para instalar aplicativo, acessar link ou compartilhar tela.',
            'Pedido para transferir valores para conta segura ou conta de conferência.',
            'Anúncio patrocinado com preço muito baixo ou domínio parecido com marca conhecida.',
            'Perfil em rede social cobrando taxas, frete, desbloqueio ou cadastro fora do site oficial.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A conduta segura é encerrar o contato, não clicar no link, não retornar para o número indicado na mensagem e buscar o canal oficial por meios independentes: aplicativo já instalado, cartão físico, site digitado manualmente ou telefone oficial consultado em fonte confiável.',
        },
      ],
    },
    {
      id: 'm4-l4',
      title: 'Pix, QR Code, boletos e links de pagamento',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Pagamentos digitais exigem conferência ativa. Pix, QR Codes, boletos e links de pagamento podem ser usados em golpes quando a vítima não verifica destinatário, valor, origem do link, domínio da página ou autenticidade da cobrança.',
        },
        {
          type: 'list',
          title: 'Antes de pagar por Pix ou QR Code',
          items: [
            'Confira o nome do recebedor antes de confirmar.',
            'Verifique se CPF, CNPJ ou razão social fazem sentido com a compra.',
            'Desconfie de QR Code recebido por mensagem fora do contexto esperado.',
            'Não pague taxa inesperada enviada por SMS, e-mail ou aplicativo de mensagem.',
            'Em compras online, pague preferencialmente dentro da plataforma oficial.',
          ],
        },
        {
          type: 'list',
          title: 'Antes de pagar boleto ou link de pagamento',
          items: [
            'Confira banco emissor, beneficiário, CNPJ, valor e vencimento.',
            'Desconfie de boleto enviado após renegociação feita por canal não oficial.',
            'Evite baixar boletos por links recebidos em mensagens.',
            'Acesse o site oficial digitando o endereço no navegador.',
            'Guarde comprovantes, mensagens e telas de confirmação.',
          ],
        },
        {
          type: 'callout',
          title: 'Atenção ao falso comprovante',
          text:
            'Comprovante enviado por print não é garantia de pagamento. Confira se o valor realmente entrou na conta ou foi confirmado pela plataforma antes de entregar produto, liberar serviço ou encerrar negociação.',
        },
      ],
    },
    {
      id: 'm4-l5',
      title: 'Compras online, marketplaces e falsas vendas',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Golpistas criam páginas, perfis e anúncios falsos para simular lojas, vendedores, promoções e plataformas conhecidas. Também podem tentar retirar a negociação do marketplace para impedir o uso dos mecanismos de proteção da própria plataforma.',
        },
        {
          type: 'list',
          title: 'Como reduzir o risco em compras online',
          items: [
            'Use sites e aplicativos oficiais.',
            'Digite o endereço da loja ou acesse pelo aplicativo já instalado.',
            'Pesquise reputação do site, da loja e do vendedor.',
            'Leia avaliações de compradores anteriores.',
            'Desconfie de preço muito abaixo do mercado.',
            'Evite pagamento fora da plataforma.',
            'Não envie documentos, senhas ou dados de cartão por mensagem.',
            'Guarde anúncio, conversa, identificação do vendedor, comprovantes e dados da transação.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Em marketplaces, identifique quem é o vendedor real, verifique pontuação, histórico, avaliações, prazo de entrega, regras de troca e canal de atendimento. Se o vendedor tentar migrar a negociação para aplicativo de mensagem, boleto externo ou Pix direto, o risco aumenta significativamente.',
        },
      ],
    },
    {
      id: 'm4-l6',
      title: 'Dados de cartão, senhas e proteção de identidade financeira',
      estimatedTime: '5 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Dados de cartão, senhas, códigos de verificação e documentos pessoais podem ser usados para compras indevidas, abertura de contas, contratação de serviços e golpes contra terceiros. A proteção começa pela minimização: fornecer apenas o necessário e somente em ambiente confiável.',
        },
        {
          type: 'list',
          title: 'Proteja seus dados financeiros',
          items: [
            'Não envie foto de cartão, senha ou código de segurança por mensagem.',
            'Use cartão virtual quando disponível para compras online.',
            'Ative notificações de compras e transações.',
            'Revise extratos e faturas periodicamente.',
            'Conteste imediatamente lançamentos desconhecidos pelos canais oficiais.',
            'Bloqueie ou substitua cartão em caso de suspeita de exposição.',
            'Evite cadastrar cartão em sites pouco conhecidos ou sem reputação.',
          ],
        },
      ],
    },
    {
      id: 'm4-l7',
      title: 'Primeira reação diante de movimentação indevida',
      estimatedTime: '4 min',
      content: [
        {
          type: 'paragraph',
          text:
            'A resposta rápida reduz danos. Ao identificar compra, Pix, boleto, empréstimo, saque, cadastro ou acesso suspeito, a vítima deve agir por canais oficiais e preservar evidências antes que mensagens, anúncios, páginas e perfis desapareçam.',
        },
        {
          type: 'list',
          title: 'Fluxo mínimo de resposta',
          items: [
            'Interrompa o contato com o suposto atendente, vendedor ou intermediário.',
            'Acesse banco, loja ou plataforma apenas por canal oficial.',
            'Bloqueie cartão, conta, aplicativo ou credenciais comprometidas.',
            'Altere senhas a partir de dispositivo confiável.',
            'Conteste transações indevidas e solicite protocolo de atendimento.',
            'Preserve prints, links, números, perfis, comprovantes, e-mails e conversas.',
            'Registre ocorrência conforme orientação institucional ou policial.',
            'Monitore novas tentativas de golpe derivadas dos dados expostos.',
          ],
        },
      ],
    },
  ],
  checklist: [
    'Uso aplicativos financeiros instalados apenas pelas lojas oficiais.',
    'Não clico em links de banco, entrega, promoção ou cobrança recebidos por mensagem sem verificar.',
    'Confiro destinatário, valor e instituição antes de confirmar Pix, boleto ou QR Code.',
    'Não informo senha, token, código ou dados de cartão por telefone, mensagem ou videochamada.',
    'Não instalo aplicativo indicado por suposto atendente.',
    'Pesquiso reputação de lojas, sites e vendedores antes da compra.',
    'Mantenho negociações e pagamentos dentro da plataforma oficial.',
    'Confiro se o dinheiro realmente entrou antes de entregar produto ou serviço.',
    'Ativo notificações de compras e transações.',
    'Preservo evidências e aciono canais oficiais diante de suspeita de fraude.',
  ],
  practicalActivity: {
    title: 'Análise de transação suspeita',
    description:
      'Você receberá três situações simuladas: uma ligação de falsa central bancária, um anúncio de marketplace com preço muito baixo e um QR Code de cobrança recebido por mensagem. Para cada situação, identifique os sinais de alerta, a ação segura e as evidências que devem ser preservadas.',
    steps: [
      'Classifique o risco da situação como baixo, médio ou alto.',
      'Aponte pelo menos três sinais de alerta.',
      'Indique o canal oficial adequado para confirmação.',
      'Explique se a transação deve ou não ser realizada.',
      'Liste as evidências que devem ser guardadas em caso de tentativa ou consumação do golpe.',
    ],
  },
    video: {
    title: 'Videoaula — Transações e consumo seguro',
    duration: 'Em preparação',
    script:
      'Videoaula em preparação. Na versão final, este espaço receberá a videoaula oficial sobre banco via internet, Pix, boletos, QR Codes, compras online, marketplaces e sinais de golpes financeiros.',
  },
  resources: [
    {
      label: 'CERT.br — Fascículo Banco via Internet',
      url: 'https://cartilha.cert.br/fasciculos/banco-via-internet/fasciculo-banco-via-internet.pdf',
    },
    {
      label: 'CERT.br — Fascículo Comércio via Internet',
      url: 'https://cartilha.cert.br/fasciculos/comercio-via-internet/fasciculo-comercio-via-internet.pdf',
    },
    {
      label: 'CERT.br — Fascículo Furto de Celular',
      url: 'https://cartilha.cert.br/fasciculos/furto-de-celular/fasciculo-furto-celular.pdf',
    },
    {
      label: 'Campanha #DigaNãoAosGolpes — FEBRABAN',
      url: 'https://antifraudes.febraban.org.br/',
    },
  ],
  questionBank: questionBank.m4,
  quizSize: 10,
  quiz: questionBank.m4.slice(0, 10),
}

export { module4 }