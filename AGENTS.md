# AGENTS.md — Regras para agentes no repositório

Este repositório contém a aplicação web do curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**.

## Estrutura relevante

```text
src/
├── App.jsx
├── index.css
├── main.jsx
└── content/
    ├── courseIntro.js
    ├── officialLinks.js
    ├── finalAssessment.js
    └── modules/
        ├── index.js
        ├── module1.js
        ├── module2.js
        ├── module3.js
        ├── module4.js
        ├── module5.js
        └── module6.js

src/content/questionBank/
├── index.js
├── module1Questions.js
├── module2Questions.js
├── module3Questions.js
├── module4Questions.js
├── module5Questions.js
└── module6Questions.js
```

## Regra central

Agentes devem fazer alterações pequenas, revisáveis e vinculadas a uma issue.

## Escopo curricular oficial

A matriz curricular vigente do curso é:

1. Ecossistema de Segurança Digital
2. Pilares da Higiene Digital
3. Proteção de Dispositivos e Redes
4. Transações e Consumo Seguro
5. Catálogo de Ameaças e Golpes
6. Resposta a Incidentes e Denúncia

Não alterar essa matriz sem autorização expressa.

Este repositório não deve ser misturado com o **Projeto EaD CIBERCRIME**. Conteúdos, módulos, nomenclaturas, pacotes operacionais ou decisões curriculares daquele projeto não devem ser incorporados aqui sem pedido explícito.

## Conteúdo pedagógico

Editar preferencialmente:

```text
src/content/modules/*.js
src/content/finalAssessment.js
src/content/courseIntro.js
src/content/officialLinks.js
```

Não alterar `src/App.jsx` nem `src/index.css`, salvo pedido expresso.

## Quizzes e avaliação

Quando editar quizzes ou bancos de questões:

- preservar a estrutura em `src/content/questionBank/`;
- manter, preferencialmente, banco amplo de questões por módulo;
- usar `quizSize: 10` quando o módulo usar sorteio de questões;
- não reduzir banco de questões existente sem autorização;
- garantir apenas uma alternativa correta por questão;
- evitar questões ambíguas, excessivamente fáceis ou baseadas em pegadinhas;
- alinhar cada questão ao conteúdo efetivamente ensinado no módulo.

## UX e interface

Editar preferencialmente:

```text
src/App.jsx
src/index.css
```

Não alterar conteúdo pedagógico salvo ajustes mínimos de interface.

## Comandos recomendados antes do PR

Executar, quando disponíveis no `package.json`:

```bash
npm run validate:content
npm run check
npm run build
```

Se algum comando não existir no `package.json`, registrar a limitação no relatório do PR e executar ao menos:

```bash
npm run build
```

## Padrão de branch

```text
agent/<tipo>/<descricao-curta>
```

Exemplos:

```text
agent/content/modulo-1-expansao
agent/quiz/revisao-modulo-5
agent/ux/progresso-certificado
agent/qa/validacao-fluxo
agent/docs/biblioteca-arquivos
```

## Git e PR

Não fazer push direto na `main`.

Fluxo recomendado:

```bash
git status
git checkout -b agent/<tipo>/<descricao-curta>
npm run validate:content
npm run check
npm run build
git add .
git commit -m "mensagem objetiva"
git push -u origin agent/<tipo>/<descricao-curta>
gh pr create
```

Se algum comando npm não existir, registrar a limitação no PR.

## Limites dos agentes

Agentes não devem:

- inventar fonte oficial;
- alterar o tema do curso sem autorização;
- alterar a matriz curricular sem autorização;
- misturar este projeto com o Projeto EaD CIBERCRIME;
- substituir a arquitetura inteira;
- adicionar backend, login ou banco de dados sem issue específica;
- remover módulos existentes;
- alterar regras de certificação sem autorização;
- reduzir bancos de questões existentes sem autorização;
- atualizar dependências globais sem autorização;
- commitar `node_modules/` ou `dist/`.

## Critério editorial

O curso deve preservar:

- clareza para público leigo;
- rigor conceitual;
- orientação preventiva;
- linguagem institucional, acessível e não alarmista;
- foco em cidadania digital;
- distinção entre prevenção, contenção de danos, preservação de provas e comunicação às instituições adequadas.

## Uso de skills e instruções externas

A skill de apoio ao projeto está localizada fora deste repositório em:

```text
C:\Users\steniosantos.sss\skills-urgentes\curso-cidadao-digital-seguro\SKILL.md
```

Quando o agente tiver acesso a esse caminho local, pode consultar a skill como referência de escopo, padrões pedagógicos, padrões de quiz, uso com Codex CLI, Gemini CLI e GitHub CLI.

Não copiar automaticamente o conteúdo integral da skill para dentro do repositório sem autorização expressa.
