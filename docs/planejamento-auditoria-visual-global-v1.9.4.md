# Planejamento da Auditoria Visual Global — v1.9.4

## 1. Introdução
Encerrando o planejamento estrutural da fase transversal (série v1.9.x), este documento define o escopo e os critérios para uma "Auditoria Visual Global". O objetivo é garantir que a interface do curso Cidadão Digital Seguro — especialmente suas áreas transversais (Glossário, Biblioteca, Vídeos, Checklists e Simulações Rápidas) — mantenha um alto padrão de consistência estética, responsividade e acessibilidade.

## 2. Escopo do Diagnóstico

A interface atual, regida por `src/index.css` e padronizada através do `App.jsx`, será avaliada em cinco eixos principais:

### 2.1 Consistência Tipográfica e Espaçamento
- **Tipografia**: Validar o uso da escala de fontes (atualmente mista entre `rem` e `px`) para garantir hierarquia clara entre `h1`, `h2`, `h3`, `body` e `mini-muted`.
- **Espaçamento (Vertical Rhythm)**: Checar se o uso de containers como `.stack-lg` (32px), `.stack-md` (20px) e `.stack-sm` (12px) está sendo aplicado uniformemente em todas as telas transversais, evitando áreas excessivamente densas ou vazias.

### 2.2 Componentes e Padrões UI
- **Botões e Ações**: Avaliar o contraste e o feedback visual (hover/active/disabled) de `.button` e `.button-outline`.
- **Cards e Boxes**: Padronizar a aparência de `.info-box`, `.resource-card` e `.link-card`, garantindo que sombras (`box-shadow`), bordas e paddings transmitam adequadamente a interatividade e a hierarquia da informação.
- **Badges e Tags**: Revisar o contraste de cores em elementos menores (ex: `.tag`, `.resource-meta-chip`, `.quiz-status-label`), principalmente quando usam cores semânticas (sucesso, aviso, erro).

### 2.3 Responsividade
- **Breakpoints**: Avaliar o comportamento da interface nos pontos de quebra atuais (`1024px` e `768px`).
- **Navegação Mobile**: Garantir que a barra superior (`.topbar`) e as áreas de ações não quebrem o layout em telas estreitas (abaixo de 360px).
- **Grids Transversais**: Checar se `.resource-grid`, `.grid-2` e `.grid-3` empilham graciosamente no celular, sem exigir rolagem horizontal.

### 2.4 Acessibilidade (WCAG)
- **Contraste de Cor**: Analisar a paleta de cores (ex: `--text-muted` #64748b sobre fundos claros) para conformidade com WCAG AA.
- **Navegação por Teclado**: Confirmar que o estado `:focus-visible` (outline azul de 3px) é acionado corretamente em todos os elementos interativos, incluindo abas e *chips* de filtro.
- **Semântica ARIA**: Garantir que todos os ícones decorativos mantenham `aria-hidden="true"` e campos de formulário possuam labels adequados.
- **Reduced Motion**: Validar que as microinterações lúdicas introduzidas recentemente mantêm o respeito integral a preferências de sistema.

## 3. Planejamento de Implementação (Frente Futura)

Caso a auditoria futura detecte desvios, as correções deverão seguir as regras da arquitetura atual:
1.  **CSS Puro**: Ajustes estéticos devem ser resolvidos via atualização das variáveis em `:root` ou ajustes em `src/index.css`.
2.  **Não-Destrutivo**: Qualquer alteração não pode quebrar o layout da trilha de módulos principal, que já foi extensivamente validada.
3.  **Zero Dependências**: Proibida a introdução de novos frameworks de UI (ex: Tailwind, Material UI).

## 4. Conclusão da Série de Planejamento (v1.9.x)

Com o mapeamento das ferramentas transversais concluído (Glossário na v1.9.1, Biblioteca na v1.9.2, Simulações na v1.9.3 e Auditoria Visual Global na v1.9.4), o projeto encerra a fase de diagnóstico. 

**Recomendação para v1.9.5**: Consolidar os quatro relatórios de planejamento e iniciar a **Fase de Implementação** (Série v2.0.x), priorizando a codificação das melhorias no Glossário e Biblioteca, conforme prioridade estabelecida na v1.9.0.

---
Planejamento registrado em 17/06/2026.
