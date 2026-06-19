# Auditoria e Refinamento de Acessibilidade, Responsividade e Usabilidade — v2.8.0

Este documento apresenta o diagnóstico e os refinamentos implementados na branch `v2.8.0-a11y-responsividade-usabilidade` do projeto **Cidadão Digital Seguro**. As alterações visam aprimorar a usabilidade geral da aplicação, otimizar a experiência mobile e garantir total conformidade com diretrizes essenciais de acessibilidade (WCAG 2.1).

## 1. Grid de Filtros de Coleções Transversais

### Diagnóstico
* O seletor `.library-filter-grid` (utilizado nas abas de Biblioteca, Vídeos, Checklists e Simulações Rápidas) estava definido apenas dentro de uma media query para telas pequenas (`@media (max-width: 768px)`).
* Isso causava ausência de estilo de grid em telas desktop, resultando em desalinhamentos visuais.

### Resolução
* Definição base adicionada para `.library-filter-grid` fora de media queries em `src/index.css`:
  ```css
  .library-filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  ```
* Essa estrutura de auto-fit garante que as colunas ocupem o espaço proporcionalmente no desktop (4 colunas na Biblioteca, 3 em Vídeos, 2 em Checklists/Simulações) e quebrem de forma fluida em telas médias.
* Preservada a regra de colunas únicas em dispositivos móveis (`grid-template-columns: 1fr;` abaixo de 768px).

---

## 2. Foco Visível e Acessibilidade por Teclado

### Diagnóstico
* Os elementos interativos como `.module-chip` (botões da trilha), `.link-card` (âncoras de materiais externos), `.check-row` (checkboxes de atividades) e `.radio-row` (alternativas dos quizzes) careciam de destaque visual inequívoco quando focados por teclado, dependendo do contorno nativo do navegador, que é pouco perceptível ou inconsistente em certos agentes de usuário.

### Resolução
* Ampliação das regras de destaque de foco no arquivo `src/index.css`:
  ```css
  .button:focus-visible,
  .text-input:focus-visible,
  .filter-chip:focus-visible,
  .checklist-item-row:focus-within,
  .check-row:focus-within,
  .radio-row:focus-within,
  .module-chip:focus-visible,
  .link-card:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }
  ```
* Garante excelente contraste e destaque nos itens da trilha de aprendizagem, cartões de links externos e alternativas de quizzes quando o participante navega utilizando `Tab`.

---

## 3. Marcação de Estado Ativo na Navegação Transversal

### Diagnóstico
* Os botões na barra de topo (`.top-actions`) que mudam a aba visualizada (Início, Glossário, Biblioteca, Vídeos, Checklists, Simulações) não possuíam sinalização visual distintiva de qual visualização estava ativa, nem informavam essa condição a leitores de tela.

### Resolução
* Adicionado o atributo `aria-current="page"` dinamicamente para a aba ativa.
* Adicionado o sufixo de classe `active` para o botão correspondente à visualização ativa em `src/App.jsx`.
* Estilizada a classe `.button-outline.active` em `src/index.css`:
  ```css
  .button-outline.active {
    background: var(--primary-light);
    border-color: var(--primary);
    color: var(--primary);
  }
  ```

---

## 4. Correção de Sobrescrita de Nome Acessível em Simulações

### Diagnóstico
* As opções interativas de decisão nas Simulações Rápidas (`src/App.jsx`) possuíam o atributo `aria-labelledby={`label-options-${sim.id}`}`.
* Esse atributo apontava para o cabeçalho "O que você faria?", fazendo com que leitores de tela ignorassem completamente o texto de cada alternativa (ex: "Entrar em contato pelo número indicado", "Desconfiar e ligar para o canal oficial") e lessem apenas "O que você faria?" repetidamente para todas as opções da simulação.

### Resolução
* Remoção completa do atributo redundante `aria-labelledby` dos botões de opção.
* O contêiner pai `<nav>` já possui `aria-label={`Opções de resposta para: ${sim.title}`}` para dar o contexto geral, e os botões agora expõem corretamente o seu próprio texto de alternativa como nome acessível para leitores de tela.

---

## 5. Eliminação de Ruído em Leitores de Tela

### Diagnóstico
* O ícone Lucide `<ExternalLink />` renderizado nos cartões de links transversais em `src/App.jsx` não continha atributos de ocultação para leitores de tela.

### Resolução
* Inserção dos atributos `aria-hidden="true" focusable="false"` para evitar a leitura desnecessária do SVG e prevenir focagem fantasma em navegadores antigos.

---

## 6. Resultados de Validação

* Execução de `npm run validate:content`: **Aprovado** (nenhum erro ou warning).
* Execução de `npm run build` (geração de bundle de produção Vite): **Aprovado**.
* Execução de `npm run test:e2e` (Playwright E2E total course flow): **Aprovado** (todas as etapas de progressão, quizzes e certificação funcionando perfeitamente).
