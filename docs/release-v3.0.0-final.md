# Notas da Release Final: v3.0.0

**Data:** 23 de Junho de 2026

Este documento registra a homologação manual final, a conclusão do ciclo de testes e a publicação formal da versão **v3.0.0** (final) do curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**.

---

## 1. Homologação Manual Final da Publicação

A homologação foi realizada acessando a URL pública oficial do projeto em aba anônima:
👉 [https://aicyberproject.github.io/cidadao-digital-seguro/](https://aicyberproject.github.io/cidadao-digital-seguro/)

Os seguintes critérios de aceitação foram integralmente verificados e aprovados:

1. **Página Inicial:** A aplicação React/Vite carrega de forma instantânea, sem telas em branco, com carregamento correto dos assets compilados e da estilização global.
2. **Menu e Abas Principais:** A alternância de abas da barra de navegação funciona corretamente, preservando o estado de navegação e aplicando a sinalização de estado ativo por teclado/CSS sem erros.
3. **Áreas Auxiliares Transversais:** As seções de Biblioteca, Vídeos, Checklists e Simulações Rápidas abrem normalmente, executando os devidos cruzamentos de filtros e busca textual.
4. **Links Saneados:**
   - **FEBRABAN (Portal Anti-Fraude):** Redireciona corretamente para a página ativa [https://portal.febraban.org.br/AntiFraude/](https://portal.febraban.org.br/AntiFraude/).
   - **Celular Seguro:** Aponta para o portal de serviço direto do Governo Federal [https://celularseguro.mj.gov.br/](https://celularseguro.mj.gov.br/).
   - **Cidadão na Rede (NIC.br):** Direciona para o repositório de vídeos curtos educativos [https://cidadaonarede.nic.br/](https://cidadaonarede.nic.br/).
5. **Certificação de Teste:** O fluxo completo do curso até a etapa de conclusão foi validado por meio da suíte de testes de ponta a ponta (E2E) com Playwright. A versão do projeto no certificado digital gerado em PDF reflete a versão correspondente sob o código verificador oficial.

---

## 2. Escopo da Versão Final (v3.0.0)

A v3.0.0 consolida a entrega definitiva da matriz curricular e do ecossistema de apoio digital. De acordo com as diretrizes do repositório, esta versão final:
* **Promove** a versão homologada `v3.0.0-rc.2` sem introduzir alterações funcionais, novas funcionalidades ou redesign.
* **Preserva** intacto o conteúdo de `src/App.jsx` e `src/index.css`.
* **Mantém** o banco amplo de questões pedagógicas de apoio a cada módulo, sem redução de quizzes ou alterações conceituais da matriz vigente.

---

## 3. Resultados da Validação Automatizada

Antes da publicação, a suite de testes foi executada localmente através de `npm run check` com sucesso absoluto:
* **Validação de Conteúdo (`validateContent.js`):** 0 erros, 0 warnings.
* **Build de Produção (`vite build`):** Compilação bem-sucedida de todos os assets.
* **Testes de Fluxo E2E (`playwright test`):** Aprovados com 100% de sucesso.
