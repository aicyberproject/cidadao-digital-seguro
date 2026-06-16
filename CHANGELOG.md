# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.8] - 2026-06-13

### Documentation
- Documentada a evolução incremental das videoaulas entre v1.5.2 e v1.5.7.
- Adicionado link no README para a consolidação documental da frente de videoaulas.

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
