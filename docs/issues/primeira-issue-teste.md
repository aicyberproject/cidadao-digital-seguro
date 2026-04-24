# Issue de teste recomendada

## Título

```text
[content] módulo 1 - expandir conteúdo e quiz
```

## Corpo da issue

Revise o arquivo:

```text
src/content/modules/module1.js
```

## Objetivo

Tornar o Módulo 1 mais completo, didático e adequado a um curso EAD autoinstrucional sobre prevenção a crimes cibernéticos.

## Tarefas

1. Ampliar o texto de abertura.
2. Melhorar a pergunta mobilizadora.
3. Acrescentar pelo menos dois exemplos práticos.
4. Revisar o checklist.
5. Ampliar o quiz de 3 para 5 questões.
6. Manter a estrutura JavaScript existente.
7. Não alterar componentes React nem CSS.

## Critérios de aceite

- O arquivo continua exportando `module1`.
- O build passa com `npm run build`.
- O quiz possui 5 questões.
- Cada questão tem 4 alternativas.
- Cada questão tem apenas uma resposta correta.
- Não há alteração em `src/App.jsx`.
- Não há alteração em `src/index.css`.

## Prompt sugerido para o agente

Você é o Agente Conteudista do curso `Cidadão Digital Seguro`.

Revise `src/content/modules/module1.js` conforme a issue.

Preserve:
- estrutura do objeto `module1`;
- linguagem clara e institucional;
- foco em prevenção;
- público leigo;
- compatibilidade com React/Vite.

Não edite outros arquivos, salvo se absolutamente necessário.
