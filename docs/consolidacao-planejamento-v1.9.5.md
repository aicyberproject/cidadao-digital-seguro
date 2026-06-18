# Consolidação do Planejamento (Fase Transversal) — v1.9.5

## 1. Introdução
Este documento consolida os achados e diagnósticos realizados ao longo da série v1.9.x (planejamento estratégico das ferramentas transversais). O objetivo é transformar essas análises em um *Roadmap de Implementação* claro, seguro e estruturado para a futura série **v2.0.x**.

## 2. Síntese dos Diagnósticos (v1.9.1 a v1.9.4)

### 2.1 Glossário (v1.9.1)
- **Achados**: A estrutura atende bem, mas falta profundidade tangível e destaque para conceitos essenciais.
- **Solução Planejada**: Adicionar `example` e `priority` ao schema JSON/JS. Converter o texto indicativo do módulo em um *badge* visual (tag) e integrar a nova estrutura de dados no mecanismo de busca textual.

### 2.2 Biblioteca / Documentos Públicos (v1.9.2)
- **Achados**: Acervo de alta qualidade (CERT.br, FEBRABAN), porém com dados em strings não estruturadas que dificultam filtros complexos.
- **Solução Planejada**: Converter `relatedModule` para arrays e adicionar `tags` aos fascículos. Implementar filtros cruzados (Módulo + Tipo) para unificar a apresentação de documentos e vídeos.

### 2.3 Simulações Rápidas (v1.9.3)
- **Achados**: Ótimo microlearning, mas o feedback pode ser mais imersivo e as temáticas podem cobrir melhor os novos conceitos lúdicos.
- **Solução Planejada**: Refinar os cenários atuais, criar cenários específicos para Falsa Central, QR Code Estático e Preservação de Evidências. Incorporar as linguagens "Momento É Golpe!" e "Palavra do Especialista" diretamente nos blocos de feedback de erro e acerto.

### 2.4 Auditoria Visual Global (v1.9.4)
- **Achados**: A base CSS é sólida, mas há pequenas dívidas de consistência no ritmo vertical e hierarquia de responsividade das áreas transversais.
- **Solução Planejada**: Revisar e consolidar propriedades em `src/index.css` (sem frameworks externos). Garantir consistência nas classes `.stack-*`, padding em modais/cards, e acessibilidade ARIA e foco de navegação por teclado.

## 3. Diretrizes de Implementação

A fase de implementação deve respeitar estritamente a separação de responsabilidades para evitar quebras no curso.

- **Camada de Schema (Dados)**: Atualizar `src/content/*.js` com cuidado, adicionando campos sem quebrar compatibilidade retroativa onde a UI espera strings.
- **Camada de UI (React)**: Alterar `src/App.jsx` apenas nos escopos dos componentes transversais (`currentView === 'glossary'`, `currentView === 'library'`, etc.), sem tocar no `currentView === 'module'`.
- **Camada Visual (CSS)**: Trabalhar exclusivamente em `src/index.css`.
- **Camada de Teste**: Manter o `npm run validate:content` para validar os novos schemas e usar testes de regressão E2E para assegurar navegação e certificação.

## 4. Riscos Técnicos da Implementação
- **Refatoração de Schema**: O `validateContent.js` precisará ser atualizado juntamente com os dados (`library.js`, `glossary.js`) para evitar que a validação de build falhe no CI.
- **Filtros Complexos**: A combinação de múltiplos arrays de tags pode pesar se não for bem mapeada em memória (embora o volume atual seja baixo o suficiente para iteração nativa rápida do JS).

## 5. Roadmap Sugerido para Série v2.0.x

Para minimizar o risco e manter o padrão de entregas incrementais e controladas, a série `v2.0.x` seguirá esta ordem:

- **v2.0.0**: Implementação inicial do Glossário aprimorado (Schema + UI).
- **v2.0.1**: Refatoração da Biblioteca / Documentos com `tags` e `módulos` em array (Schema + UI).
- **v2.0.2**: Refinamento das Simulações Rápidas (Integração Lúdica + Novos Cenários).
- **v2.0.3**: Auditoria Visual Global aplicada (Ajustes de CSS Puro, Contrastes, Foco e Grids).
- **v2.0.4**: Auditoria final da fase transversal (Saneamento Documental e Encerramento da v2.0).

---
Consolidação registrada em 17/06/2026.
