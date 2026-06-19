# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.8.0] - 2026-06-19

### Added
- **Documentação de Auditoria de Acessibilidade e Usabilidade**: Criação do documento `docs/auditoria-a11y-responsividade-usabilidade-v2.8.0.md` contendo o diagnóstico estrutural e o mapeamento de melhorias aplicadas à interface e navegação.

### Changed
- **Melhoria de Acessibilidade em Simulações**: Remoção do atributo `aria-labelledby` redundante nas opções de decisão em `src/App.jsx`, que substituía incorretamente o texto das alternativas por "O que você faria?" em leitores de tela.
- **Sinalização de Estado Ativo na Barra de Navegação**: Adicionada marcação visual `.button-outline.active` em `src/index.css` e o atributo acessível `aria-current="page"` em `src/App.jsx` para destacar a aba atualmente ativa (Início, Glossário, Biblioteca, Vídeos, Checklists, Simulações).
- **Consistência de Foco Visível**: Ampliação dos estilos `:focus-visible` e `:focus-within` em `src/index.css` para abranger checkboxes, botões de rádio, cartões de links e chips de etapas do curso, assegurando navegação clara por teclado.
- **Correção de Alinhamento de Filtros**: Adicionado o estilo base de grid de filtros `.library-filter-grid` no desktop, ausente na versão anterior, que contava apenas com formatação mobile.
- **Eliminação de Ruído em Leitores de Tela**: Inclusão de `aria-hidden="true" focusable="false"` nos ícones de link externo transversais em `src/App.jsx`.

## [2.7.0] - 2026-06-19

### Added
- **Documentação de Revisão do Banco de Questões**: Criação do documento `docs/revisao-questoes-avaliacao-v2.7.0.md` contendo o diagnóstico de consistência de quizzes e da avaliação final integradora, além do mapeamento de termos revisados.

### Changed
- **Revisão Editorial de Quizzes**: Alinhamento terminológico em `src/content/questionBank/module6Questions.js` para substituir referências inadequadas a "provas" por "evidências/evidências digitais" dirigidas ao cidadão (Q83 e Q178).

## [2.6.0] - 2026-06-19

### Added
- **Documentação de Revisão Pedagógica**: Criação do documento `docs/revisao-pedagogica-global-v2.6.0.md` contendo a análise estrutural dos 6 módulos, progressão pedagógica M1-M6, coerência da linguagem cidadã e mapeamento de recursos transversais.

### Changed
- **Revisão Editorial de Módulos**: Substituição de menções inadequadas do termo "prova/provas" dirigidas ao cidadão pelo termo técnico "evidência/evidências digitais" em `src/content/modules/module6.js`.
- **Padronização Textual**: Ajuste de nomenclatura do campo `shortTitle` no Módulo 4 (`src/content/modules/module4.js`) para "Transações Seguras" para consistência visual na interface de navegação.

## [2.5.0] - 2026-06-19

### Added
- **Evolução de Metadados e Tags para Vídeos**: Adicionados os campos opcionais `modules` (array) e `tags` (array) aos 10 vídeos educativos em `src/content/videos.js`, mantendo `relatedModule` para retrocompatibilidade.
- **Validação de Conteúdo**: Atualização do validador `scripts/validateContent.js` para certificar a estrutura e os dados dos novos campos de vídeo.
- **Aprimoramento de Busca e Filtragem**: Busca de vídeos estendida para considerar as novas tags e módulos. O dropdown de filtragem de módulos agora cruza os novos arrays de forma consistente, preservando o fallback seguro.
- **Unificação Estética**: Renderização de tags em formato de chip para a aba de vídeos educativos, empregando a classe visual comum `.resource-tag-chip` e adaptando as tags da curadoria curada de vídeos.

## [2.4.0] - 2026-06-19

### Added
- **Consolidação Documental da Série v2.x**: Criação do documento `docs/consolidacao-ferramentas-transversais-v2.4.0.md` detalhando o histórico de entregas transversais, métricas de acervo e garantias de isolamento de infraestrutura pedagógica e funcional.
- **Evolução do README**: Atualização do [README.md](README.md) para registrar a consolidação do ecossistema transversal aprimorado em v2.x.

