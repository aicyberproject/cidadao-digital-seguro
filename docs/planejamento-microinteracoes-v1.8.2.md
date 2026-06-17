# Planejamento de Microinterações Lúdicas — Série v1.8.x

## 1. Introdução
Este documento define as diretrizes técnicas e pedagógicas para a implementação de microinterações visuais na camada lúdica do curso Cidadão Digital Seguro. O objetivo é polir a experiência do usuário, tornando a transição entre conteúdos mais fluida e destacando pontos de atenção sem causar distração ou comprometer a acessibilidade.

## 2. Diretrizes Gerais

As futuras implementações devem seguir rigorosamente os seguintes princípios:

- **Animações Suaves**: Utilizar durações curtas (200ms a 500ms) e curvas de aceleração naturais (ease-out).
- **Respeito ao Usuário**: Obrigatoriedade de suporte a `prefers-reduced-motion`. Usuários com essa preferência ativa devem ver os blocos sem animações de movimento.
- **Foco Pedagógico**: As animações devem servir para atrair o olhar para o bloco lúdico no momento em que ele surge na tela, não para entreter de forma vazia.
- **Ausência de Bloqueio**: Nenhuma animação deve impedir a navegação, o clique em botões ou a rolagem da página.
- **Performance**: Manter o impacto de processamento mínimo, priorizando propriedades CSS otimizadas (transform e opacity).
- **Acessibilidade**: Garantir que o estado final da animação mantenha a legibilidade e o contraste validados na série v1.7.x.

## 3. Escopo de Aplicação

As microinterações focarão exclusivamente nos componentes de `src/components/LudicBlocks.jsx`:

1.  **ScamAlertBlock (É Golpe!)**: Entrada sutil com leve deslocamento vertical e fade-in.
2.  **SpecialistWordBlock (Dica de Especialista)**: Entrada suave para destacar a autoridade da informação.
3.  **LudicTransition**: Transição de tela ou de bloco que marque claramente a mudança de contexto pedagógico.

## 4. Avaliação Técnica: CSS vs Framer Motion

Embora o projeto já possua `framer-motion` como dependência, a estratégia recomendada é:

- **Preferência Inicial por CSS**: Para animações de entrada simples (fade-in, slide-up), o CSS puro é mais performático e fácil de manter.
- **Uso de Framer Motion**: Reservado apenas para interações complexas que exijam orquestração de saída (`AnimatePresence`) ou estados compartilhados entre componentes que o CSS puro não resolva de forma elegante.
- **Padronização**: Independentemente da tecnologia, as variáveis de tempo e curvas devem ser centralizadas em `src/index.css` ou em um objeto de configuração.

## 5. Estratégia Incremental para v1.8.3

Para a próxima versão (v1.8.3), recomenda-se:

1.  **Fase 1**: Definição de classes CSS de animação base no `src/index.css`.
2.  **Fase 2**: Aplicação experimental apenas no `LudicTransition` para validar o "ritmo" da mudança de tela.
3.  **Fase 3**: Expansão para `ScamAlertBlock` e `SpecialistWordBlock` após validação visual.

## 6. Riscos e Mitigação

- **Risco**: Excesso de movimento causando fadiga visual.
    - **Mitigação**: Testes de QA focados em "ritmo didático" e cumprimento estrito do `prefers-reduced-motion`.
- **Risco**: Regressão de performance em dispositivos de baixo custo.
    - **Mitigação**: Uso exclusivo de propriedades que não provocam reflow (layout) da página.

---
Auditoria e planejamento registrados em 16/06/2026.
