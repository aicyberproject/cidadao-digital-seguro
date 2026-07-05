# Auditoria e Resolução de Pendências do Roadmap — v3.1.0

Este documento registra a rodada de resolução das pendências técnicas listadas em `docs/roadmap.md` após a release final v3.0.0. Foram tratados os itens de materiais complementares, certificado, acessibilidade, revisão responsiva mobile e a avaliação do verificador público de certificado. As videoaulas finais (produção audiovisual) e a validação institucional permanecem fora do escopo desta rodada por dependerem de atores externos ao repositório.

Todas as alterações foram validadas por `npm run check` (validação de conteúdo, build de produção e testes E2E em desktop e mobile).

---

## 1. Revisão de Materiais Complementares (Roadmap item 2)

### Diagnóstico
* O último saneamento completo de links ocorreu na v3.0.0-rc.2 (2026-06-22), com homologação manual documentada.
* A reverificação de disponibilidade em tempo real **não pôde ser executada nesta rodada**: o ambiente de execução opera sob política de rede restritiva, que nega conexões aos domínios externos do curso (gov.br, cert.br, febraban.org.br, interpol.int, youtu.be etc.). Nenhuma conclusão sobre disponibilidade foi inferida a partir dessas negações de rede.
* Verificação estrutural interna (offline) de todos os 39 links únicos do conteúdo: todos usam `https://`, nenhum malformado, nenhum duplicado com destino divergente.
* **Achado de privacidade**: três links de videoaulas em `src/content/videoLibrary.js` carregavam o parâmetro de rastreamento de compartilhamento do YouTube (`?si=...`), incoerente com um curso que ensina proteção de dados.
* **Achado de conteúdo**: dois vídeos em `src/content/videos.js` seguem com `status: 'Em preparação'` e URL vazia ("Engenharia Social: O Fator Humano" e "Resposta a Incidentes Digitais", ambos da Polícia Federal). Não foi identificada fonte oficial estável verificável para substituição; adicioná-los sem verificação violaria o critério de priorização "reduzir risco de orientação incorreta".
* **Achado de código morto**: `src/content/officialLinks.js` e `src/App.backup.jsx` não são referenciados pela aplicação atual (o backup é remanescente de série anterior e é o único consumidor do padrão de links oficiais avulso). Candidatos à remoção em manutenção futura.

### Resolução
* Remoção dos parâmetros `?si=` dos três links do YouTube em `videoLibrary.js` (o identificador do vídeo é preservado; o link continua funcional).
* O validador de conteúdo (`scripts/validateContent.js`) passou a verificar **todas** as URLs do conteúdo (biblioteca, vídeos, biblioteca de vídeos e blocos de links dos módulos): exige `https`, acusa URL malformada como erro e emite aviso para parâmetros de rastreamento (`si`, `utm_*`, `fbclid`, `gclid`). Isso transforma a política de saneamento de links em verificação automatizada contínua.
* Os dois vídeos "Em preparação" foram mantidos como estão, com registro formal nesta auditoria. A interface já os apresenta com selo de status adequado e sem link quebrado.

### Pendência residual
* Reverificação de disponibilidade em tempo real dos links externos deve ser executada periodicamente a partir de ambiente com saída de rede aberta (ou manualmente, como na homologação da rc.1).

---

## 2. Revisão Final do Certificado e Versão (Roadmap item 3)

### Diagnóstico
* A versão do curso é lida dinamicamente de `package.json` e refletida no PDF — correto.
* **Nome do curso incompleto no PDF**: o certificado usava apenas `courseIntro.title` ("Cidadão Digital Seguro"), omitindo o subtítulo oficial "Prevenção e Combate a Crimes Cibernéticos" no texto de conclusão.
* **Dados duplicados na interface**: a tela de certificação exibia nome do curso e carga horária como texto fixo, em vez das constantes usadas no PDF — risco de divergência futura.
* **Versão invisível para o participante**: a versão do curso só aparecia dentro do PDF, não na tela de emissão.
* **Nomes longos**: o nome do participante era impresso sempre em corpo 22; nomes muito longos quebravam em múltiplas linhas com risco de transbordar a moldura decorativa.
* Código verificador: formato `CDS-<dígitos da versão>-<hash base36>`, gerado localmente a partir de nome, data e timestamp. Texto do PDF declara explicitamente "Validação local pelo código" — sem promessa de verificação remota. Adequado ao escopo atual (ver seção 5).

### Resolução
* PDF passa a registrar o nome completo do curso (título + subtítulo) no texto de conclusão; o quadro compacto "Dados do Certificado" mantém o título curto para preservar o layout de uma linha.
* Tela de certificação passou a exibir curso, carga horária e **versão do curso** a partir das mesmas constantes usadas na geração do PDF (`courseIntro`, `CERTIFICATE_WORKLOAD`, `COURSE_VERSION`).
* Corpo do nome do participante reduz automaticamente para 16pt quando o nome excede 44 caracteres, evitando transbordo da moldura.
* Campo de nome ganhou `maxLength={90}` e `autoComplete="name"`.

---

## 3. Acessibilidade (Roadmap item 4)