## [2.3.0] - 2026-06-19

### Added
- **Refinamento de Consistência e Unificação Visual**: Introdução de novas classes de design padronizadas (`resource-title-row`, `resource-tag-list`, `resource-tag-chip`, `info-box-compact`, `ludic-box-compact`, `ludic-header-compact`, `actions-footer-compact`, `actions-footer-text` e `actions-footer-btn-compact`) em `src/index.css` para unificar a apresentação de títulos, tags e botões em ferramentas transversais.
- **Eliminação de Estilos Inline**: Remoção completa de estilos inline remanescentes nas frentes de Glossário, Biblioteca e Simulações Rápidas em `src/App.jsx`.
- **Acessibilidade e Tipografia Semântica**: Padronização de tamanhos de fonte, contrastes e espaçamentos por meio de novas classes utilitárias (`text-title-small`, `text-title-medium`, `text-body-small`, `text-body-medium` e `.tag.warning-tag-chip`).
- **Resolução de Coerência de Feedback**: Criação das classes de feedback `.info-box.simulation-feedback-box.success` e `.info-box.simulation-feedback-box.error` com especificidade CSS natural para renderizar as bordas coloridas sem estilos inline ou a necessidade de usar `!important`.

## [2.2.0] - 2026-06-19

### Added
- **Simulações Rápidas Aprimoradas (Evolução de Schema)**: Adicionados campos opcionais `modules` (array), `tags` (array) e `recommendedAction` (string) a todos os 10 cenários de microlearning em `src/content/simulations.js`.
- **Compatibilidade Retroativa de Módulos**: Preservado o campo legado `relatedModule` para garantir estabilidade e evitar regressões de navegação.
- **Visualização de Orientação Prática Pós-Resposta**: Introduzido um painel de feedback aprimorado (`.simulation-recommended-box`) que renderiza a ação recomendada preventiva (`recommendedAction`) em destaque após a resolução da simulação.
- **Filtros e Busca Inteligente**: Busca textual livre estendida para varrer as novas `tags`, `modules` e `recommendedAction`. O dropdown de filtragem por Módulo agora cruza o novo array `modules` com fallback seguro para `relatedModule`.
- **Auditoria de Conteúdo**: O script `validateContent.js` foi estendido para analisar a consistência dos novos campos adicionados sem torná-los obrigatórios.

## [2.1.0] - 2026-06-18

### Added
- **Biblioteca Aprimorada (Estruturação de Schema)**: Adicionados campos opcionais `modules`, `tags` e `official` a todos os documentos da Biblioteca em `src/content/library.js`.
- **Compatibilidade Retroativa de Módulos**: Mantido o campo legado `relatedModule` para garantir estabilidade e evitar quebras.
- **Filtros por Módulo na Biblioteca**: Novo controle dropdown de filtragem dinâmica por módulo inserido na interface de apoio da Biblioteca.
- **Mapeamento de Tags e Fontes Oficiais**: Adicionado suporte para visualização de tags visuais em chips e indicação de selo verde "Fonte Oficial" para instituições verificadas (como CERT.br, MJSP, Polícia Federal, etc.).
- **Auditoria de Conteúdo**: O validador local `validateContent.js` agora analisa a estrutura dos arrays `modules` e `tags`, além do tipo boolean de `official`.

## [2.0.0] - 2026-06-17

### Added
- **Glossário Aprimorado**: Expansão do schema de dados (`src/content/glossary.js`) para suportar os novos campos `example` e `priority`.
- **Evolução da Interface do Glossário**: Atualização da visualização em `src/App.jsx` para destacar termos prioritários e exibir exemplos práticos.
- **Validação de Conteúdo**: Ajuste no script `validateContent.js` para aceitar formalmente os novos campos opcionais do Glossário.

## [1.9.5] - 2026-06-17

