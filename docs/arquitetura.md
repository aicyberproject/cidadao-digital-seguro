# Arquitetura

## Visão geral

O projeto é uma aplicação web em React 18 empacotada com Vite. A publicação principal usa GitHub Pages, com `base` configurado para `/cidadao-digital-seguro/` em `vite.config.js`.

A aplicação é estática: não há backend, autenticação, banco de dados ou API própria. Todo o conteúdo do curso fica versionado no repositório, e o progresso do participante é persistido no navegador.

## Estrutura de conteúdo

Os módulos do curso ficam em:

```text
src/content/modules/
├── index.js
├── module1.js
├── module2.js
├── module3.js
├── module4.js
├── module5.js
└── module6.js
```

Cada módulo exporta um objeto com metadados, conteúdo, checklist, atividade prática, videoaula, materiais complementares e configuração de quiz. O arquivo `src/content/modules/index.js` importa os módulos e exporta o array `modules`, que define a ordem da trilha.

Outros conteúdos centrais ficam em:

```text
src/content/courseIntro.js
src/content/officialLinks.js
src/content/finalAssessment.js
```

## Bancos de questões

Os bancos de questões por módulo ficam em:

```text
src/content/questionBank/
├── index.js
├── module1Questions.js
├── module2Questions.js
├── module3Questions.js
├── module4Questions.js
├── module5Questions.js
└── module6Questions.js
```

O arquivo `src/content/questionBank/index.js` centraliza os arrays por id de módulo:

```js
export const questionBank = {
  m1: module1Questions,
  m2: module2Questions,
  m3: module3Questions,
  m4: module4Questions,
  m5: module5Questions,
  m6: module6Questions,
}
```

Cada questão segue o padrão:

```js
{
  question: 'Texto da pergunta',
  options: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
  answer: 1,
}
```

O campo `answer` é o índice da alternativa correta no array `options`.

## App.jsx

`src/App.jsx` é o motor de navegação da aplicação. Ele controla:

- tela inicial;
- trilha de módulos;
- desbloqueio progressivo;
- avanço entre etapas;
- marcação de videoaula e atividade;
- sorteio e correção de quizzes;
- avaliação final;
- liberação da certificação;
- geração do PDF do certificado.

O app normaliza diferenças entre módulos antigos e novos. Por exemplo, `getModuleContent()` monta a sequência de telas a partir de `content` ou `lessons`, e também adiciona videoaula, links, checklist e atividade quando esses campos existem no módulo.

## Persistência local

O progresso fica no `localStorage` com a chave:

```text
cidadao-digital-seguro-progress-v2
```

O estado salvo inclui:

- curso iniciado;
- módulos desbloqueados;
- telas vistas;
- videoaulas concluídas;
- atividades concluídas;
- respostas dos quizzes;
- variantes sorteadas dos quizzes;
- avaliação final;
- liberação do certificado.

Como o armazenamento é local, o progresso não acompanha o usuário entre navegadores, dispositivos ou perfis diferentes.

## Fluxo do curso

O fluxo principal é:

1. participante inicia o curso;
2. módulo 1 começa desbloqueado;
3. cada tela comum é registrada ao clicar em `Próxima etapa`;
4. videoaula e atividade são obrigatórias para concluir o módulo;
5. o quiz do módulo usa 10 questões sorteadas do banco;
6. o aproveitamento mínimo do quiz é 70%;
7. ao concluir o módulo, o próximo é desbloqueado;
8. após os 6 módulos, a avaliação final é liberada;
9. ao passar na avaliação final, a tela de certificação fica disponível;
10. o certificado é gerado em PDF no navegador com jsPDF.

## Certificado

O certificado não depende de backend. A emissão acontece no navegador, após aprovação na avaliação final. O PDF inclui dados do participante, nome do curso, carga horária sugerida, data, status de aprovação, versão do curso e código verificador local.
