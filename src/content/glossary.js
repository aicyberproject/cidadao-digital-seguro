export const glossaryCategories = [
  'Contas e acesso',
  'Golpes e ameaças',
  'Transações seguras',
  'Dispositivos e redes',
  'Resposta a incidentes',
]

export const glossaryEntries = [
  {
    term: 'Autenticação',
    category: 'Contas e acesso',
    module: 'Módulo 2',
    definition:
      'Processo usado para confirmar que uma pessoa é realmente quem diz ser ao acessar uma conta, aplicativo ou serviço.',
    guidance:
      'Proteja contas importantes com senha forte e, sempre que possível, verificação em duas etapas.',
  },
  {
    term: 'Senha forte',
    category: 'Contas e acesso',
    module: 'Módulo 2',
    definition:
      'Senha longa, única e difícil de adivinhar, que não usa datas, nomes, sequências simples ou informações pessoais.',
    guidance:
      'Use senhas diferentes para cada serviço e considere um gerenciador de senhas confiável.',
  },
  {
    term: 'Verificação em duas etapas',
    category: 'Contas e acesso',
    module: 'Módulo 2',
    definition:
      'Camada adicional de proteção que exige uma segunda confirmação além da senha, como aplicativo autenticador, chave de segurança ou código.',
    guidance:
      'Ative primeiro no e-mail principal, bancos, redes sociais e serviços de nuvem.',
  },
  {
    term: 'Canal oficial',
    category: 'Contas e acesso',
    module: 'Módulo 1',
    definition:
      'Meio de atendimento ou comunicação divulgado pela própria instituição, como site oficial, aplicativo legítimo, telefone do cartão ou portal institucional.',
    guidance:
      'Não use telefone, link ou perfil informado por mensagem suspeita; confirme por fonte independente.',
  },
  {
    term: 'Golpe digital',
    category: 'Golpes e ameaças',
    module: 'Módulo 1',
    definition:
      'Situação em que criminosos usam meios digitais para enganar a vítima e levá-la a pagar, clicar, instalar, informar dados ou autorizar uma ação prejudicial.',
    guidance:
      'Desconfie de urgência, ameaça, vantagem exagerada, pedido de sigilo ou solicitação de senha e código.',
  },
  {
    term: 'Engenharia social',
    category: 'Golpes e ameaças',
    module: 'Módulo 1',
    definition:
      'Uso de manipulação, pressão emocional ou falsa confiança para induzir a vítima a tomar uma decisão insegura.',
    guidance:
      'Pause antes de agir e confirme a situação por outro canal quando houver pressão ou urgência.',
  },
  {
    term: 'Phishing',
    category: 'Golpes e ameaças',
    module: 'Módulo 5',
    definition:
      'Tentativa de obter dados, senhas, códigos ou pagamentos por mensagens, e-mails, sites, ligações ou links falsos.',
    guidance:
      'Não clique em links inesperados; acesse o serviço digitando o endereço oficial ou usando o aplicativo legítimo.',
  },
  {
    term: 'Falsa central',
    category: 'Golpes e ameaças',
    module: 'Módulo 4',
    definition:
      'Golpe em que o criminoso se passa por central de atendimento, geralmente de banco, loja ou plataforma, para pedir dados, códigos, instalação de aplicativo ou transferência.',
    guidance:
      'Encerre o contato e procure a instituição por canal oficial independente.',
  },
  {
    term: 'Malware',
    category: 'Golpes e ameaças',
    module: 'Módulo 5',
    definition:
      'Programa ou arquivo malicioso criado para comprometer dispositivos, capturar informações, espionar atividades ou causar danos.',
    guidance:
      'Instale aplicativos apenas por fontes oficiais e mantenha sistema, navegador e antimalware atualizados.',
  },
  {
    term: 'Ransomware',
    category: 'Golpes e ameaças',
    module: 'Módulo 5',
    definition:
      'Tipo de malware que bloqueia ou cifra arquivos e exige pagamento para uma suposta recuperação.',
    guidance:
      'Mantenha backups confiáveis e evite abrir anexos ou links inesperados.',
  },
  {
    term: 'Vazamento de dados',
    category: 'Golpes e ameaças',
    module: 'Módulo 5',
    definition:
      'Exposição indevida de dados pessoais, senhas, contatos, documentos ou informações de contas.',
    guidance:
      'Troque senhas expostas, ative verificação em duas etapas e monitore mensagens suspeitas posteriores.',
  },
  {
    term: 'Furto de identidade',
    category: 'Golpes e ameaças',
    module: 'Módulo 5',
    definition:
      'Uso indevido de dados ou contas de uma pessoa para se passar por ela, abrir cadastros, aplicar golpes ou realizar transações.',
    guidance:
      'Reduza exposição de dados, proteja o e-mail principal e preserve registros se houver suspeita.',
  },
  {
    term: 'Pix',
    category: 'Transações seguras',
    module: 'Módulo 4',
    definition:
      'Meio de pagamento instantâneo usado para transferências e compras. Por ser rápido, exige conferência cuidadosa antes da confirmação.',
    guidance:
      'Confira nome do recebedor, CPF ou CNPJ, valor e contexto da cobrança antes de confirmar.',
  },
  {
    term: 'Boleto falso',
    category: 'Transações seguras',
    module: 'Módulo 4',
    definition:
      'Boleto criado ou alterado para direcionar o pagamento a criminosos em vez do credor verdadeiro.',
    guidance:
      'Confira beneficiário, CNPJ, banco emissor, valor e origem do boleto no canal oficial.',
  },
  {
    term: 'QR Code',
    category: 'Transações seguras',
    module: 'Módulo 4',
    definition:
      'Código visual que pode abrir links ou iniciar pagamentos. Pode ser legítimo, mas também pode ser substituído ou enviado em golpes.',
    guidance:
      'Antes de pagar, confira na tela do aplicativo quem receberá o valor e se a cobrança faz sentido.',
  },
  {
    term: 'Backup',
    category: 'Dispositivos e redes',
    module: 'Módulo 2',
    definition:
      'Cópia de segurança de arquivos e dados importantes para permitir recuperação em caso de perda, furto, falha ou ataque.',
    guidance:
      'Tenha cópias atualizadas e teste a restauração periodicamente.',
  },
  {
    term: 'Firewall',
    category: 'Dispositivos e redes',
    module: 'Módulo 3',
    definition:
      'Recurso de proteção que ajuda a controlar conexões de entrada e saída do dispositivo ou da rede.',
    guidance:
      'Mantenha o firewall ativo no computador e siga as orientações da instituição no trabalho remoto.',
  },
  {
    term: 'Antivírus/antimalware',
    category: 'Dispositivos e redes',
    module: 'Módulo 3',
    definition:
      'Ferramenta que ajuda a identificar, bloquear ou remover programas maliciosos.',
    guidance:
      'Use ferramenta confiável, mantenha-a atualizada e não ignore alertas de segurança.',
  },
  {
    term: 'Rede Wi-Fi segura',
    category: 'Dispositivos e redes',
    module: 'Módulo 3',
    definition:
      'Rede sem fio protegida por senha forte, criptografia atual e roteador configurado de forma adequada.',
    guidance:
      'Troque senhas padrão do roteador e evite transações sensíveis em Wi-Fi público.',
  },
  {
    term: 'Atualização de segurança',
    category: 'Dispositivos e redes',
    module: 'Módulo 3',
    definition:
      'Correção disponibilizada pelo fabricante para reduzir falhas e melhorar a proteção de sistemas, aplicativos ou equipamentos.',
    guidance:
      'Ative atualizações automáticas sempre que possível.',
  },
  {
    term: 'Evidência digital',
    category: 'Resposta a incidentes',
    module: 'Módulo 6',
    definition:
      'Registro que ajuda a demonstrar o que aconteceu em um incidente, como prints, links, perfis, mensagens, e-mails, comprovantes e protocolos.',
    guidance:
      'Preserve evidências antes de apagar conversas, bloquear perfis ou encerrar contas.',
  },
  {
    term: 'Denúncia',
    category: 'Resposta a incidentes',
    module: 'Módulo 6',
    definition:
      'Comunicação de uma situação suspeita ou criminosa a uma instituição, plataforma, banco, operadora ou autoridade competente.',
    guidance:
      'Use canais oficiais e reúna informações objetivas, como datas, valores, perfis, links e protocolos.',
  },
  {
    term: 'Contenção de danos',
    category: 'Resposta a incidentes',
    module: 'Módulo 6',
    definition:
      'Conjunto de medidas imediatas para impedir que um incidente continue causando prejuízo.',
    guidance:
      'Bloqueie cartões, conteste transações, troque senhas em dispositivo confiável e acione a instituição envolvida.',
  },
  {
    term: 'Registro de ocorrência',
    category: 'Resposta a incidentes',
    module: 'Módulo 6',
    definition:
      'Registro formal de um fato junto ao canal policial competente, com descrição do ocorrido e evidências disponíveis.',
    guidance:
      'Organize um resumo cronológico e inclua comprovantes, protocolos, contatos e identificadores envolvidos.',
  },
]