### Documentation
- **Consolidação do Planejamento Transversal**: Síntese e agrupamento dos diagnósticos realizados na série v1.9.x (Glossário, Biblioteca, Simulações e Auditoria Visual).
- **Roadmap v2.0.x**: Criação do documento `docs/consolidacao-planejamento-v1.9.5.md` estabelecendo a estratégia, as frentes e a ordem segura de implementação (v2.0.0 a v2.0.4).
- **Encerramento de Série**: Fechamento oficial da fase puramente documental e de diagnóstico de ferramentas transversais.

## [1.9.4] - 2026-06-17

### Planning
- **Planejamento de Auditoria Visual Global**: Diagnóstico visual da interface do curso (`src/App.jsx` e `src/index.css`) com foco nas áreas transversais.
- **Diretrizes de Consistência**: Documentação em `docs/planejamento-auditoria-visual-global-v1.9.4.md` cobrindo tipografia, espaçamento (vertical rhythm), botões, cards e grids.
- **Foco em Acessibilidade**: Registro de critérios para contraste de cores, navegação por teclado (focus-visible), ARIA e `prefers-reduced-motion`.

## [1.9.3] - 2026-06-17

### Planning
- **Planejamento das Simulações Rápidas**: Revisão e diagnóstico da estrutura atual das simulações em `src/content/simulations.js`.
- **Evolução de Cenários**: Documentação em `docs/planejamento-simulacoes-rapidas-v1.9.3.md` mapeando cenários prioritários para refatoração pedagógica (Falsa Central, QR Code, Falso Suporte, Preservação de Evidências).
- **Critérios de Feedback**: Oficialização das diretrizes para feedbacks corretivos construtivos, não-culpabilizantes e sincronizados com a linguagem lúdica do curso.

## [1.9.2] - 2026-06-17

### Planning
- **Planejamento da Biblioteca e Documentos Públicos**: Diagnóstico da estrutura de dados das coleções `library.js`, `videoLibrary.js` e `officialLinks.js` na branch v1.9.2.
- **Diretrizes de Evolução**: Documentação em `docs/planejamento-biblioteca-documentos-v1.9.2.md` com propostas para padronização de campos de módulo (arrays) e inserção de `tags` nos fascículos.
- **Critérios de Curadoria**: Oficialização das regras de inclusão de novos materiais, limitando fontes a domínios de alta credibilidade (ex: `.gov.br`, `cert.br`, confederações).

## [1.9.1] - 2026-06-17

### Planning
- **Planejamento do Glossário**: Criação do documento `docs/planejamento-glossario-v1.9.1.md` contendo o diagnóstico estrutural e visual da ferramenta.
- **Mapeamento de Lacunas**: Identificada a oportunidade de adicionar um campo de "exemplo prático" (`example`) e um indicador de "termo prioritário" (`priority`) no modelo de dados atual.
- **Diretrizes de Interface**: Proposição de destaque visual para o vínculo com módulos e melhorias no mecanismo de busca textual para abranger definições e futuros exemplos.

## [1.9.0] - 2026-06-17

### Planning
- **Planejamento de Ferramentas Transversais**: Início da série v1.9.x com foco na evolução de áreas de apoio como Glossário, Biblioteca e Simulações Rápidas.
- **Matriz de Frentes Candidatas**: Criação do documento `docs/planejamento-ferramentas-transversais-v1.9.0.md` mapeando os diagnósticos, critérios de priorização e sequência sugerida para a nova fase.
- **Marco de Versão**: Encerramento oficial da série v1.8.x (camada lúdica e avaliativa).

## [1.8.9] - 2026-06-17

### Documentation
- **Auditoria Final (Série 1.8.x)**: Criação de `docs/auditoria-final-ludica-avaliativa-v1.8.9.md` consolidando a matriz de rastreabilidade das versões 1.8.0 a 1.8.8.
- **Consolidação Pedagógica**: Ateste formal da integração bem-sucedida entre a camada de conteúdo lúdico, as microinterações visuais e os quizzes de reforço.
- **Marco de Estabilidade**: Confirmação da manutenção da integridade técnica (arquitetura, progresso, certificação) durante toda a fase de expansão.

