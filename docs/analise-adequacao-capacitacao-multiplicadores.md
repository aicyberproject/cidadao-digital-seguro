# Análise de Adequação para Capacitação de Multiplicadores (Policiais Federais)

Documento de análise. Não altera conteúdo, currículo ou código. Versão de referência analisada: `main` em `4adbff4` (pós-v3.1.0).

## 1. Premissa adotada

O pedido admite duas leituras. Esta análise adota a segunda, por ser a leitura literal de "policiais federais que vão atuar como capacitadores... trabalhar o material na prática com o público em geral":

- **(a)** reescrever o curso atual com linguagem e profundidade para público policial;
- **(b)** **preservar o curso do cidadão como o conteúdo que o multiplicador vai entregar, e construir uma camada de formação de multiplicadores por cima dele.** ← adotada.

Consequência prática: nada em `src/content/` precisa ser reescrito para atender ao objetivo. O que falta é uma trilha distinta, com público-alvo, objetivos, avaliação e certificação próprios.

O Projeto Guardião da Infância é usado aqui apenas como **referência estrutural** do modelo (agentes formados + kit padronizado + coordenação institucional + medição de alcance), não como fonte de conteúdo ou de parâmetros que esta análise possa afirmar.

## 2. Estado do repositório

Verificado e atualizado nesta rodada:

- `main` estava **28 commits atrás** de `origin/main`, **0 à frente**. Atualizado por fast-forward para `4adbff4` ("Resolve pendências do roadmap: links, certificado, a11y e mobile (v3.1.0)").
- Nenhum arquivo rastreado foi modificado; os diretórios não rastreados não colidem com nada no remoto.

As três branches locais foram conferidas contra `origin/main`:

| Branch | Situação |
|---|---|
| `v1.8.5-microinteracoes-scam-tip` | `e81a4e7` já é ancestral de `origin/main`. Nada a preservar. |
| `agent/ux/v1.6.5-a-active-state-sidebar` | Contém os PRs #56–#62, todos **esmagados em `4e198ea`** ("Integra revisão consolidada v1.6 do curso (#79)") no remoto. Conteúdo presente, apenas com SHAs distintos. |
| `backup-alteracoes-locais-pre-v1.7.0` | Além dos mesmos PRs, tem o commit `ed55da8` ("Salva alteracoes locais antes da atualizacao v1.7.0"), que **nunca foi enviado**. Ver abaixo. |

Sobre `ed55da8`: altera `src/App.jsx` e `src/index.css` para destacar o módulo em curso na navegação. O realce visual (`isActiveModule` + classe `module-chip-active`, estilizada em `src/index.css:555` como `.module-chip.module-chip-active`) **está implementado no `main` atual**, em versão mais limpa. O que não migrou é apenas o selo textual "Atual" (`module-chip-current`) e o invólucro `module-chip-status` — variante de UX superada pela solução adotada. **Não há trabalho substantivo perdido**, mas as duas branches locais só devem ser removidas com essa constatação registrada.

## 3. Inventário: o que já existe

Este levantamento é o ponto mais importante da análise, porque parte do material de multiplicador **já existe** — apenas não está no repositório.

### 3.1. No repositório (versionado)

