import { Wifi } from 'lucide-react'
import { officialLinks } from '../officialLinks'
import { questionBank } from '../questionBank'

export const module3 = {
  id: 'm3',
  title: 'Módulo 3 — Proteção de Dispositivos e Redes',
  shortTitle: 'Proteção de Dispositivos e Redes',
  icon: Wifi,
  theme: 'Celulares, tablets, computadores, roteadores, redes Wi-Fi, malware e trabalho remoto seguro.',
  goal:
    'Capacitar o participante a proteger o ambiente técnico da vida digital, reduzindo riscos em celulares, computadores, redes domésticas, conexões públicas e rotinas de trabalho remoto.',

  content: [
    {
      type: 'text',
      title: 'Abertura do módulo',
      body: [
        'A vida digital acontece dentro de um ambiente técnico. O celular concentra banco, e-mail, mensagens, autenticação, fotos, documentos e aplicativos de comunicação. O computador concentra arquivos, trabalho, navegação, compras, estudos e acesso a sistemas. O roteador conecta todos esses dispositivos à internet.',
        'Quando esse ambiente técnico é frágil, golpes e ataques se tornam mais prováveis. Um aplicativo instalado fora da loja oficial, um celular sem bloqueio adequado, um roteador com senha padrão ou um computador desatualizado podem abrir caminho para invasões, malware, furto de dados, fraudes e prejuízos.',
        'Neste módulo, o foco deixa de ser apenas a conta ou a senha e passa a incluir o dispositivo e a rede. O objetivo é formar uma rotina mínima de proteção para celular, computador, Wi-Fi e trabalho remoto.',
      ],
    },
    {
      type: 'scenario',
      title: 'Pergunta mobilizadora',
      prompt:
        'Uma pessoa recebe uma mensagem de suposto suporte técnico e instala um aplicativo fora da loja oficial no celular usado para banco, e-mail e autenticação. O problema está apenas no clique ou também no ambiente técnico que permitiu a instalação, o acesso a dados e o possível controle do dispositivo?',
    },
    {
      type: 'text',
      title: 'O ambiente técnico como porta de entrada',
      body: [
        'Criminosos procuram o caminho mais fácil. Às vezes, esse caminho não é a senha mais importante, mas o dispositivo menos protegido, o aplicativo falso, o roteador desatualizado, a rede Wi-Fi fraca ou o computador usado simultaneamente para trabalho e atividades pessoais de risco.',
        'Proteger dispositivos e redes é reduzir a superfície de ataque. Isso significa diminuir pontos vulneráveis que podem ser explorados para instalar malware, capturar dados, alterar configurações, acessar contas ou induzir a vítima a praticar uma ação prejudicial.',
        'A segurança técnica também melhora a resposta a incidentes. Quem mantém backup, localização remota, bloqueio de tela, autenticação forte e sistemas atualizados tende a sofrer menos danos quando algo dá errado.',
      ],
    },
    {
      type: 'text',
      title: 'Celular: a carteira digital do cidadão',
      body: [
        'O celular deve ser tratado como uma carteira digital. Ele contém aplicativos bancários, carteiras de pagamento, documentos, e-mail, mensagens, fotos, autenticação em duas etapas, dados de recuperação de contas e acesso a redes sociais.',
        'Se alguém obtém acesso ao celular desbloqueado, pode ler mensagens, redefinir senhas, acessar aplicativos, procurar senhas salvas, alterar configurações, obter códigos de autenticação e se passar pelo usuário.',
        'A proteção do celular exige medidas combinadas: senha forte de desbloqueio, bloqueio automático rápido, cuidado com aplicativos instalados, proteção de apps sensíveis, atualização do sistema, backup, localização remota e proteção do chip SIM.',
      ],
    },
    {
      type: 'text',
      title: 'Bloqueio de tela, biometria e aplicativos sensíveis',
      body: [
        'Biometria facilita o uso, mas o aparelho sempre possui uma senha, PIN ou padrão de desbloqueio. Se essa senha for fraca, simples ou previsível, o criminoso pode tentar adivinhá-la ou observá-la em locais públicos.',
        'Prefira senha longa, se possível alfanumérica. Evite datas, sequências, desenhos simples e padrões fáceis. Ative o bloqueio automático com o menor tempo disponível.',
        'Aplicativos sensíveis, como bancos, e-mail, nuvem, mensagens, bloco de notas e gerenciadores de senhas, devem receber proteção adicional quando o sistema permitir. Alguns aparelhos permitem bloquear ou ocultar apps específicos, exigir Face ID, biometria ou senha para abertura e restringir notificações sensíveis.',
      ],
    },
    {
      type: 'text',
      title: 'Tela bloqueada, chip SIM e IMEI',
      body: [
        'Mesmo com o celular bloqueado, a tela inicial pode expor mensagens, códigos, atalhos de configuração e controles rápidos. Esses recursos podem ser explorados para visualizar informações, impedir localização remota, desativar conexões ou obter códigos de autenticação.',
        'Desabilite a visualização de mensagens sensíveis e atalhos críticos na tela bloqueada. Avalie também recursos como fixação de tela ou acesso guiado quando precisar usar o aparelho em ambiente público com um aplicativo aberto.',
        'Proteja o chip SIM com PIN e altere o código padrão da operadora. Isso dificulta que o chip seja colocado em outro aparelho para receber SMS de verificação. Também anote e guarde o IMEI em local seguro, pois ele pode ser necessário para bloqueio do aparelho junto à operadora e registro de ocorrência.',
      ],
    },
    {
      type: 'text',
      title: 'Instalação de aplicativos: lojas oficiais e desenvolvedor correto',
      body: [
        'Aplicativos falsos podem se passar por bancos, lojas, serviços públicos, plataformas de entrega, antivírus ou ferramentas de suporte. Se instalados, podem capturar dados, induzir transferências, alterar o funcionamento do aparelho ou dar acesso remoto ao criminoso.',
        'Use apenas lojas oficiais do sistema ou do fabricante. Mesmo nas lojas oficiais, confira o nome do aplicativo, o desenvolvedor, avaliações, permissões solicitadas e se o serviço realmente oferece aquele aplicativo.',
        'Nunca instale aplicativos recebidos por link em mensagem, ligação, anúncio suspeito ou suposto atendimento emergencial. Suporte legítimo não deve exigir instalação apressada de aplicativo desconhecido.',
      ],
    },
    {
      type: 'text',
      title: 'Computador seguro: programas originais, atualizações, antivírus e firewall',
      body: [
        'Computadores armazenam arquivos, senhas, documentos, fotos, certificados, histórico de navegação e acesso a sistemas. Também podem ser usados como ponto de partida para ataques contra contas, redes domésticas ou ambientes corporativos.',
        'Use programas originais e obtidos por fontes confiáveis. Sistemas ou aplicativos não originais podem conter malware, não receber atualizações, funcionar incorretamente ou não contar com suporte de segurança.',
        'Mantenha sistema, navegador e aplicativos atualizados, preferencialmente com atualização automática. Use antivírus ou antimalware atualizado e mantenha firewall pessoal ativo para reduzir ataques vindos pela rede.',
      ],
    },
    {
      type: 'text',
      title: 'Vulnerabilidades, malware e anexos suspeitos',
      body: [
        'Vulnerabilidade é uma falha de projeto, implementação ou configuração que pode ser explorada para comprometer sistemas, dispositivos ou dados. Atualizações corrigem vulnerabilidades conhecidas e reduzem o risco de exploração.',
        'Malware pode chegar por links, anexos, aplicativos falsos, sites comprometidos, mídias removíveis e programas piratas. Pode capturar senhas, espionar atividades, cifrar arquivos, exibir páginas falsas ou transformar o dispositivo em instrumento de novos ataques.',
        'Desconfie de anexos inesperados, mesmo quando parecem vir de conhecidos. Analise o contexto, confirme por outro canal quando necessário, verifique com antimalware se for o caso e, na dúvida, não abra.',
      ],
    },
    {
      type: 'text',
      title: 'Rede doméstica: roteador, senha administrativa e Wi-Fi',
      body: [
        'A rede doméstica depende de equipamentos como modem, roteador e ponto de acesso. Esses equipamentos conectam dispositivos à internet e, se mal configurados, podem permitir acesso indevido, interceptação de tráfego, alteração de DNS, propagação de malware ou uso abusivo da conexão.',
        'Troque a senha administrativa padrão do roteador. Senhas de fábrica podem ser conhecidas, previsíveis ou obtidas na internet. Use senha forte e guarde-a em local seguro.',
        'Use senha forte na rede Wi-Fi. Troque a senha se suspeitar que foi descoberta ou se algum dispositivo autorizado foi furtado. Sempre que possível, use rede de convidados para visitantes e dispositivos menos confiáveis.',
      ],
    },
    {
      type: 'text',
      title: 'SSID, criptografia e atualização do roteador',
      body: [
        'O SSID é o nome da rede Wi-Fi. Usar o nome padrão pode revelar marca, modelo, provedor ou outras informações úteis para quem procura vulnerabilidades conhecidas. Também pode facilitar conexões automáticas indevidas a redes com nomes semelhantes.',
        'Escolha nome de rede que não exponha dados pessoais, endereço, número da casa, modelo do roteador ou provedor. Use criptografia atual: prefira WPA3 ou WPA2/WPA3. Não use WEP ou WPA antigo.',
        'Roteadores também precisam de atualização. Firmware desatualizado pode conter falhas exploráveis. Verifique periodicamente se há atualizações ou consulte as orientações do fabricante ou provedor.',
      ],
    },
    {
      type: 'text',
      title: 'Wi-Fi público e conexões fora de casa',
      body: [
        'Redes públicas ou abertas podem ser convenientes, mas exigem cautela. Nem sempre é possível saber quem administra a rede, se ela é legítima ou se há coleta indevida de dados.',
        'Evite transações sensíveis em Wi-Fi público. Quando possível, prefira a rede móvel para bancos e serviços críticos. Se a organização fornecer VPN confiável para trabalho remoto, use-a conforme orientação institucional.',
        'Desconfie de redes com nomes parecidos com estabelecimentos conhecidos e que pedem dados excessivos. Sempre que possível, confirme o nome oficial da rede com o local.',
      ],
    },
    {
      type: 'text',
      title: 'Trabalho remoto seguro',
      body: [
        'No trabalho remoto, o ambiente do usuário pode se tornar porta de entrada para redes e sistemas corporativos. Uma conta invadida ou um computador infectado pode gerar prejuízos para a organização e também para o próprio trabalhador.',
        'Respeite as regras da instituição, não compartilhe credenciais, não tente burlar mecanismos de segurança e use apenas canais, sistemas e aplicativos autorizados.',
        'Evite usar computador corporativo para fins pessoais e vice-versa. Não permita o uso por familiares. Quando houver exigência institucional, utilize VPN, autenticação forte, criptografia de disco, firewall e antimalware atualizado.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 1 — Aplicativo falso de suporte',
      body: [
        'A vítima recebe ligação de suposto suporte técnico informando que sua conta foi comprometida. O atendente envia link para instalar um aplicativo de segurança fora da loja oficial.',
        'O risco combina engenharia social e falha técnica. A conduta segura é não instalar o app, encerrar o contato, procurar o canal oficial da instituição, verificar o dispositivo e trocar senhas críticas a partir de aparelho confiável se houver suspeita de comprometimento.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 2 — Roteador com senha padrão',
      body: [
        'Uma família mantém o roteador com senha administrativa de fábrica e rede Wi-Fi com senha fraca. Um invasor altera configurações do equipamento e passa a redirecionar acessos para páginas falsas.',
        'A prevenção inclui trocar senha administrativa, usar Wi-Fi com senha forte, ativar WPA2/WPA3 ou WPA3, atualizar o roteador e revisar configurações de DNS e dispositivos conectados.',
      ],
    },
    {
      type: 'text',
      title: 'Exemplo prático 3 — Furto de celular em via pública',
      body: [
        'O celular é furtado desbloqueado ou com senha simples. O criminoso acessa mensagens, e-mail, banco, fotos, apps de autenticação e dados de recuperação.',
        'As medidas preventivas mais importantes deveriam ter sido adotadas antes: senha forte, bloqueio automático, ocultação de notificações sensíveis, bloqueio de apps críticos, PIN do chip SIM, backup, localização remota e IMEI anotado.',
      ],
    },
    {
      type: 'video',
      title: 'Videoaula do módulo',
      description:
        'Explique como proteger celulares, computadores, roteadores, redes Wi-Fi, conexões públicas e rotinas de trabalho remoto, destacando atualização, apps oficiais, bloqueio de tela, SIM, IMEI, antimalware, firewall e criptografia.',
      duration: '10 min',
    },
    {
      type: 'tip',
      title: 'Dica de Especialista',
      text:
        'O criminoso procura o elo mais fácil. Não adianta proteger apenas a senha se o celular está sem bloqueio forte, o roteador usa senha padrão ou o computador instala qualquer aplicativo recebido por link.',
    },
    {
      type: 'scam',
      title: 'Momento É Golpe!',
      text:
        'Um suposto suporte envia link para instalar aplicativo fora da loja oficial e pede que você mantenha a ligação ativa. Esse é um sinal de alerta: não instale, não conceda acesso remoto e procure o canal oficial da instituição.',
    },
    {
      type: 'checklist',
      title: 'Checklist técnico',
      items: [
        'Meu celular está atualizado',
        'Uso bloqueio de tela forte no celular',
        'O bloqueio automático da tela está configurado para pouco tempo',
        'Notificações sensíveis não aparecem na tela bloqueada',
        'Aplicativos bancários, e-mail e apps sensíveis têm proteção adicional quando possível',
        'O chip SIM está protegido por PIN',
        'O IMEI do celular está anotado e guardado em local seguro',
        'Instalo aplicativos apenas por lojas oficiais',
        'Removi aplicativos que não uso mais',
        'Meu computador usa programas originais e atualizados',
        'O antivírus ou antimalware está ativo e atualizado',
        'O firewall pessoal está ativo',
        'Meu roteador teve a senha administrativa padrão alterada',
        'Minha rede Wi-Fi usa senha forte e criptografia WPA2/WPA3 ou WPA3',
        'O nome da rede Wi-Fi não expõe dados pessoais, modelo ou provedor',
        'Evito transações sensíveis em Wi-Fi público',
        'No trabalho remoto, sigo as regras institucionais e não compartilho credenciais',
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
        'Faça um diagnóstico do seu ambiente técnico. Avalie: 1) celular; 2) computador; 3) roteador e Wi-Fi; 4) uso de conexões públicas; 5) rotina de trabalho remoto. Para cada área, indique uma vulnerabilidade provável e uma ação concreta de melhoria.',
      reflection:
        'Uma boa resposta pode incluir: ativar PIN do chip SIM, revisar notificações na tela bloqueada, remover apps não usados, conferir atualizações, ativar antimalware e firewall, trocar senha administrativa do roteador, usar WPA2/WPA3 ou WPA3, evitar Wi-Fi público para transações sensíveis e separar uso pessoal e profissional no trabalho remoto.',
    },
  ],

  questionBank: questionBank.m3,
  quizSize: 10,
  quiz: questionBank.m3.slice(0, 10),
}