import { AlertTriangle } from 'lucide-react'
import { questionBank } from '../questionBank'

const module5 = {
  id: 'm5',
  title: 'Catálogo de Ameaças e Golpes',
  shortTitle: 'Ameaças e golpes',
  subtitle: 'Principais ameaças digitais, golpes recorrentes, sinais de alerta e formas seguras de prevenção.',
  icon: AlertTriangle,
  duration: '50 min',
  level: 'Intermediário',
  summary:
    'Neste módulo, você conhecerá um catálogo prático de ameaças e golpes digitais, com foco em phishing, malware, ransomware, perfis falsos, golpes em redes sociais, falsas centrais, falsas vendas, boatos, deepfakes, vazamentos de dados e fraudes de identidade.',
  objectives: [
    'Reconhecer ameaças digitais recorrentes e seus principais sinais de alerta.',
    'Diferenciar golpes baseados em engenharia social de ameaças técnicas como malware e ransomware.',
    'Identificar mensagens, links, anexos, perfis, anúncios e cobranças suspeitas.',
    'Aplicar condutas preventivas adequadas para cada categoria de ameaça.',
    'Orientar terceiros com linguagem simples, direta e voltada à ação segura.',
  ],
  lessons: [
    {
      id: 'm5-l1',
      title: 'Como usar um catálogo de ameaças',
      estimatedTime: '5 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Um catálogo de ameaças ajuda o cidadão a transformar situações confusas em padrões reconhecíveis. Em vez de decorar nomes técnicos, o mais importante é identificar sinais de risco: urgência, vantagem exagerada, pedido de senha, link inesperado, anexo suspeito, perfil falso, cobrança indevida ou ameaça emocional.',
        },
        {
          type: 'paragraph',
          text:
            'Golpes e ameaças digitais mudam de aparência com frequência, mas costumam repetir a mesma lógica: chamar a atenção, ganhar confiança, provocar pressa e levar a vítima a clicar, pagar, transferir, instalar, informar ou autorizar algo.',
        },
        {
          type: 'list',
          title: 'Perguntas de triagem rápida',
          items: [
            'Quem está pedindo a ação?',
            'O canal usado é oficial e esperado?',
            'Há urgência, medo, promessa de benefício ou ameaça?',
            'A mensagem pede senha, código, token, Pix, instalação ou clique?',
            'Consigo confirmar por outro canal confiável?',
          ],
        },
        {
          type: 'callout',
          title: 'Regra prática',
          text:
            'Quando a situação exigir pressa, pagamento ou fornecimento de dados sensíveis, pare e confirme antes de agir.',
        },
      ],
    },
    {
      id: 'm5-l2',
      title: 'Phishing, smishing, vishing e mensagens maliciosas',
      estimatedTime: '8 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Phishing é a tentativa de enganar a vítima para obter dados, credenciais, códigos ou pagamentos. Pode chegar por e-mail, SMS, aplicativo de mensagem, rede social, ligação telefônica, anúncio patrocinado ou QR Code.',
        },
        {
          type: 'list',
          title: 'Variações comuns',
          items: [
            'E-mail falso de banco, loja, órgão público ou serviço de entrega.',
            'SMS com link para falsa taxa, falso bloqueio ou falsa promoção.',
            'Ligação de suposta central de atendimento solicitando senha ou token.',
            'Mensagem de conhecido com link suspeito após invasão de conta.',
            'QR Code colado em ambiente físico ou enviado por mensagem para redirecionar pagamento.',
          ],
        },
        {
          type: 'list',
          title: 'Condutas preventivas',
          items: [
            'Não clique em links inesperados.',
            'Não abra anexos suspeitos.',
            'Não informe senha, token ou código de verificação.',
            'Acesse o site digitando o endereço oficial no navegador.',
            'Confirme a solicitação por canal independente.',
          ],
        },
      ],
    },
    {
      id: 'm5-l3',
      title: 'Malware, aplicativos falsos e infostealers',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Malware é software malicioso criado para comprometer dispositivos, capturar dados, alterar funcionamento de aplicativos, controlar remotamente sistemas ou facilitar fraudes. Em celulares, uma ameaça comum é o aplicativo falso que se passa por serviço legítimo.',
        },
        {
          type: 'list',
          title: 'Sinais de risco',
          items: [
            'Pedido para instalar aplicativo fora da loja oficial.',
            'Arquivo recebido por mensagem com promessa de benefício ou urgência.',
            'Aplicativo com nome parecido com o oficial, mas desenvolvedor desconhecido.',
            'Solicitação excessiva de permissões, como acessibilidade, SMS, notificações ou controle de tela.',
            'Comportamento estranho do dispositivo após instalação.',
          ],
        },
        {
          type: 'callout',
          title: 'Ação segura',
          text:
            'Instale aplicativos apenas pelas lojas oficiais, confira nome e desenvolvedor, mantenha o sistema atualizado e remova aplicativos desnecessários.',
        },
      ],
    },
    {
      id: 'm5-l4',
      title: 'Ransomware e sequestro de dados',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Ransomware é uma modalidade de malware que bloqueia ou cifra arquivos e exige pagamento para suposta recuperação. Pode atingir cidadãos, empresas, escolas, hospitais e órgãos públicos. A prevenção depende de atualização, cautela com links e anexos, autenticação forte e backups confiáveis.',
        },
        {
          type: 'list',
          title: 'Redução de risco',
          items: [
            'Mantenha sistemas e aplicativos atualizados.',
            'Use mecanismos de proteção, como antimalware e firewall.',
            'Desconfie de anexos e links recebidos por e-mail ou mensagem.',
            'Faça backups automáticos e, em situações especiais, backups manuais.',
            'Guarde cópias em local separado do dispositivo principal.',
          ],
        },
      ],
    },
    {
      id: 'm5-l5',
      title: 'Perfis falsos, contas invadidas e golpes em redes sociais',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Redes sociais são usadas para aproximação, coleta de dados, golpes de falsa venda, falso investimento, falso relacionamento, pedido de dinheiro por suposto conhecido e disseminação de links maliciosos. A confiança entre contatos é explorada para reduzir a desconfiança da vítima.',
        },
        {
          type: 'list',
          title: 'Sinais de perfil ou contato suspeito',
          items: [
            'Conta recém-criada, com pouca atividade ou poucas interações reais.',
            'Mudança repentina de número ou perfil de pessoa conhecida.',
            'Pedido de dinheiro com urgência.',
            'Oferta de investimento com ganho garantido.',
            'Perfil de loja cobrando taxa adicional ou pedindo senha/dados de cartão.',
            'Link encurtado ou domínio estranho enviado por mensagem privada.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A conduta segura é verificar a identidade por outro canal, limitar exposição do perfil, ativar verificação em duas etapas, revisar aplicativos de terceiros conectados à conta e denunciar perfis falsos.',
        },
      ],
    },
    {
      id: 'm5-l6',
      title: 'Falsas vendas, falsos comprovantes e golpes de marketplace',
      estimatedTime: '7 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Golpes de compra e venda online podem atingir tanto consumidores quanto vendedores. O criminoso pode criar loja falsa, anúncio fraudulento, perfil falso, falso intermediador, falso comprovante ou cobrança externa para retirar a negociação da plataforma segura.',
        },
        {
          type: 'list',
          title: 'Sinais de alerta em compras e vendas',
          items: [
            'Preço muito abaixo do mercado.',
            'Pressão para fechar rapidamente.',
            'Pedido de pagamento fora da plataforma.',
            'Comprovante enviado apenas por imagem ou print.',
            'Taxa adicional inesperada.',
            'Vendedor ou comprador insiste em migrar para aplicativo de mensagem.',
          ],
        },
        {
          type: 'callout',
          title: 'Para vendedores',
          text:
            'Não entregue produto ou libere serviço apenas com print de comprovante. Confira se o valor realmente entrou na conta ou se a plataforma confirmou a transação.',
        },
      ],
    },
    {
      id: 'm5-l7',
      title: 'Boatos, desinformação, deepfakes e golpes com IA',
      estimatedTime: '6 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Boatos e conteúdos manipulados podem ser usados para gerar medo, influenciar decisões, aplicar golpes, espalhar malware e criar falsas oportunidades. Com inteligência artificial, áudios, imagens e vídeos falsos podem parecer convincentes.',
        },
        {
          type: 'list',
          title: 'Como verificar antes de compartilhar ou agir',
          items: [
            'Procure a fonte original da informação.',
            'Confira data, contexto e local do fato.',
            'Compare com fontes confiáveis.',
            'Desconfie de títulos alarmistas ou pedidos de compartilhamento urgente.',
            'Observe inconsistências em imagem, vídeo, voz, sombras, cortes e movimentos.',
            'Na dúvida, não compartilhe e não clique.',
          ],
        },
      ],
    },
    {
      id: 'm5-l8',
      title: 'Vazamento de dados e fraude de identidade',
      estimatedTime: '4 min',
      content: [
        {
          type: 'paragraph',
          text:
            'Dados vazados podem alimentar golpes personalizados, abertura de contas, tentativas de recuperação de senha, fraudes financeiras e abordagens contra familiares e contatos. O risco aumenta quando a mesma senha é repetida em vários serviços.',
        },
        {
          type: 'list',
          title: 'Resposta preventiva',
          items: [
            'Confirme comunicados de vazamento por canais oficiais.',
            'Troque senhas expostas em todos os serviços onde foram usadas.',
            'Ative verificação em duas etapas.',
            'Revise acessos recentes e sessões ativas.',
            'Monitore extratos, faturas e registros financeiros.',
            'Desconfie de mensagens muito personalizadas após um vazamento.',
          ],
        },
      ],
    },
  ],
  checklist: [
    'Desconfio de mensagens com urgência, ameaça ou vantagem exagerada.',
    'Não clico em links inesperados antes de confirmar a fonte.',
    'Não abro anexos suspeitos.',
    'Não instalo aplicativos fora das lojas oficiais.',
    'Confiro nome e desenvolvedor antes de instalar aplicativos.',
    'Não informo senhas, tokens ou códigos de verificação por telefone ou mensagem.',
    'Verifico perfis, lojas, vendedores e canais oficiais antes de comprar ou pagar.',
    'Não entrego produto com base apenas em print de comprovante.',
    'Faço backup dos dados importantes.',
    'Confirmo notícias e alertas antes de compartilhar.',
  ],
  practicalActivity: {
    title: 'Classificação de ameaças em situações reaisistas',
    description:
      'Você receberá oito situações simuladas envolvendo mensagem de banco, link de entrega, aplicativo suspeito, falso comprovante, perfil falso, boato alarmista, vazamento de senha e anúncio com preço muito baixo. Classifique cada situação, indique os sinais de alerta e proponha a conduta segura.',
    steps: [
      'Identifique a categoria da ameaça ou golpe.',
      'Liste pelo menos três sinais de alerta.',
      'Indique qual ação o criminoso tenta provocar.',
      'Defina a conduta preventiva adequada.',
      'Aponte quais evidências devem ser preservadas se houver tentativa ou prejuízo.',
    ],
  },
  video: {
    title: 'Catálogo de ameaças e golpes digitais',
    duration: '9 a 11 min',
    script:
      'Apresente o catálogo como ferramenta de reconhecimento de padrões. Explique phishing, malware, ransomware, perfis falsos, falsas vendas, golpes de marketplace, boatos, deepfakes e vazamentos de dados. Use a lógica: sinal de alerta, ação esperada pelo criminoso, conduta segura e evidência a preservar.',
  },
  questionBank: questionBank.m5,
  quizSize: 10,
  quiz: questionBank.m5.slice(0, 10),
}

export { module5 }

