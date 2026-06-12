# Release Notes: v1.5.0

**Data:** 12 de Junho de 2026

## Objetivo da Release
A versão 1.5.0 (originada pela série de frentes v1.4.x) consolida uma robusta expansão das ferramentas de apoio e consulta ao cidadão dentro da plataforma Cidadão Digital Seguro. O foco principal foi criar áreas auxiliares transversais que funcionam de forma independente da progressão obrigatória dos módulos, fornecendo valor imediato, simulações práticas e acesso rápido a fontes oficiais.

## Resumo das Frentes Implementadas
- **Personagens Lúdicos (Radar e Siga)**: Avatares que guiam o aluno com dicas preventivas e alertas de risco.
- **Seções de Recursos Transversais**: 
  - Glossário Pesquisável
  - Biblioteca de Documentos Públicos (com filtros dinâmicos)
  - Vídeos Educativos Institucionais
- **Ferramentas de Orientação Direta**:
  - Checklists Interativos para situações de crise.
  - Simulações Rápidas de identificação de golpes.
- **Revisão Visual e Acessibilidade**:
  - Unificação de CSS para cards e grids de recursos.
  - Varredura exaustiva de acessibilidade (ARIA, foco via teclado, leitores de tela).

## Validações e Critérios de Não Regressão
- A lógica de `localStorage` (`cidadao-digital-seguro-progress-v2`) permanece **inalterada**.
- O fluxo de certificação final não sofreu modificações.
- As validações de conteúdo pedagógico e E2E (`npm run check`) passaram com sucesso.
- Nenhuma dependência externa foi adicionada ao `package.json`.

## Pendências Conhecidas (Editoriais)
- **Vídeos "Em preparação"**: Os vídeos da Polícia Federal ("Engenharia Social: O Fator Humano" e "Resposta a Incidentes Digitais") ainda aguardam as URLs públicas oficiais. A UI exibe corretamente o estado desabilitado.
- **Revisão de Links**: Recomenda-se revisão trimestral das URLs governamentais na biblioteca (ex: links da cartilha CERT.br) para assegurar que não foram alteradas pela fonte.
