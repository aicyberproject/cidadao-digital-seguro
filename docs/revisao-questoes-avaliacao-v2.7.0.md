# Revisão do Banco de Questões e Avaliação Final — v2.7.0

## 1. Resumo Executivo
Este documento consolida o diagnóstico, a auditoria e as correções implementadas no banco de questões e na avaliação final integradora na versão **v2.7.0** do curso **Cidadão Digital Seguro**. O objetivo desta revisão foi refinar as formulações das questões sob a perspectiva da linguagem cidadã e alinhar estritamente os termos técnicos e práticos com a revisão pedagógica v2.6.0 (especialmente a transição terminológica de "provas" para "evidências digitais" dirigidas ao cidadão).

---

## 2. Diagnóstico do Acervo Avaliativo

O ecossistema avaliativo do curso é composto por:
* **Banco de Questões por Módulo (`src/content/questionBank/`)**: 6 arquivos com 30 questões cada (total de 180 questões). O curso realiza o sorteio de `10 questões` por quiz por meio de `quizSize: 10`.
* **Avaliação Final (`src/content/finalAssessment.js`)**: Um exame integrador estático contendo 18 questões de múltipla escolha com 4 alternativas cada.

### 2.1 Coerência por Módulo e Alinhamento Curricular
* **Módulo 1 (30 questões)**: Foco em responsabilidade compartilhada, papéis da Polícia Federal, Ministério da Justiça e FEBRABAN, distinção de fraude/golpe e sinais clássicos de urgência. As questões estão didaticamente perfeitamente alinhadas com as lições do módulo.
* **Módulo 2 (30 questões)**: Questões cobrem senhas fortes e únicas, gerenciadores de senhas, verificação em duas etapas, e-mail como conta-mestra, estratégias de backup resiliente contra ransomware e minimização de dados expostos.
* **Módulo 3 (30 questões)**: Questões abordam bloqueio de tela, biometria, chip SIM/PIN, IMEI, aplicativos de lojas oficiais, atualizações, roteadores, Wi-Fi público e redes domésticas WPA3.
* **Módulo 4 (30 questões)**: Foco em transações financeiras, Pix, boletos falsos, QR Codes estáticos, segurança em marketplaces e cartões virtuais.
* **Módulo 5 (30 questões)**: Cobre Phishing/Smishing/Vishing, malware, ransomware, boatos, deepfakes e vazamento de dados.
* **Módulo 6 (30 questões)**: Concentra-se no plano de resposta rápida a incidentes (contenção, preservação de evidências, acionamento de canais e registro de ocorrência).

---

## 3. Auditoria e Correção de Ocorrências de "Prova/Provas"

Seguindo as diretrizes estabelecidas na v2.6.0, as questões de avaliação foram revisadas para adotar a terminologia "evidência/evidências digitais" quando direcionadas às condutas do cidadão (evitando o jargão judicial estrito "provas" para as primeiras ações informais de captação de telas ou mensagens).

### 3.1 Substituições Efetuadas em `src/content/questionBank/module6Questions.js`

1. **Questão de Fixação da Dica do Especialista (Linha 83)**:
   * *Atual*: `Conforme a dica "Não Apague as Provas", qual conduta emocional deve ser evitada imediatamente após um golpe?`
   * *Correção*: `Conforme a dica "Não Apague as Evidências", qual conduta emocional deve ser evitada imediatamente após um golpe?`
   * *Motivação*: Sincronizar o enunciado da questão com a dica prática revisada e reescrita na lição 3 do Módulo 6.

2. **Alternativa de Distração na Questão de Contenção (Linha 178)**:
   * *Atual*: `'Permitir que o suspeito conclua a transação para gerar mais provas.'`
   * *Correção*: `'Permitir que o suspeito conclua a transação para gerar mais evidências.'`
   * *Motivação*: Evitar incoerência terminológica nas respostas falsas da avaliação.

### 3.2 Ocorrências Preservadas por Legitimidade
* **[module1Questions.js:L260](file:///C:/Users/steniosantos.sss/cidadao-digital-seguro/src/content/questionBank/module1Questions.js#L260)**: `question: 'Por que “contato recebido não prova identidade” é uma regra importante?',` — Mantida por se tratar do uso do verbo "provar" no sentido de comprovação lógica de identidade no cotidiano, sem conotação jurídica de prova material.

---

## 4. Coerência da Linguagem Cidadã e Qualidade Pedagógica
* **Ausência de Pegadinhas**: As alternativas incorretas são verossímeis, mas claramente descartáveis com base nos princípios ensinados, sem o uso de pegadinhas baseadas em sutilezas de texto ou jogos de palavras.
* **Resposta Correta Inequívoca**: Todas as 198 questões (180 nos quizzes + 18 na avaliação final) possuem exatamente uma alternativa com `isCorrect` ou indicada em `answer` correta e inquestionável.
* **Clareza de Opções**: Evitou-se o uso de termos excessivamente complexos nas alternativas corretas, favorecendo comportamentos objetivos (ex: "encerrar o contato", "digitar o endereço oficial no navegador").

---

## 5. Garantia de Estabilidade e Não-Regressão
Com o intuito de preservar a estabilidade da aplicação, as seguintes restrições do escopo de trabalho foram rigorosamente cumpridas:
* **Sem alterações curriculares**: As lições e os textos explicativos dos 6 módulos principais mantiveram-se intocados.
* **Sem alterações no front-end**: Nenhum componente React ou arquivo visual (`src/App.jsx`) foi modificado.
* **Sem alterações de estilo**: O arquivo `src/index.css` e estilos do layout não sofreram toques.
* **Sem alterações na persistência e lógica de aprovação**: As chaves do `localStorage` e a lógica de verificação de aprovação e emissão de certificado não foram modificadas.
* **Infraestrutura**: Workflows do GitHub Actions e dependências de pacotes não foram alterados.

---

## 6. Homologação Pedagógica Final
Com as alterações efetuadas em v2.7.0, a suite de testes E2E e validação automática confirma que:
1. O banco de questões mantém seu tamanho exato (30 questões por módulo, 18 na avaliação final).
2. Não existem quebras de carregamento estático do Vite nem erros no bundle de produção.
3. O fluxo completo da trilha avaliativa do aluno continua íntegro e operacional.
