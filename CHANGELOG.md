# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
