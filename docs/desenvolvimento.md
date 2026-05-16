# Desenvolvimento

## Branches

Use branches pequenas e vinculadas a uma issue. O padrão recomendado é:

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

Antes de abrir PR, rode:

```bash
npm run check
```

## Instalação local

```bash
npm install
npm run dev
```

O Vite sobe, por padrão, em:

```text
http://localhost:5173/cidadao-digital-seguro/
```

## Como adicionar novo módulo

Para adicionar um novo módulo, mantenha o padrão atual:

1. crie `src/content/modules/moduleN.js`;
2. defina um `id` único, por exemplo `m7`;
3. inclua `title`, `shortTitle`, `subtitle` ou `theme`, `goal` ou `objectives`;
4. defina conteúdo em `content` ou `lessons`;
5. inclua `checklist`, `practicalActivity`, `video` e `resources` quando aplicável;
6. conecte o banco de questões do módulo;
7. importe e adicione o módulo em `src/content/modules/index.js`.

O array exportado por `src/content/modules/index.js` define a ordem de liberação da trilha. Inserir, remover ou reordenar módulos altera o fluxo do curso e deve ser tratado como mudança relevante.

## Como adicionar banco de questões

Para um novo módulo:

1. crie `src/content/questionBank/moduleNQuestions.js`;
2. exporte um array de questões;
3. importe esse array em `src/content/questionBank/index.js`;
4. adicione a entrada correspondente no objeto `questionBank`;
5. referencie esse banco no módulo.

Exemplo:

```js
import { questionBank } from '../questionBank'

export const module7 = {
  id: 'm7',
  // ...
  questionBank: questionBank.m7,
  quizSize: 10,
  quiz: questionBank.m7.slice(0, 10),
}
```

## Padrão de quiz

Cada módulo deve declarar:

```js
questionBank: questionBank.mN,
quizSize: 10,
quiz: questionBank.mN.slice(0, 10),
```

`questionBank` é a fonte preferencial. `quizSize` informa quantas questões entram na tentativa. `quiz` funciona como fallback de compatibilidade para o app caso o banco principal não esteja disponível.

Cada questão deve ter:

```js
{
  question: 'Pergunta',
  options: ['A', 'B', 'C', 'D'],
  answer: 0,
}
```

O índice em `answer` deve apontar para uma alternativa existente em `options`.

## Cuidados para não quebrar o fluxo

- Não reutilize `id` de módulo.
- Não remova módulos existentes sem decisão explícita.
- Mantenha pelo menos 10 questões por módulo.
- Preserve `quizSize: 10` enquanto o fluxo E2E esperar 10 questões.
- Não altere regras de certificação sem issue específica.
- Não invente fonte oficial em links ou materiais complementares.
- Ao editar conteúdo pedagógico, rode `npm run validate:content`.
- Ao editar fluxo, interface, certificado ou testes, rode `npm run check`.

## Áreas de edição preferenciais

Conteúdo pedagógico:

```text
src/content/modules/*.js
src/content/finalAssessment.js
src/content/courseIntro.js
src/content/officialLinks.js
```

Interface e navegação:

```text
src/App.jsx
src/index.css
```

Evite misturar mudanças de conteúdo, UX, testes e deploy no mesmo PR.
