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
```

## Regra central

Agentes devem fazer alterações pequenas, revisáveis e vinculadas a uma issue.

## Conteúdo pedagógico

Editar preferencialmente:

```text
src/content/modules/*.js
src/content/finalAssessment.js
src/content/courseIntro.js
src/content/officialLinks.js
```

Não alterar `src/App.jsx` nem `src/index.css`, salvo pedido expresso.

## UX e interface

Editar preferencialmente:

```text
src/App.jsx
src/index.css
```

Não alterar conteúdo pedagógico salvo ajustes mínimos de interface.

## Comando obrigatório antes do PR

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
```

## Limites dos agentes

Agentes não devem:

- inventar fonte oficial;
- alterar o tema do curso sem autorização;
- substituir a arquitetura inteira;
- adicionar backend, login ou banco de dados sem issue específica;
- remover módulos existentes;
- alterar regras de certificação sem autorização;
- commitar `node_modules/` ou `dist/`.

## Critério editorial

O curso deve preservar:

- clareza para público leigo;
- rigor conceitual;
- orientação preventiva;
- linguagem institucional, acessível e não alarmista;
- foco em cidadania digital;
- distinção entre prevenção, contenção de danos, preservação de provas e comunicação às instituições adequadas.