## [1.8.8] - 2026-06-17

### Changed
- **Revisão de Quizzes (M4-M6)**: Ajuste pedagógico das questões para reforçar alertas e dicas lúdicas introduzidos na série 1.7.x nos módulos finais.
- **Sincronia Conteúdo-Avaliação**: Refinamento dos temas de QR Code Estático (M4), Cartão Virtual (M4), Perfil Falso/Denúncia (M5) e Preservação de Evidências (M6).
- **Manutenção Documental**: Criação de `docs/revisao-quizzes-m4-m6-v1.8.8.md` detalhando os ajustes realizados e concluindo a integração dos questionários com a camada lúdica.

## [1.8.7] - 2026-06-17

### Changed
- **Revisão de Quizzes (M1-M3)**: Ajuste pedagógico das questões para reforçar alertas e dicas lúdicas introduzidos na série 1.7.x.
- **Sincronia Conteúdo-Avaliação**: Refinamento dos temas de Falsa Central (M1), Phishing de SMS (M2) e IMEI/Suporte Falso (M3) nos bancos de questões.
- **Manutenção Documental**: Criação de `docs/revisao-quizzes-m1-m3-v1.8.7.md` detalhando os ajustes realizados.

## [1.8.6] - 2026-06-17

### Added
- **Auditoria de Microinterações**: Realizada auditoria visual, técnica e de acessibilidade de todos os componentes animados (`LudicTransition`, `ScamAlertBlock`, `SpecialistWordBlock`).
- **Documentação Consolidada**: Criação de `docs/auditoria-microinteracoes-ludicas-v1.8.6.md` atestando o cumprimento total do planejamento v1.8.2.
- **Validação Transversal**: Confirmação da ausência de efeitos colaterais visuais ou bloqueios de navegação em todos os módulos.

## [1.8.5] - 2026-06-17

### Added
- **Expansão de Microinterações**: Aplicação das animações CSS de entrada (`fade-in` + `slide-up`) aos componentes `ScamAlertBlock` e `SpecialistWordBlock`.
- **Padronização Visual**: Consolidação do ritmo de surgimento de todos os blocos lúdicos em todos os módulos do curso.

## [1.8.4] - 2026-06-16

### Added
- **Auditoria de Microinteração**: Realizada auditoria técnica e de acessibilidade da microinteração CSS no componente `LudicTransition`.
- **Documentação de Auditoria**: Criação de `docs/auditoria-microinteracao-transition-v1.8.4.md` atestando conformidade com as diretrizes de UX e performance.
- **Validação de Acessibilidade**: Confirmação do funcionamento correto do fallback para `prefers-reduced-motion`.

## [1.8.3] - 2026-06-16

### Added
- **Microinterações CSS Experimentais**: Implementação de animação de entrada (fade-in + slide-up) para o componente `LudicTransition`.
- **Animações Otimizadas**: Uso exclusivo de `transform` e `opacity` para garantir performance e evitar reflows de layout.
- **Respeito à Acessibilidade**: Implementação de fallback obrigatório para `prefers-reduced-motion` nas novas classes de animação.

## [1.8.2] - 2026-06-16

### Planning
- **Planejamento de Microinterações**: Elaboração de diretrizes técnicas e pedagógicas para futuras animações da camada lúdica em `docs/planejamento-microinteracoes-v1.8.2.md`.
- **Estratégia Técnica**: Recomendação de uso prioritário de CSS puro para animações de entrada, reservando `framer-motion` para orquestrações complexas.
- **Diretrizes de Acessibilidade**: Definição de suporte obrigatório a `prefers-reduced-motion` e foco no desempenho de dispositivos de baixo custo.

## [1.8.1] - 2026-06-16