### Diagnóstico
* A base construída na v2.8.0 permanece sólida (foco visível, ARIA em filtros/estados, `prefers-reduced-motion`, `aria-live`).
* Lacunas remanescentes identificadas: ausência de link "pular para o conteúdo" (WCAG 2.4.1 — Bypass Blocks); a barra superior era `div` genérica sem landmark `header`/`nav`; a `aside` da trilha não tinha rótulo acessível.

### Resolução
* **Skip link**: primeiro elemento focável da página, "Pular para o conteúdo principal", visível ao receber foco, levando o foco programaticamente para `<main id="conteudo-principal" tabIndex={-1}>`.
* **Landmarks**: barra superior convertida para `<header>`; grupo de botões de navegação convertido para `<nav aria-label="Navegação principal do curso">`; trilha lateral rotulada com `aria-label="Trilha do curso"`.
* Cobertura automatizada: novo teste E2E valida que o skip link é o primeiro elemento focável e que sua ativação move o foco para o conteúdo principal (executado em desktop e mobile).

---

## 4. Revisão Responsiva Mobile (Roadmap item 5)

### Diagnóstico
A jornada completa foi executada em viewport móvel (Pixel 7, 412px) pela primeira vez de forma automatizada, revelando **dois defeitos reais de layout**:

1. **Estouro horizontal na Biblioteca**: o chip de metadados que lista módulos relacionados (`modules.join(', ')`) usava `white-space: nowrap`; em documentos transversais associados a vários módulos, o chip único ultrapassava a largura da tela e forçava rolagem horizontal em toda a aplicação.
2. **Estouro horizontal nas Simulações**: o cabeçalho dos cards (`.resource-card-head`) mantinha título e selo de categoria na mesma linha flexível sem quebra; combinações longas (ex.: "Notícia alarmista pedindo compartilhamento" + "Desinformação e conteúdo falso") excediam a largura útil.
3. **Fluxo do curso bloqueado no mobile**: nas telas de "Leitura complementar e links oficiais", a URL era exibida crua em `.link-card-url` sem quebra de palavra; URLs longas do gov.br (90+ caracteres) estouravam o layout e tornavam o botão "Registrar tela e avançar" instável/inacessível ao toque — na prática, **um participante em celular não conseguiria avançar** nessas telas em determinadas larguras.

### Resolução
* `.resource-meta-chip`: removido `white-space: nowrap`, adicionado `max-width: 100%`.
* `.resource-card-head`: adicionado `flex-wrap: wrap` e quebra segura do título (`min-width: 0; overflow-wrap: anywhere`).
* `.link-card-url`: adicionado `overflow-wrap: anywhere`.
* **Cobertura permanente**: novo projeto `mobile-chromium` (Pixel 7) em `playwright.config.js` executa toda a suíte E2E — incluindo a jornada completa até a certificação — em tela pequena, além de novo teste que percorre todas as áreas transversais (Glossário, Biblioteca, Vídeos, Checklists, Simulações, Início) verificando ausência de rolagem horizontal.

---

## 5. Avaliação: Verificador Público de Certificado (Roadmap item 7)

O item pedia avaliação, não implementação. Conclusões:

* **Arquitetura atual**: aplicação 100% estática (GitHub Pages), sem backend. O código verificador é um hash local não reproduzível de forma independente (depende do timestamp de emissão) e o PDF declara honestamente "validação local".
* **O que um verificador público exigiria**: endpoint institucional (backend ou função serverless) com registro persistente das emissões, política de retenção de dados pessoais (nome do participante) conforme LGPD, definição do órgão responsável pela guarda e domínio institucional para consulta.
* **Alternativa sem backend avaliada**: código auto-verificável por assinatura (HMAC/derivação determinística de nome + data + versão), verificável por uma página estática. Aumentaria a robustez sem infraestrutura, mas ainda não constituiria validação institucional, pois qualquer pessoa com acesso ao código-fonte pode gerar códigos válidos.
* **Recomendação**: manter a validação local enquanto o curso não tiver órgão emissor institucional definido. Se houver publicação institucional ampla, implementar registro de emissões em serviço gerenciado (ex.: função serverless + banco leve) com consulta pública apenas por código (sem exposição de nome), tratando o armazenamento do nome como dado pessoal sob LGPD.
* **Decisão**: item permanece no roadmap como etapa futura condicionada à decisão institucional — agora com os requisitos mapeados.

---

## 6. Validação

* `npm run validate:content` — sem erros (novas verificações de URL ativas).
* `npm run build` — build de produção íntegro.
* `npm run test:e2e` — 4 execuções verdes: fluxo completo até a certificação e verificação de skip link/rolagem horizontal, em `chromium` (desktop) e `mobile-chromium` (Pixel 7).

## 7. Pendências que permanecem no roadmap

1. Videoaulas finais (produção audiovisual externa) — inclui os dois vídeos "Em preparação" da Polícia Federal.
2. Validação institucional (ator externo).
3. Reverificação periódica de disponibilidade dos links externos em ambiente com rede aberta.
4. Verificador público de certificado (condicionado à decisão institucional; requisitos mapeados na seção 5).
5. Manutenção futura: avaliar remoção de `src/App.backup.jsx` e `src/content/officialLinks.js` (código morto).
