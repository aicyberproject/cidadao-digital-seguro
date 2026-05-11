import { Lock } from 'lucide-react'
import { officialLinks } from '../officialLinks'
import { questionBank } from '../questionBank'

export const module2 = {
  id: 'm2',
  title: 'Módulo 2 — Pilares da Higiene Digital',
  shortTitle: 'Pilares da Higiene Digital',
  icon: Lock,
  theme: 'Autenticação forte, senhas únicas, backup, privacidade, proteção de dados, permissões e rotina preventiva.',
  goal:
    'Transformar segurança digital em rotina prática, capacitando o participante a reduzir riscos antes do incidente por meio de autenticação forte, gestão segura de senhas, backups confiáveis, minimização de dados e controle de permissões.',

  content: [
    {
      type: 'text',
      title: 'Abertura do módulo',
      body: [
        'Muitos incidentes digitais começam antes do clique em um link falso. Eles se tornam mais prováveis quando há senha repetida, ausência de verificação em duas etapas, e-mail desprotegido, backup inexistente, permissões excessivas e exposição desnecessária de dados pessoais.',
        'Higiene digital é o conjunto de hábitos preventivos que reduz riscos no uso cotidiano de contas, dispositivos, aplicativos, redes, bancos, comércio eletrônico e serviços públicos digitais.',
        'Neste módulo, o participante aprenderá a transformar segurança digital em rotina: proteger contas críticas, reduzir a superfície de ataque, limitar a exposição de dados e manter capacidade de recuperação caso algo dê errado.',
      ],
    },
    {
      type: 'scenario',
      title: 'Pergunta mobilizadora',
      prompt:
        'Uma pessoa usa a mesma senha no e-mail, na loja online e em uma rede social. Ela não usa verificação em duas etapas, não tem backup atualizado e publica detalhes da rotina familiar. O problema começa apenas quando ela clica em um link falso, ou o risco já estava sendo construído antes?',
    },
    {
      type: 'text',
      title: 'Higiene digital como rotina preventiva',
      body: [
        'A higiene digital deve ser entendida como rotina, não como medida improvisada após um incidente. Ela envolve decisões repetidas: criar senhas únicas, ativar autenticação forte, atualizar sistemas, revisar permissões, limitar dados compartilhados e manter cópias de segurança.',
        'Essa rotina não elimina todos os riscos, mas dificulta a ação de criminosos, reduz oportunidades de abuso e melhora a capacidade de reação. Em segurança digital, pequenas fragilidades acumuladas podem formar um grande risco.',
        'O objetivo não é culpar a vítima, mas ampliar sua capacidade de decisão segura antes, durante e depois de uma tentativa de fraude.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 1 — Senhas fortes, únicas e gerenciadas',
      body: [
        'Senha forte é uma senha longa, difícil de adivinhar e não baseada em dados pessoais, datas, nomes de familiares, sequências de teclado ou informações publicadas em redes sociais.',
        'Senha única significa que cada serviço deve ter uma senha diferente. Essa regra é essencial porque vazamentos de dados são comuns. Se uma senha reutilizada vaza em um serviço menos protegido, criminosos podem testá-la em e-mail, redes sociais, bancos e lojas online.',
        'Gerenciadores de senhas ajudam a criar e guardar senhas fortes e diferentes sem depender apenas da memória. A conta principal do gerenciador, porém, deve ser especialmente protegida, com senha robusta e autenticação forte.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 2 — Verificação em duas etapas, MFA e passkeys',
      body: [
        'A verificação em duas etapas adiciona uma camada de proteção ao login. Mesmo que a senha seja descoberta, o criminoso ainda precisará de outro fator para acessar a conta.',
        'Quando possível, prefira aplicativos autenticadores, chaves físicas de segurança ou passkeys. O SMS é melhor do que não usar segunda etapa, mas pode ser mais vulnerável em casos de troca indevida de chip, interceptação ou engenharia social.',
        'Passkeys reduzem a dependência de senhas e podem aumentar a resistência a phishing, quando disponíveis e configuradas corretamente. Ainda assim, continuam exigindo proteção do dispositivo, cuidado com recuperação de conta e atenção a acessos indevidos.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 3 — Proteção da conta de e-mail',
      body: [
        'A conta de e-mail deve ser tratada como conta-mestra. Em muitos serviços, quem controla o e-mail consegue redefinir senhas, receber alertas, alterar dados de recuperação e assumir outras contas.',
        'Por isso, o e-mail principal deve ter senha única, verificação em duas etapas, dados de recuperação atualizados e alertas de login ativados quando disponíveis.',
        'Se houver suspeita de acesso indevido, a reação deve ser rápida: encerrar sessões desconhecidas, trocar a senha, revisar métodos de recuperação, verificar regras de encaminhamento e examinar atividades recentes.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 4 — Backups e capacidade de recuperação',
      body: [
        'Backup é uma medida de continuidade. Ele permite recuperar dados em caso de furto, falha física, exclusão acidental, atualização malsucedida, perda do dispositivo, malware ou ransomware.',
        'Não basta ter backup: é preciso que ele seja atualizado, acessível ao usuário legítimo e testável. Backup nunca restaurado é apenas uma promessa de recuperação.',
        'Uma boa rotina combina cópias automáticas, revisão periódica e, quando possível, mais de uma forma de armazenamento, como nuvem confiável, dispositivo externo e cópia protegida contra acesso indevido.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 5 — Backup seguro contra ransomware e perda total',
      body: [
        'Ransomware pode cifrar arquivos e impedir o acesso a dados importantes. Se o único backup estiver sempre conectado ao computador ou sincronizado sem proteção, ele também pode ser afetado.',
        'A resiliência aumenta quando há mais de uma cópia, em locais diferentes, e ao menos uma delas não fica permanentemente acessível ao dispositivo principal.',
        'Também é importante proteger a conta de nuvem que guarda backups. Se o criminoso invadir a conta, poderá apagar, alterar ou sequestrar cópias de segurança.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 6 — Privacidade e minimização de dados',
      body: [
        'Proteção de dados não é apenas uma obrigação de empresas e órgãos públicos. O cidadão também pode reduzir riscos fornecendo menos dados, evitando exposição desnecessária e revisando onde suas informações aparecem.',
        'Minimização significa informar apenas o necessário para a finalidade do serviço. Campos opcionais, cadastros excessivos, programas de desconto, testes online e aplicativos gratuitos podem coletar mais informações do que o usuário percebe.',
        'Quanto mais dados pessoais estão disponíveis, maior o material que pode ser usado em golpes personalizados, recuperação indevida de contas, engenharia social e fraudes financeiras.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 7 — Permissões, cookies e rastreamento',
      body: [
        'Aplicativos e sites podem solicitar acesso a localização, contatos, câmera, microfone, fotos, arquivos, calendário e identificadores do dispositivo. Nem toda permissão é necessária para a finalidade do serviço.',
        'A revisão periódica de permissões reduz a coleta excessiva e limita danos se um aplicativo for malicioso, comprometido ou abusivo.',
        'Em sites, a gestão de cookies e rastreamento também importa. Sempre que possível, revise preferências e recuse o que não for necessário, especialmente quando o serviço oferece escolhas claras.',
      ],
    },
    {
      type: 'text',
      title: 'Pilar 8 — Atualizações e superfície de ataque',
      body: [
        'Sistemas e aplicativos possuem falhas que podem ser exploradas por criminosos. Atualizações corrigem vulnerabilidades, melhoram recursos de segurança e reduzem a superfície de ataque.',
        'A higiene digital inclui manter atualizados sistema operacional, navegador, aplicativos, antivírus, dispositivos móveis, roteadores, relógios inteligentes e demais equipamentos conectados.',
        'Dispositivos antigos, aplicativos abandonados e programas sem suporte devem ser reavaliados, pois podem permanecer vulneráveis mesmo quando o usuário adota outros cuidados.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 1 — Senha repetida e e-mail invadido',
      body: [
        'Uma loja online sofre vazamento de dados. A senha usada ali é a mesma do e-mail pessoal. O criminoso testa a senha vazada no e-mail, acessa a conta e passa a redefinir senhas de outros serviços.',
        'O problema não começou no golpe final. Ele começou na senha reutilizada, na ausência de segunda etapa e na falta de monitoramento de acessos suspeitos.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 2 — Ransomware sem backup confiável',
      body: [
        'Um usuário abre arquivo malicioso e perde acesso a documentos pessoais. O único backup era uma pasta sincronizada automaticamente, também afetada pela alteração dos arquivos.',
        'Um plano de backup mais resiliente incluiria cópia em local diferente, proteção da conta de nuvem, versões anteriores quando disponíveis e teste periódico de restauração.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 3 — Dados demais, golpe mais convincente',
      body: [
        'O criminoso consulta redes sociais, descobre cidade, rotina, escola dos filhos, banco usado e recentes compras online. Com essas informações, cria uma abordagem personalizada e mais convincente.',
        'A exposição isolada de um dado pode parecer inofensiva. O risco aumenta quando vários fragmentos são combinados para construir uma narrativa de confiança.',
      ],
    },
    {
      type: 'video',
      title: 'Videoaula do módulo',
      description:
        'Explique os pilares da higiene digital: senhas únicas, 2FA/MFA, proteção do e-mail, backup resiliente, privacidade, minimização de dados, permissões e atualizações.',
      duration: '10 min',
    },
    {
      type: 'tip',
      title: 'Dica de Especialista',
      text:
        'Configure antes de precisar. Quem ativa autenticação forte, organiza senhas, testa backup e reduz exposição de dados antes do incidente reage melhor e sofre menos danos.',
    },
    {
      type: 'scam',
      title: 'Momento É Golpe!',
      text:
        'Uma mensagem pede revalidação urgente de conta. O clique foi o gatilho, mas o risco já era maior porque a senha era repetida, o e-mail não tinha 2FA e havia muitos dados pessoais expostos.',
    },
    {
      type: 'checklist',
      title: 'Checklist de revisão',
      items: [
        'Tenho senha única nas contas mais importantes',
        'Uso gerenciador de senhas ou método seguro para guardar senhas fortes',
        'Ativei verificação em duas etapas no e-mail principal',
        'Ativei verificação em duas etapas em bancos, redes sociais e nuvem',
        'Revisei dados de recuperação das contas críticas',
        'Tenho backup automático dos dados importantes',
        'Já testei ao menos uma restauração de backup',
        'Tenho cópia de segurança em mais de um local quando possível',
        'Revisei permissões de aplicativos no celular',
        'Reduzi dados opcionais em cadastros e exposição em redes sociais',
        'Mantive sistema, navegador e aplicativos atualizados',
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
        'Monte um plano pessoal de higiene digital para as próximas 24 horas. O plano deve incluir: 1) uma conta crítica para ativar 2FA; 2) uma senha repetida a ser substituída; 3) uma medida de backup a configurar ou testar; 4) uma revisão de permissões ou privacidade; 5) um dado pessoal que pode deixar de ser exposto.',
      reflection:
        'Um plano adequado pode incluir: ativar 2FA no e-mail principal, trocar senha repetida em loja online, revisar dados de recuperação, configurar backup automático em nuvem confiável, testar restauração de um arquivo, remover permissões desnecessárias de aplicativos e reduzir informações públicas em redes sociais.',
    },
  ],

  questionBank: questionBank.m2,
  quizSize: 10,
  quiz: questionBank.m2.slice(0, 10),
}