### Documentation
- **Saneamento Documental Lúdico**: Padronização de títulos, rodapés e nomenclaturas em todos os documentos de auditoria da série 1.7.x.
- **Índice de Documentação**: Criação de `docs/indice-documental-ludico.md` para centralizar o acesso aos relatórios de expansão lúdica.
- **Verificação de Referências**: Validação de caminhos e nomes de arquivos citados no histórico de versões.

## [1.8.0] - 2026-06-16

### Added
- **Auditoria Final e Consolidação Lúdica**: Encerramento formal da série v1.7.x com auditoria transversal de todos os módulos.
- **Documentação Consolidada**: Criação de `docs/auditoria-final-ludica-v1.8.0.md` mapeando todas as inserções lúdicas e atestando a coerência pedagógica.
- **Relatório de Recomendações**: Definição de roadmap para futuras séries de melhoria (v1.8.x a v2.0.x).

## [1.7.9] - 2026-06-16

### Added
- **Auditoria Lúdica Módulo 6**: Realizada auditoria completa dos blocos inseridos no Módulo 6 (v1.7.8).
- **Documentação de Auditoria**: Criação de `docs/auditoria-ludica-modulo6-v1.7.9.md` atestando o equilíbrio pedagógico no encerramento do curso.
- **Validação de Encerramento**: Verificação final de renderização e fluxos E2E, consolidando a camada lúdica em todos os módulos da matriz curricular.

## [1.7.8] - 2026-06-16

### Added
- **Expansão Lúdica Módulo 6**: Inserção estratégica de componentes lúdicos no Módulo 6 (Resposta a Incidentes e Denúncia).
- **Alerta de Falso Suporte**: Adicionado bloco "Momento É Golpe!" sobre criminosos que se passam por suporte técnico em redes sociais.
- **Dica de Preservação**: Adicionado bloco "Palavra do Especialista" reforçando a importância de não apagar conversas antes de coletar evidências.
- **Transição de Contexto**: Implementada transição lúdica entre as fases de contenção de danos e preservação de evidências.

## [1.7.7] - 2026-06-16

### Added
- **Auditoria Lúdica Módulo 5**: Realizada auditoria completa dos blocos inseridos no Módulo 5 (v1.7.6).
- **Documentação de Auditoria**: Criação de `docs/auditoria-ludica-modulo5-v1.7.7.md` com análise de impacto pedagógico e integridade técnica.
- **Validação de Conformidade**: Verificação de renderização e fluxos E2E para garantir ausência de regressões após a expansão no Catálogo de Ameaças.

## [1.7.6] - 2026-06-16

### Added
- **Expansão Lúdica Módulo 5**: Inserção estratégica de componentes lúdicos no Módulo 5 (Catálogo de Ameaças e Golpes).
- **Alerta de Smishing**: Adicionado bloco "Momento É Golpe!" focado em phishing por SMS (smishing) de taxas de entrega.
- **Dica de Denúncia**: Adicionado bloco "Palavra do Especialista" sobre a importância de denunciar perfis falsos nas plataformas.
- **Transição de Contexto**: Implementada transição lúdica conectando ameaças técnicas (malware) a ameaças de engenharia social.

## [1.7.5] - 2026-06-16

### Added
- **Auditoria Lúdica Módulo 4**: Revisão detalhada da aplicação de componentes lúdicos no Módulo 4.
- **Documentação de Auditoria**: Criação de `docs/auditoria-ludica-modulo4-v1.7.5.md` atestando a coerência pedagógica das inserções sobre QR Code e Cartão Virtual.
- **Validação Técnica**: Confirmação da integridade estrutural e compatibilidade de renderização dos blocos 'scam', 'tip' e 'transition' no Módulo 4.

## [1.7.4] - 2026-06-16

### Added
- **Expansão Lúdica Módulo 4**: Inserção estratégica de componentes lúdicos no Módulo 4 (Transações e Consumo Seguro).
- **Alerta de QR Code**: Adicionado bloco "Momento É Golpe!" sobre riscos de QR Codes estáticos e phishing financeiro.
- **Uso de Cartão Virtual**: Adicionado bloco "Palavra do Especialista" reforçando a importância do uso de cartões virtuais em e-commerce.
- **Transição de Contexto**: Implementada transição lúdica para conectar a teoria de segurança com a prática de aplicativos bancários.

