import { FileCheck } from 'lucide-react'
import { questionBank } from '../questionBank'

const module6 = {
  id: 'm6',
  title: 'Resposta a Incidentes e Denúncia',
  shortTitle: 'Resposta a incidentes',
  subtitle:
    'Primeiras medidas após golpe, fraude, vazamento, furto de dispositivo ou comprometimento de conta: contenção, preservação de evidências, canais oficiais e registro adequado.',
  icon: FileCheck,
  duration: '45 min',
  level: 'Intermediário',
  summary:
    'Neste módulo, você aprenderá a reagir de forma ordenada diante de incidentes digitais, reduzindo danos, protegendo contas e dispositivos, preservando evidências e procurando os canais corretos de atendimento, denúncia e registro.',
  objectives: [
    'Identificar as primeiras medidas de contenção após suspeita de golpe, fraude ou comprometimento digital.',
    'Diferenciar reação segura, preservação de evidências e condutas que podem agravar o dano.',
    'Orientar vítimas a acionar banco, plataforma, operadora, provedor e autoridade competente pelos canais oficiais.',
    'Preservar evidências digitais básicas, como prints, links, perfis, números, e-mails, comprovantes, protocolos e registros de data e hora.',
    'Aplicar um plano mínimo de resposta a incidentes em casos de fraude bancária, furto de celular, vazamento de dados, phishing e invasão de conta.',
  ],
  lessons: [
    {
      id: 'm6-l1',
      title: 'Incidente digital: o que fazer primeiro?',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Um incidente digital é qualquer situação que coloque em risco conta, dispositivo, dado pessoal, transação, identidade digital ou patrimônio. Pode envolver golpe financeiro, furto de celular, invasão de conta, vazamento de dados, malware, ransomware, falso suporte, perfil falso ou compra fraudulenta.',
        },
        {
          type: 'paragraph',
          text:
            'A primeira reação costuma definir o tamanho do prejuízo. A vítima deve interromper o contato com o possível golpista, evitar novas transferências, buscar canais oficiais, proteger contas e preservar registros antes que mensagens, páginas, perfis ou comprovantes desapareçam.',
        },
        {
          type: 'list',
          title: 'Regra dos primeiros minutos',
          items: [
            'Pare a interação suspeita imediatamente.',
            'Não envie mais dinheiro, documentos, senhas, códigos ou comprovantes.',
            'Não instale aplicativos indicados por terceiros.',
            'Procure o canal oficial da instituição envolvida.',
            'Preserve as evidências antes de apagar, bloquear ou sair da conversa.',
            'Troque senhas a partir de dispositivo confiável, quando houver suspeita de exposição.',
          ],
        },
        {
          type: 'callout',
          title: 'Prioridade',
          text:
            'A ordem segura é conter o dano, proteger acessos, preservar evidências e procurar os canais oficiais. Agir com pressa dentro do ambiente controlado pelo criminoso aumenta o risco.',
        },
      ],
    },
    {
      id: 'm6-l2',
      title: 'Contenção: reduza o dano antes que ele aumente',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Contenção é o conjunto de medidas imediatas para impedir que o incidente continue produzindo danos. Em golpes financeiros, isso pode significar bloquear cartão, contestar transação, avisar o banco e trocar senhas. Em furto de celular, pode significar bloquear aparelho, chip, contas e aplicativos sensíveis.',
        },
        {
          type: 'list',
          title: 'Medidas de contenção mais comuns',
          items: [
            'Bloquear ou substituir cartões expostos.',
            'Contestar transações desconhecidas pelos canais oficiais.',
            'Alterar senhas de e-mail, banco, redes sociais e aplicativos sensíveis.',
            'Encerrar sessões abertas em dispositivos desconhecidos.',
            'Ativar ou revisar verificação em duas etapas.',
            'Bloquear chip SIM junto à operadora em caso de furto ou perda.',
            'Bloquear aparelho pelo IMEI quando aplicável.',
            'Revogar permissões de aplicativos suspeitos.',
            'Desinstalar aplicativos não reconhecidos ou instalados por orientação de suposto atendente.',
          ],
        },
        {
          type: 'callout',
          title: 'Cuidado com a fonte da orientação',
          text:
            'A contenção deve ser feita pelos canais oficiais. Não siga instruções recebidas na própria ligação, mensagem ou conversa suspeita.',
        },
      ],
    },
    {
      id: 'm6-l3',
      title: 'Preservação de evidências digitais',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Evidências digitais são registros que ajudam a demonstrar o que aconteceu, quando aconteceu, quais canais foram usados e quais dados, valores ou contas foram envolvidos. Elas são úteis para atendimento pela instituição financeira, contestação, registro de ocorrência e eventual investigação.',
        },
        {
          type: 'list',
          title: 'O que preservar',
          items: [
            'Prints de conversas, perfis, anúncios, sites, e-mails e mensagens.',
            'Links completos, endereços de sites e nomes de perfis.',
            'Números de telefone, e-mails, chaves Pix, contas bancárias e identificadores usados no golpe.',
            'Comprovantes de pagamento, transferência, boleto, Pix, compra ou tentativa de transação.',
            'Protocolos de atendimento com banco, plataforma, operadora ou provedor.',
            'Datas, horários e sequência dos acontecimentos.',
            'Arquivos recebidos, quando puderem ser guardados com segurança sem executá-los.',
          ],
        },
        {
          type: 'list',
          title: 'O que evitar',
          items: [
            'Apagar conversas antes de registrar evidências.',
            'Confrontar o suspeito ou avisar que fará denúncia antes de preservar registros.',
            'Publicar dados pessoais, chaves Pix, documentos ou prints com informações sensíveis em grupos ou redes sociais.',
            'Encaminhar arquivos suspeitos para outras pessoas.',
            'Alterar ou editar prints de forma que comprometa sua confiabilidade.',
          ],
        },
        {
          type: 'callout',
          title: 'Preserve antes de bloquear',
          text:
            'Bloquear o contato pode ser necessário, mas antes salve o que for relevante: número, perfil, conversa, comprovantes, links, datas e horários.',
        },
      ],
    },
    {
      id: 'm6-l4',
      title: 'Canais oficiais: quem acionar e em qual ordem',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'A resposta adequada depende do tipo de incidente. Em fraude bancária, o banco deve ser acionado imediatamente. Em compra online, a plataforma ou loja oficial deve ser procurada. Em furto de celular, também entram a operadora e os mecanismos de localização ou bloqueio do sistema. Em vazamento de dados, a instituição responsável pode informar medidas de mitigação.',
        },
        {
          type: 'list',
          title: 'Exemplos de acionamento',
          items: [
            'Banco ou instituição de pagamento: contestação, bloqueio, protocolo e orientação sobre transação suspeita.',
            'Marketplace ou loja: disputa, cancelamento, reclamação e preservação de dados da compra.',
            'Operadora de telefonia: bloqueio de chip SIM e orientação sobre linha comprometida.',
            'Fabricante ou sistema do aparelho: localização, bloqueio remoto e proteção de conta vinculada.',
            'Provedor de e-mail ou rede social: recuperação de conta, encerramento de sessões e denúncia de perfil falso.',
            'Autoridade policial: registro de ocorrência quando houver crime, prejuízo, ameaça, extorsão, invasão ou fraude consumada.',
          ],
        },
        {
          type: 'callout',
          title: 'Canal oficial é independente',
          text:
            'Não use o telefone, link ou perfil informado pelo suposto atendente. Consulte o canal oficial por aplicativo já instalado, site digitado manualmente, cartão físico, contrato ou fonte institucional confiável.',
        },
      ],
    },
    {
      id: 'm6-l5',
      title: 'Furto de celular: resposta rápida',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'O celular concentra mensagens, e-mails, bancos, redes sociais, fotos, documentos, autenticação em duas etapas e aplicativos de compra. Por isso, furto ou perda do aparelho exige resposta rápida para proteger a vida digital e financeira.',
        },
        {
          type: 'list',
          title: 'Ordem prática de resposta',
          items: [
            'Tente localizar ou bloquear o aparelho pelos recursos oficiais do sistema, se seguro e viável.',
            'Bloqueie o chip SIM com a operadora.',
            'Altere senhas de contas sensíveis a partir de dispositivo confiável.',
            'Encerre sessões abertas em e-mail, redes sociais, aplicativos financeiros e serviços em nuvem.',
            'Avise o banco e monitore movimentações.',
            'Bloqueie cartões, se houver risco de uso indevido.',
            'Registre ocorrência e informe o IMEI quando necessário.',
          ],
        },
        {
          type: 'callout',
          title: 'E-mail é chave mestra',
          text:
            'Proteja primeiro o e-mail principal. Ele costuma ser usado para recuperar senhas de várias outras contas.',
        },
      ],
    },
    {
      id: 'm6-l6',
      title: 'Vazamento de dados e invasão de conta',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Vazamentos de dados e invasões de conta podem gerar golpes posteriores. O criminoso pode usar dados pessoais para se passar pela vítima, tentar recuperar senhas, contratar serviços, aplicar golpes em contatos ou realizar transações fraudulentas.',
        },
        {
          type: 'list',
          title: 'Se houver senha exposta ou conta invadida',
          items: [
            'Troque a senha da conta afetada e de todos os serviços onde a mesma senha foi usada.',
            'Ative verificação em duas etapas.',
            'Revise dispositivos conectados e encerre sessões desconhecidas.',
            'Verifique regras de encaminhamento em e-mail e configurações de recuperação de conta.',
            'Avise contatos se a conta foi usada para enviar golpes.',
            'Monitore extratos, faturas e comunicações suspeitas.',
          ],
        },
        {
          type: 'callout',
          title: 'Senha repetida multiplica o dano',
          text:
            'Quando uma senha vazada é usada em vários serviços, o incidente deixa de ser isolado e pode atingir diversas contas.',
        },
      ],
    },
    {
      id: 'm6-l7',
      title: 'Registro de ocorrência e comunicação responsável',
      estimatedTime: '5 min',
      content: [
        {
          type: 'paragraph',
          text:
            'O registro de ocorrência deve reunir informações objetivas: o que aconteceu, quando ocorreu, quais canais foram usados, quais valores ou dados foram envolvidos, quais evidências foram preservadas e quais providências já foram adotadas junto a bancos, plataformas ou operadoras.',
        },
        {
          type: 'list',
          title: 'Informações úteis para registro',
          items: [
            'Identificação da vítima e meio de contato.',
            'Resumo cronológico do ocorrido.',
            'Valor, data, horário e destinatário de transações, se houver.',
            'Chaves Pix, contas, números, e-mails, links, perfis e anúncios envolvidos.',
            'Comprovantes e protocolos de atendimento.',
            'Prints e arquivos preservados.',
            'Medidas já adotadas para contenção.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Também é importante comunicar de forma responsável. Alertar familiares e contatos pode ser necessário, mas sem expor dados pessoais, documentos, informações bancárias ou prints sensíveis em redes sociais ou grupos públicos.',
        },
      ],
    },
  ],
  checklist: [
    'Interrompi imediatamente a interação suspeita.',
    'Não enviei novas senhas, códigos, documentos, valores ou comprovantes.',
    'Acionei banco, plataforma, operadora ou provedor por canal oficial independente.',
    'Bloqueei cartões, contas, chip ou aparelho quando necessário.',
    'Troquei senhas a partir de dispositivo confiável.',
    'Ativei ou revisei a verificação em duas etapas.',
    'Preservei prints, links, números, e-mails, perfis, comprovantes e protocolos.',
    'Registrei datas, horários e sequência dos acontecimentos.',
    'Evitei apagar conversas antes de preservar evidências.',
    'Evitei divulgar dados sensíveis em grupos ou redes sociais.',
    'Registrei ocorrência quando houve crime, prejuízo, ameaça, fraude ou invasão.',
  ],
  practicalActivity: {
    title: 'Plano de resposta a incidente digital',
    description:
      'Você receberá um caso simulado envolvendo furto de celular, tentativa de acesso a conta bancária e mensagens enviadas a contatos da vítima. Organize a resposta em quatro etapas: contenção, preservação de evidências, acionamento de canais oficiais e registro.',
    steps: [
      'Liste as três primeiras medidas de contenção.',
      'Indique quais evidências devem ser preservadas antes de bloquear contatos ou apagar mensagens.',
      'Aponte quais instituições devem ser acionadas e por quais canais.',
      'Explique quais informações devem constar no registro de ocorrência.',
      'Indique duas condutas que a vítima deve evitar para não aumentar o dano.',
    ],
  },
  video: {
    title: 'Videoaula — Resposta a incidentes e denúncia',
    duration: 'Em preparação',
    script:
      'Videoaula em preparação. Na versão final, este espaço receberá a videoaula oficial sobre primeiras medidas após golpe, fraude, furto de celular, vazamento de dados, invasão de conta, preservação de evidências, canais oficiais e registro de ocorrência.',
  },
  resources: [
    {
      label: 'CERT.br — Fascículo Furto de Celular',
      url: 'https://cartilha.cert.br/fasciculos/furto-de-celular/fasciculo-furto-celular.pdf',
    },
    {
      label: 'CERT.br — Fascículo Vazamento de Dados',
      url: 'https://cartilha.cert.br/fasciculos/vazamento-de-dados/fasciculo-vazamento-de-dados.pdf',
    },
    {
      label: 'CERT.br — Fascículo Proteção de Dados',
      url: 'https://cartilha.cert.br/fasciculos/protecao-de-dados/fasciculo-protecao-de-dados.pdf',
    },
    {
      label: 'CERT.br — Fascículo Backup',
      url: 'https://cartilha.cert.br/fasciculos/backup/fasciculo-backup.pdf',
    },
    {
      label: 'Campanha #DigaNãoAosGolpes — FEBRABAN',
      url: 'https://antifraudes.febraban.org.br/',
    },
  ],
  questionBank: questionBank.m6,
  quizSize: 10,
  quiz: questionBank.m6.slice(0, 10),
}

export { module6 }
