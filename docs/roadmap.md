# Roadmap

Este roadmap reúne pendências técnicas, editoriais e operacionais já identificadas para evolução do curso.

A rodada v3.1.0 resolveu ou reavaliou as pendências de materiais complementares, certificado, acessibilidade, revisão responsiva mobile e verificador público. O detalhamento está em [Auditoria e Resolução de Pendências do Roadmap — v3.1.0](auditoria-pendencias-roadmap-v3.1.0.md).

## Pendências

1. Videoaulas finais

   Produzir, revisar e integrar as videoaulas definitivas de todos os módulos, substituindo textos ou placeholders de preparação quando existirem. Inclui os dois vídeos institucionais da Polícia Federal registrados como "Em preparação" em `src/content/videos.js`.

2. Reverificação periódica de links externos

   A verificação estrutural das URLs foi automatizada em `npm run validate:content` (https obrigatório, formato válido, alerta de parâmetros de rastreamento). A verificação de disponibilidade em tempo real deve ser reexecutada periodicamente a partir de ambiente com saída de rede aberta, como feito na homologação da v3.0.0-rc.1.

3. Validação institucional

   Submeter conteúdo, linguagem, fontes, orientações preventivas e fluxos de resposta a uma revisão institucional final.

4. Eventual backend/verificador público de certificado

   Condicionado à definição de um órgão emissor institucional. Os requisitos (registro de emissões, LGPD, consulta pública por código) foram mapeados na seção 5 da auditoria v3.1.0. A versão atual gera código local sem validação remota, com declaração explícita no PDF.

5. Manutenção futura

   Avaliar remoção de código morto (`src/App.backup.jsx` e `src/content/officialLinks.js`).

## Resolvidas na v3.1.0

- Revisão de materiais complementares: saneamento de parâmetros de rastreamento, validação automatizada de URLs e registro formal dos itens em preparação.
- Revisão final do certificado e versão: nome completo do curso no PDF, dados da tela unificados com as constantes do PDF, versão visível na emissão, tratamento de nomes longos.
- Acessibilidade: skip link, landmarks semânticos (`header`, `nav`, `aside` rotulada) e teste automatizado de navegação por teclado.
- Revisão responsiva mobile: três defeitos reais corrigidos (estouros horizontais na Biblioteca e Simulações; bloqueio do fluxo em telas de links) e jornada completa passando em viewport Pixel 7, com suíte E2E mobile permanente.

## Critérios para priorização

Priorize mudanças que:

- reduzam risco de orientação incorreta;
- aumentem clareza para público leigo;
- preservem linguagem institucional e não alarmista;
- melhorem confiabilidade do fluxo principal;
- tenham validação por `npm run check`;
- mantenham escopo pequeno e revisável por Pull Request.