## [1.7.3] - 2026-06-16

### Added
- **Auditoria Lúdica**: Realizada auditoria completa da aplicação de componentes lúdicos nos módulos 1, 2 e 3.
- **Documentação de Auditoria**: Criação de `docs/auditoria-ludica-v1.7.3.md` com análise técnica e pedagógica dos blocos inseridos.
- **Validação de Integridade**: Verificação de renderização, progresso do curso e fluxo de certificação via testes E2E.

## [1.7.2] - 2026-06-16

### Added
- **Expansão Lúdica Controlada**: Inserção estratégica de componentes lúdicos nos módulos 2 e 3 para reforçar mensagens-chave sobre autenticação e dispositivos.
- **Novos Alertas de Golpe**: Adicionado bloco "Momento É Golpe!" no Módulo 2 focado em phishing de códigos SMS.
- **Dicas de Especialista**: Adicionado bloco "Palavra do Especialista" no Módulo 3 sobre a importância do registro do IMEI.
- **Transições de Fluxo**: Implementada transição lúdica no Módulo 3 para marcar a mudança de contexto entre proteção de dispositivos e redes domésticas.

## [1.7.1] - 2026-06-16

### Changed
- **Refinamento de Estilos Lúdicos**: Migração de estilos inline dos componentes `LudicBlocks` e `LudicTransition` para classes CSS dedicadas em `src/index.css`.
- **Acessibilidade Pedagógica**: Revisão da semântica do `ScamAlertBlock`, substituindo `role="alert"` por `role="note"` para evitar poluição em leitores de tela em conteúdos estáticos.
- **Otimização de Assets Decorativos**: Garantia de `aria-hidden="true"` e `focusable="false"` em todos os ícones e avatares decorativos dentro dos blocos lúdicos.

## [1.7.0] - 2026-06-15

### Added
- **Camada Lúdica (Piloto)**: Início da série v1.7 com a introdução de interações lúdicas para engajamento pedagógico.
- **Componentes Lúdicos**: Criação dos componentes reutilizáveis `ScamAlertBlock` (É Golpe!), `SpecialistWordBlock` (Palavra do Especialista) e `LudicTransition`.
- **Transições Pedagógicas**: Implementação de bloco de transição reflexivo aplicado inicialmente de forma piloto no Módulo 1.

### Changed
- **Refatoração UI**: Centralização da renderização de blocos de alerta e dica em componentes React dedicados, melhorando a manutenibilidade e acessibilidade.

## [1.5.8] - 2026-06-13

### Documentation
- Documentada a evolução incremental das videoaulas entre v1.5.2 e v1.5.7.
- Adicionado link no README para a consolidação documental da frente de videoaulas.

## [1.6.14] - 2026-06-15

### Documentation
- **Auditoria Final Pré-Main**: Criação do documento `docs/auditoria-final-v1.6-pre-main.md` atestando a prontidão da branch de integração para merge em `main`.
- **Checklist de Prontidão**: Verificação completa de tags, histórico de commits, validações de CI, builds e testes E2E sem regressões.

## [1.6.13] - 2026-06-15

### Documentation
- **Consolidação Final da Série v1.6**: Criação do documento `docs/consolidacao-serie-v1.6.md` registrando todas as evoluções de UX, conteúdo e integridade técnica realizadas na branch de integração.

## [1.6.12] - 2026-06-15

### Fixed
- **Taxonomia da Biblioteca**: Remoção da categoria redundante "Cartilhas e fascículos" da `libraryCategories` em `src/content/library.js` para alinhar com a taxonomia temática permitida e eliminar warning do validador.

## [1.6.11] - 2026-06-15

### Documentation
- **Consolidação da Biblioteca de Vídeos**: Criação do documento `docs/consolidacao-biblioteca-videos-v1.6.11.md` registrando a arquitetura, modelo de dados, regras de validação e histórico da frente de trabalho (v1.6.6 a v1.6.10).

