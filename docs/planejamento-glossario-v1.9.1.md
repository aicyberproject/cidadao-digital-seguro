# Diagnóstico e Planejamento do Glossário — v1.9.1

## 1. Introdução
Como primeira etapa da fase de ferramentas transversais (série v1.9.x), este documento mapeia a estrutura atual do Glossário, diagnostica oportunidades de melhoria e estabelece um planejamento estruturado para sua evolução. O foco é transformar o glossário de um simples dicionário para uma ferramenta ativa de consulta e reforço pedagógico.

## 2. Diagnóstico do Estado Atual

A arquitetura de dados atual em `src/content/glossary.js` é sólida e conta com 27 termos divididos em 6 categorias. 

### 2.1 O que funciona bem:
- **Modelo de Dados**: Os campos `term`, `category`, `module`, `definition` e `guidance` cobrem bem a teoria e a prática.
- **Renderização**: A UI já exibe a propriedade `guidance` utilizando a classe `.ludic-box.expert`, que cria uma coesão visual com a "Palavra do Especialista".
- **Filtros Iniciais**: A lógica de busca textual (`glossaryQuery`) e o filtro por categoria (`selectedGlossaryCategory`) via *chips* já existem e são funcionais.

### 2.2 Oportunidades de Melhoria (Lacunas):
- **Exemplos Práticos**: A propriedade `guidance` fornece uma diretriz de conduta (ex: "Não clique em links"), mas falta um campo explícito de `example` (ex: "Um SMS dizendo que sua conta foi bloqueada com um link encurtado") para facilitar o reconhecimento visual de uma ameaça.
- **Relação com Módulos**: O campo `module` é renderizado como texto, mas poderia funcionar como uma etiqueta (badge) ou até um atalho para revisar a lição, integrando o glossário ao fluxo de estudo.
- **Nomenclaturas de Categorias**: As 6 categorias atuais ("Golpes e fraudes digitais", "Autenticação e contas", etc.) são pertinentes, mas podem ser avaliadas quanto à sua concisão em telas pequenas (mobile).
- **Termos Prioritários**: Não há uma indicação visual ou ordenação que destaque os termos mais procurados ou críticos do curso (ex: *Phishing*, *Engenharia Social*, *Autenticação em Duas Etapas*).

## 3. Planejamento de Implementação (Futura)

Para materializar as melhorias identificadas, sem quebrar a estabilidade da aplicação, planeja-se a seguinte abordagem para quando a frente de desenvolvimento for acionada:

### A) Evolução do Schema de Dados (`src/content/glossary.js`)
1. **Adição do campo `example` (Opcional)**: Inserir em termos complexos para tangibilizar o conceito (ex: *Phishing*, *Smishing*, *Ransomware*).
2. **Adição do campo `priority` (Booleano)**: Sinalizar termos cruciais que devem aparecer no topo ou receber um destaque visual ("Termo Essencial").

### B) Refinamento da UI/UX (`src/App.jsx`)
1. **Destaque Visual para Módulos**: Transformar o texto do campo `module` (ex: "Módulo 5") em um badge (etiqueta) visual usando as classes do próprio projeto.
2. **Integração de Exemplos**: Criar uma área sutil (como um texto em itálico ou um card aninhado) para exibir o campo `example` abaixo da `definition`.
3. **Busca Aprimorada**: Garantir que a busca textual englobe não apenas o `term`, mas também a `definition` e os novos `examples`.

## 4. Próximos Passos
Esta frente v1.9.1 é estritamente documental. A aprovação deste planejamento servirá como base para as futuras frentes de código.

**Recomendação para v1.9.2**: Avançar para o diagnóstico e planejamento específico da **Biblioteca / Documentos públicos**, mantendo o padrão metodológico de avaliar antes de codificar.

---
Planejamento registrado em 17/06/2026.