| Ativo | Situação |
|---|---|
| Plataforma EaD (React/Vite) | 6 módulos, progressão sequencial, `localStorage`, sem cadastro |
| Banco de questões | 180 questões (30 por módulo), quiz de 10 sorteadas, corte de 70% |
| Avaliação final | 18 questões fixas, corte de 70% |
| Certificado | PDF via `jspdf`, 20h, código verificador **gerado localmente, sem validação remota** |
| Ferramentas transversais | 27 verbetes de glossário, 21 documentos de biblioteca, 10 checklists, 10 simulações |
| Vídeos | 10 registros em `videos.js` + 6 em `videoLibrary.js`; videoaulas definitivas **pendentes** (roadmap #1) |
| Documentação pedagógica | `docs/projeto-pedagogico-*.md` e `docs/plano-do-curso-*.md` |
| Diretrizes de conteúdo sensível | `docs/homologacao-institucional-v2.9.0.md` |

### 3.2. Fora do repositório — `Anexos - SEI 08200.039644-2023-48/` (não versionado)

- **`Kit_Palestra_Publica_Cidadao_Digital_Seguro.pptx`** — kit de palestra pública já pronto: **15 slides, com notas de apresentador em todos os 15**, duração declarada de 20 a 25 minutos, rotulado "MATERIAL PADRONIZADO PARA AGENTES PÚBLICOS". Cobre os 6 blocos temáticos, checklist de bolso de 5 regras, onde denunciar e chamada final para o curso oficial. As notas já contêm orientação de conduta relevante: não expor histórias pessoais da plateia, pedir exemplos regionais em vez de expor vítimas, "transmita calma, o objetivo não é assustar" e — no slide de perguntas — "se surgir dúvida técnica fora do escopo, é preferível indicar o curso completo a arriscar uma resposta incerta".
- **`Material_de_Apoio_Complementar_*.pdf`** — 11 páginas, apostila de leitura dos 6 módulos para o **aluno**, com avisos explícitos de que não substitui o curso, não contém os quizzes reais e não emite certificado.
- **`Documentacao_Pedagogica_*.pdf`** — versão PDF do Projeto Pedagógico (mesmas 13 seções do `.md` versionado). Sem conteúdo novo.

### 3.3. Fora do repositório — `pacote-premium-diretoria-*/` (não versionado, com `.git` próprio)

Peças executivas para **apresentação do curso à diretoria** (deck, one-page, dossiê, nota técnica com roteiro de fala e respostas a perguntas prováveis da diretoria). É pitch institucional, **não** material de capacitação de multiplicador — não deve ser confundido com o Kit de Palestra.

### 3.4. Conclusão do inventário

O que existe é **um kit de palestra padronizado com roteiro de fala**. O que não existe é **a formação de quem vai usá-lo**: não há nenhum material que ensine o policial a conduzir a palestra, adaptá-la por público, responder ao que a plateia traz, nem qualquer instrumento que habilite e registre esse agente como multiplicador. A busca por `capacitador|multiplicador|instrutor|facilitador` em `src/` e `docs/` retorna uma única ocorrência, e irrelevante.

## 4. Governança: esclarecida, não é impedimento

O Projeto Pedagógico, §13, estabelece **Isolamento Curricular**: "proibição de misturar os conceitos e materiais do Cidadão Digital Seguro com projetos paralelos (como o Projeto EaD CIBERCRIME)".

**Esclarecimento do responsável pelo projeto:** essa regra foi criada porque um curso similar estava sendo construído em paralelo, ao mesmo tempo, e havia risco concreto de mistura de objetos entre os dois. Não é uma vedação a trilhas derivadas deste mesmo curso. **Um módulo de multiplicadores não configura a mistura que o §13 pretende impedir** e, portanto, não depende de revisão formal daquele dispositivo.

Permanece válida, por outro motivo — técnico, não normativo —, a diretriz de **não alterar a matriz de 6 módulos do curso cidadão**: ela está homologada (v2.9.0 e v3.0.0), o certificado declara "6 módulos, 20 horas" e a progressão e o desbloqueio da avaliação final dependem dessa estrutura. O módulo de multiplicadores é conteúdo **adicional e paralelo**, não um sétimo módulo da trilha cidadã.

### Modelo aprovado

Confirmado pelo responsável: o candidato a multiplicador **primeiro obtém o certificado do curso Cidadão Digital Seguro** e **depois realiza um módulo adicional** para se tornar capacitador. O curso cidadão permanece intacto e passa a operar como pré-requisito.

## 5. Lacunas, por eixo

### 5.1. Camada de formação didática — inexistente (prioridade máxima)

Nada no acervo trata de **como** apresentar. Falta:

- Fundamentos de andragogia aplicados a plateia adulta leiga e heterogênea.
- Técnicas de condução: abertura, ritmo, uso de exemplos locais, fechamento.
- **Adaptação por público**: idosos, comerciantes e MEIs, servidores públicos, estudantes, público rural, pessoas com baixa letramento digital. Hoje o kit é único para todos — o que é acertado como padronização de mensagem, mas insuficiente como orientação de entrega.
- **Manejo de perguntas difíceis**: a plateia de uma palestra sobre fraude bancária traz casos concretos em curso, pedidos de ajuda individual, revolta contra bancos e contra a própria polícia, e relatos de vítimas em sofrimento. A nota do slide 15 resolve o caso fácil (dúvida técnica fora de escopo); não cobre o caso difícil.
- Roteiro cronometrado por bloco e versões de duração alternativa (o kit declara 20–25 min; eventos reais pedem 10 min e 50 min).
- Checklist logístico pré-palestra (projeção, som, sala, material impresso, acessibilidade, plano B sem internet).
- Instrumento de avaliação da palestra pelo público e de autoavaliação do apresentador.

### 5.2. Profundidade técnica que o curso do cidadão exclui deliberadamente (prioridade alta)

O curso cidadão evita terminologia técnica por decisão de projeto (§3 e §13 do Projeto Pedagógico). O multiplicador precisa saber mais do que vai dizer, para sustentar a fala sob perguntas. Falta:

- **Tipologias de fraude bancária eletrônica com modus operandi**, no nível de detalhe que permite reconhecer variantes novas, não apenas as nomeadas nos slides 9 e 10.
- **Cadeia de dissipação de valores**: contas de passagem, laranjas, conversão, e por que a janela temporal de reação é curta — hoje o slide 11 afirma que "o tempo é decisivo" sem dar ao apresentador o porquê.
- **O que ocorre depois da denúncia**: registro de ocorrência, o que caracteriza atribuição federal e o que é atribuição estadual, o que vira inquérito. Essa distinção é a pergunta mais previsível de uma plateia e não está tratada em nenhum material.
- **Quais evidências a apuração efetivamente aproveita** da vítima, e em que formato. O curso ensina "guarde prints, links, data e hora" (slide 11); o multiplicador deveria saber por que isso costuma ser insuficiente e o que agrega valor.
- **Fluxos de encaminhamento institucional**: canais oficiais, Aliança Nacional contra Fraudes, MED (já mencionado na homologação v2.9.0), interlocução com o setor bancário.
- **Enquadramento legal** da fraude eletrônica. O acervo atual é praticamente silente: uma varredura por referências legais em `src/content` e `docs/` retorna apenas menções isoladas a LGPD e ao MED. A tipificação aplicável — incluindo a Lei 14.155/2021 — deve ser levantada e **validada pela área jurídica competente**, não redigida a partir de conhecimento presumido.

### 5.3. Limites de fala do agente público — parcialmente coberto, precisa ser explícito (prioridade alta)

O `docs/homologacao-institucional-v2.9.0.md` já é matéria-prima pronta: veda promessa de recuperação de valores, veda promessa de identificação de criminosos, desestimula investigação ou confronto autônomo, padroniza "evidências digitais" em vez de "provas" e obriga o direcionamento a canais oficiais. Essas diretrizes foram escritas para o **conteúdo**; precisam ser reescritas como **regras de conduta do apresentador**, acrescentando o que só se aplica a ele:

- Sigilo funcional e vedação de qualquer referência a investigação em curso, caso concreto ou dado de inquérito.
- Vedação de prestar orientação jurídica individual ou de assumir compromisso de atendimento.
- Vedação de prometer recuperação de valores em resposta a caso trazido pela plateia — situação de pressão bem mais forte que a do texto do curso.
- Conduta ao ser procurado ao final por vítima com caso em andamento: encaminhamento, não atendimento.
- Postura diante de imprensa presente no evento e limites de registro fotográfico/gravação.
- Uso de identidade visual e uniforme, e o que caracteriza manifestação institucional.

### 5.4. Habilitação — requisito nosso, instrumento da ANP

Conceitualmente, **concluinte ≠ instrutor habilitado**: são condições distintas, e o modelo de multiplicadores depende da segunda. O que cabe a este projeto é **especificar** os requisitos de habilitação (pré-requisito de conclusão do curso base, aproveitamento no módulo de multiplicadores, e avaliação prática de apresentação supervisionada).

O que **não** cabe a este projeto é o instrumento: o credenciamento será oficial na ANP. Os requisitos devem ser redigidos como especificação para a ANP implementar, não como funcionalidade a construir aqui.

Registre-se apenas, como nota de escopo, que o certificado atual é gerado por `jspdf` no navegador com código verificador local e sem validação remota — adequado ao curso livre cidadão, e irrelevante para o credenciamento oficial, que ocorrerá em outra plataforma.

### 5.5. Plataforma — fora do nosso escopo (encaminhamento definido)

**Encaminhamento definido pelo responsável:** o curso será convertido para **Moodle**, plataforma utilizada pela ANP, e o credenciamento ocorrerá oficialmente lá.

Cenários, na ordem de preferência declarada:

1. **Melhor caso:** entregar como está e a ANP faz a conversão.
2. **Se a ANP não puder ou não quiser:** a conversão fica com este projeto. O caminho mais simples é converter o que for possível para PDF e entregar **apenas o conteúdo, sem a estrutura**, para que a ANP monte na plataforma.

Consequência direta: **a ausência de backend, cadastro e autenticação na aplicação atual deixa de ser bloqueador**. O registro de multiplicadores habilitados e de palestras realizadas será função da plataforma da ANP, não desta aplicação. O item #4 do roadmap (backend/verificador de certificado) perde prioridade para esta iniciativa.

**A missão deste projeto é deixar o conteúdo pronto.** Isso tem uma implicação de autoria que vale registrar: o conteúdo deve ser escrito de forma que sobreviva à conversão — em blocos estruturados e portáveis, sem depender de comportamento da interface React.

### 5.6. Rebalanceamento temático (prioridade média)

A iniciativa é declaradamente de **repressão a fraudes bancárias eletrônicas**. No currículo atual, essa carga está em M4 (Transações e Consumo), M5 (Catálogo de Ameaças) e M6 (Resposta a Incidentes); M2 (senhas, MFA, backup) e M3 (celular, Wi-Fi, roteador) são apoio. A distribuição de 20h é adequada para o cidadão, mas a trilha do multiplicador não precisa herdá-la: deve concentrar-se no eixo M4–M5–M6, tratando M2–M3 como conhecimento de suporte já adquirido no pré-requisito.

Observação sobre o kit: dos 15 slides, 3 (5, 6, 7) tratam de ecossistema, higiene e dispositivos, enquanto os blocos de fraude e resposta ocupam 4 (8 a 11). Para um público-alvo específico como comerciantes ou idosos, essa proporção provavelmente deveria variar — o que reforça a necessidade de versões do roteiro por público (§5.1), sem alterar a mensagem padronizada.

### 5.7. Versionamento e governança documental (prioridade média)

Achado independente do conteúdo:

- O Kit de Palestra, a apostila de apoio e a documentação pedagógica em PDF estão **fora do controle de versão** (diretório não rastreado). Não há histórico, revisão por PR, nem rastreabilidade de qual versão do kit um agente usou em campo.
- O `pacote-premium-diretoria-*/` carrega um **`.git` próprio** dentro da árvore do projeto principal, sem ser submódulo — configuração frágil, que perde histórico em qualquer operação de cópia.
- O kit declara "Referência curricular: v3.0.0" enquanto o repositório já está em v3.1.0. Sem versionamento conjunto, essa defasagem é invisível e tende a crescer.

Para material que será distribuído a agentes públicos e apresentado em nome da instituição, rastreabilidade de versão não é preferência técnica: é requisito de controle.

## 6. Estrutura do módulo de multiplicadores

Escopo adotado: **um módulo adicional**, conforme o termo empregado pelo responsável ("fazer um módulo adicional para se tornar capacitador") — e não uma trilha de seis blocos, como esta análise havia proposto na versão anterior. Dimensionado em **6 a 8 lições**, comparável em tamanho aos módulos M4, M5 e M6 do curso cidadão.

Pré-requisito de ingresso: certificado de conclusão do curso Cidadão Digital Seguro (20h).

| Lição | Foco |
|---|---|
| 1 | O programa e o papel do multiplicador |
| 2 | Limites de fala e conduta do agente público em atividade de prevenção |
| 3 | Tipologias de fraude bancária eletrônica e cadeia de dissipação de valores |
| 4 | Fluxo institucional pós-incidente e enquadramento legal (a validar pela área jurídica) |
| 5 | Didática aplicada: como conduzir o Kit de Palestra padronizado |
| 6 | Adaptação por público sem alterar a mensagem padronizada |
| 7 | Manejo de plateia: perguntas difíceis, casos concretos e vítimas presentes |
| 8 | Preparação, logística e autoavaliação da palestra |

Duas observações de escopo:

- A lição 5 ensina a conduzir o **kit de 15 slides que já existe** (§3.2). Não se trata de criar um segundo kit.
- A **apresentação supervisionada com avaliação** — que na versão anterior figurava como bloco 6 — não é conteúdo autorável: é requisito de processo para a habilitação. Deve constar como especificação para a ANP implementar (§5.4), não como lição.

## 7. Sequenciamento recomendado

Os dois primeiros itens da versão anterior desta lista eram gates de governança e de plataforma. Ambos foram resolvidos (§4 e §5.5). O que resta é conteúdo:

1. Redigir os **limites de fala e a conduta do apresentador** (§5.3), derivando-os das cinco diretrizes já homologadas em `docs/homologacao-institucional-v2.9.0.md` e acrescentando as específicas do agente público. Maior risco institucional, menor custo de produção — por isso primeiro.
2. Produzir a **camada didática** (§5.1), ancorada no kit existente. É a maior lacuna real.
3. Produzir a **profundidade técnica** sobre tipologias e cadeia de dissipação (§5.2).
4. Produzir o **enquadramento legal** em lição delimitada, para que a área jurídica possa revisá-lo como unidade, sem tipificação espalhada pela prosa.
5. Especificar os **requisitos de habilitação** para a ANP (§5.4).
6. Colocar o Kit de Palestra e a apostila sob **controle de versão** (§5.7) — barato e imediato.
7. Derivar **versões do roteiro por público** (§5.6) a partir do kit padronizado.

Conversores (Moodle XML, PDF) ficam fora deste sequenciamento: só se tornam trabalho se a ANP declinar da conversão (§5.5).

## 8. Pendências herdadas que afetam esta iniciativa

Do `docs/roadmap.md`, dois itens impactam diretamente o modelo de multiplicadores:

- **Videoaulas definitivas (item #1)** ainda pendentes, incluindo dois vídeos institucionais da Polícia Federal marcados como "Em preparação". Um multiplicador que indica o curso ao público ao final da palestra (slide 14) está indicando uma trilha com videoaulas incompletas.
- **Validação institucional final (item #3)** ainda pendente. Se o conteúdo público será apresentado por policiais federais em nome da instituição, essa validação sai de "desejável" e passa a ser condição de partida.

## 9. Conteúdo já produzido nesta rodada

O módulo foi escrito. Dois arquivos novos, ambos não rastreados:

| Arquivo | Conteúdo |
|---|---|
| `src/content/moduloMultiplicador.js` | 8 lições, 41 blocos de conteúdo, 6 objetivos, checklist de 9 itens, atividade prática, especificação de habilitação e 6 recursos |
| `src/content/moduloMultiplicadorQuestions.js` | 20 questões de múltipla escolha, para quiz de 10 sorteadas com o critério de 70% do curso base |

Lições produzidas: (1) programa e papel do multiplicador; (2) limites de fala e conduta do agente público; (3) tipologias de fraude bancária eletrônica; (4) cadeia de dissipação e por que o tempo decide; (5) fluxo institucional e enquadramento legal; (6) condução do Kit de Palestra padronizado; (7) adaptação por público; (8) manejo de plateia, preparação e autoavaliação.

### Decisões de autoria

- **Vocabulário portável.** Usa apenas `paragraph`, `list` e `callout` — o mesmo dos módulos M4 a M6 —, sem `icon` e sem qualquer acoplamento à interface React. A conversão para Moodle ou para PDF opera sobre dados, não sobre marcação.
- **Fora da trilha cidadã.** Arquivo próprio, fora de `src/content/modules/`, deliberadamente **não registrado** em `modules/index.js`. Verificado: `validate:content` segue reportando 6 módulos, `npm run build` conclui sem erro e nenhum arquivo rastreado de `src/` foi alterado. A matriz homologada e o certificado de "6 módulos, 20 horas" permanecem intocados.
- **Lacuna jurídica consciente.** A lição 5 delimita o que o multiplicador pode responder com segurança sobre registro, atribuição e devolução, mas **não enuncia artigos, penas ou critérios de competência**. Há um bloco explícito marcando a tipificação — incluindo a Lei 14.155/2021 — como pendente de redação e revisão pela área jurídica. Preencher isso sem validação formal criaria o risco de o multiplicador reproduzir informação incorreta em nome da instituição.
- **Ancorado no kit existente.** A lição 6 ensina a conduzir os 15 slides que já existem, incluindo formatos de 10, 20–25 e 40–50 minutos. Nenhum segundo kit foi criado.
- **Limites de fala derivados do que já está homologado.** A lição 2 reescreve as cinco diretrizes de `docs/homologacao-institucional-v2.9.0.md` como conduta do apresentador e acrescenta as específicas do agente público: sigilo funcional, vedação de orientação jurídica individual, conduta diante de imprensa e conduta ao ser procurado por vítima.

### Qualidade da avaliação e um achado sobre o banco existente

Durante a conferência do banco novo, dois defeitos de construção foram detectados e corrigidos:

1. **Posição da resposta correta.** Na primeira redação, as 20 questões tinham a resposta no mesmo índice — bastava marcar sempre a segunda alternativa para acertar tudo. Corrigido: distribuição 5/4/6/5 entre as quatro posições.
2. **Extensão da alternativa correta.** Em 17 das 20 questões (85%), a resposta correta era a alternativa mais longa — permitindo aprovação por escolha da opção maior, sem leitura do conteúdo. Corrigido pelo reforço dos distratores, que passaram a enunciar condutas erradas plausíveis com especificidade equivalente. Após a correção: **5 de 20 (25%)**, exatamente o nível esperado por azar.

O segundo defeito motivou a verificação dos bancos já existentes, com o seguinte resultado:

| Banco | Resposta correta é a alternativa mais longa |
|---|---|
| M1 | 30/30 (100%) |
| M2 | 25/30 (83%) |
| M3 | 29/30 (97%) |
| M4 | 25/30 (83%) |
| M5 | 30/30 (100%) |
| M6 | 25/30 (83%) |
| **Total da trilha cidadã** | **164/180 (91%)** |
| Módulo de multiplicadores (após correção) | 5/20 (25%) |

**Isso significa que os quizzes do curso cidadão podem ser aprovados com folga escolhendo sempre a alternativa mais longa, sem estudar o conteúdo.** O padrão é anterior a esta rodada e não foi introduzido aqui.

Nada foi alterado nesses bancos: o `AGENTS.md` veda reduzir ou modificar banco de questões existente sem autorização, e a correção de 164 questões é trabalho de escopo próprio, com impacto na homologação v3.0.0. Fica registrado como achado para decisão — a correção não exige remover questões, apenas reforçar distratores, o mesmo método aplicado aqui.

### Consequência a registrar

Por estar fora do grafo de importação, o módulo **não é coberto por `npm run validate:content`** — o validador enumera o conteúdo a partir de `modules/index.js` e `questionBank/index.js`. A estrutura dos dois arquivos novos foi conferida em verificação à parte (4 opções por questão, índice de resposta válido, ausência de opções duplicadas, ids de lição únicos, distribuição das respostas em 5/4/6/5 entre as quatro posições). Se o módulo passar a ser conteúdo permanente do repositório, vale estender o validador para cobri-lo.

## 10. O que ainda falta para o conteúdo estar completo

1. **Enquadramento legal** — redação e validação pela área jurídica (lição 5).
2. **Requisitos de habilitação** — a especificação está registrada no módulo; a implementação e o credenciamento são da ANP.
3. **Versionamento do Kit de Palestra e da apostila** (§5.7), hoje fora do controle de versão, com o kit ainda declarando "v3.0.0".
4. **Versões do roteiro por público** (§5.6) — a lição 7 define os critérios de adaptação, mas não gera os roteiros derivados.
5. **Pendências herdadas** do §8 (videoaulas definitivas e validação institucional), que afetam a indicação do curso ao público no fecho da palestra.
6. **Conversores** (Moodle XML, PDF) — não iniciados por decisão de escopo: só se tornam trabalho se a ANP declinar da conversão.

## 11. Situação deste documento

Os três arquivos produzidos nesta rodada — este relatório, `src/content/moduloMultiplicador.js` e `src/content/moduloMultiplicadorQuestions.js` — estão **não rastreados** em `main`, e **nenhum commit foi feito**.

Para incorporá-los, o `AGENTS.md` exige branch própria vinculada a issue e Pull Request, com `npm run check` antes de abrir. Sugestão de nome de branch coerente com o padrão do repositório: `v3.2.0-modulo-multiplicadores`.

Registra-se, com o devido reconhecimento: o achado do §5.7 sobre material institucional fora do controle de versão aplica-se também a estes arquivos enquanto permanecerem não rastreados.