## [1.6.10] - 2026-06-15

### Changed
- **Refinamento da Biblioteca de Vídeos**: Migração de estilos inline para classes CSS específicas em `src/index.css`.
- **Padronização Editorial**: Implementação de rótulos amigáveis para prioridade e status dos vídeos curados (ex: "Alta prioridade", "Curado").
- **Melhoria de Legibilidade**: Ajustes na hierarquia visual dos cards de vídeos externos, incluindo exibição clara de tópicos e notas editoriais.

## [1.6.9] - 2026-06-15

### Added
- **Interface da Biblioteca de Vídeos**: Renderização da `videoLibrary` curada na área transversal de vídeos.
- **Seção de Curadoria Especial**: Adição de um novo bloco visual para exibir vídeos externos com metadados detalhados (idioma, tópicos, prioridade).
- **Integração de Busca**: Os vídeos curados respondem aos mesmos filtros de busca, fonte e módulo da seção de vídeos original.

## [1.6.8] - 2026-06-15

### Added
- **Validação da Biblioteca de Vídeos**: Integração da `videoLibrary` ao script `scripts/validateContent.js`.
- **Regras de Integridade**: Validação de schema (ids únicos, campos obrigatórios, formatos de URL e valores controlados para prioridade, status e plataforma).

## [1.6.7] - 2026-06-15

### Added
- **Modelo de Dados da Biblioteca de Vídeos**: Criação da estrutura inicial `src/content/videoLibrary.js` para suportar a curadoria de vídeos educativos (Issue #63).
- **Curadoria Inicial**: Cadastro dos primeiros vídeos da FEBRABAN, INTERPOL e MJSP com metadados estruturados (id, provider, modules, topics, etc).

## [1.6.5] - 2026-06-15

### Changed
- **Melhorias de Navegação e UX**: Destaque visual do módulo ativo na sidebar para melhor orientação espacial.
- **Orientação de Etapa**: Inclusão do indicador "Tela X de Y" em todas as telas de conteúdo dos módulos.
- **Painéis de Status em Tempo Real**: Implementação de painéis visuais discretos para acompanhamento do progresso em quizzes de módulos e na avaliação final integradora.
- **Destaque de Avaliação Final**: Identidade visual solene e feedback de aprovação imediato para a etapa integradora e certificação.
- **Redução de Densidade Visual**: Compactação moderada das áreas transversais (Glossário, Biblioteca, Vídeos, Checklists e Simulações) para otimizar o uso do espaço e o scroll.

### Fixed
- **Consistência Visual**: Correção de variável CSS órfã e padronização de rótulos de navegação final ("Ir para a revisão final").

## [1.5.0] - 2026-06-12

### Added
- **Avatares Radar e Siga**: Implementação de personagens conceituais para guiar o aprendizado.
- **Glossário Pesquisável**: Nova seção transversal com termos essenciais sobre segurança digital.
- **Biblioteca de Documentos Públicos**: Acervo de cartilhas, guias e planos de ação governamentais.
- **Vídeos Educativos**: Área dedicada a campanhas e orientações audiovisuais oficiais.
- **Checklists Interativos**: Guias de ação rápida para situações críticas (ex: celular furtado, antes do Pix).
- **Simulações Rápidas**: Treinamento prático de tomada de decisão simulando tentativas de golpes.

### Changed
- **Refinamento Visual**: Padronização de cards, grids, metadados e microinterações nas áreas de recursos.
- **Microinterações Lúdicas**: Efeitos sutis de foco e hover, respeitando preferências de movimento reduzido.

### Fixed
- **Acessibilidade**: Correção abrangente de atributos ARIA, uso intensivo de HTML semântico (listas, navegação), labels descritivos para leitores de tela e ocultação de ícones puramente decorativos em toda a aplicação.

### Security / Maintenance
- Consolidada a release garantindo nenhuma regressão no fluxo de progresso (localStorage intocado), sem novas dependências e fluxo de certificação íntegro.
