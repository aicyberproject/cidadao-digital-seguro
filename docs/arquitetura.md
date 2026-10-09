# Arquitetura

## Visão geral

O projeto é uma aplicação web em React 18 empacotada com Vite. A publicação principal usa GitHub Pages, com `base` configurado para `/cidadao-digital-seguro/` em `vite.config.js`.

A aplicação é estática no front-end. Todo o conteúdo do curso fica versionado no repositório, e o progresso do participante é persistido no navegador. Há um backend mínimo no Supabase, usado apenas para registrar e validar certificados (ver seção "Backend Supabase"). Ele não armazena progresso do curso.

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

A emissão do PDF acontece no navegador, após aprovação na avaliação final. O PDF inclui dados do participante, nome do curso, carga horária sugerida, data, status de aprovação, versão do curso e código verificador.

O PDF é gerado mesmo sem o backend. Antes de gerá-lo, o app dispara, sem aguardar resposta, uma chamada à Edge Function `emitir-certificado` com o código verificador e o nome do participante. A função grava o código na tabela `certificados`. Se a chamada falhar, o download do PDF não é afetado.

O código verificador também é consultado pela RPC `validar_certificado`, que é o gate de acesso ao módulo de formação de multiplicadores (`validarCertificado` em `src/lib/supabaseClient.js`).

## Backend Supabase

O backend está versionado na pasta `supabase/`:

```text
supabase/
├── config.toml
├── migrations/
│   ├── 20260730182854_create_certificados_e_validador.sql
│   ├── 20260730183010_grant_service_role_certificados.sql
│   └── 20261009054100_remote_schema.sql
└── functions/
    └── emitir-certificado/index.ts
```

- `20260730182854`: cria a tabela `certificados`, habilita RLS, remove o acesso direto de `anon` e `authenticated` e cria a RPC `validar_certificado`.
- `20260730183010`: concede a `service_role` o acesso à tabela `certificados`.
- `20261009054100`: baseline gerado a partir do schema de produção com `supabase db pull`. Foi registrado como já aplicado em produção, sem recriar objetos existentes.
- `emitir-certificado`: código baixado de produção. Valida o formato do código, grava `codigo`, `nome_participante` e `tipo = 'curso'` com a service role key, que fica somente no ambiente da função. O campo `versao`, enviado pelo cliente, não é gravado.

No build, o workflow de deploy injeta `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` a partir dos secrets do repositório. A chave `anon` é pública por natureza, pois vai para o bundle.

Pontos em aberto, acompanhados na issue #127:

- A função `emitir-certificado` não exige autenticação do chamador, e o CORS está liberado para qualquer origem. Qualquer cliente que envie um código no formato válido consegue gravar um registro. A correção deve ir em issue separada, pois altera comportamento.
- A migration inicial inseriu um registro de teste na tabela `certificados`, ainda pendente de decisão para produção.
- A integração do repositório com o painel do Supabase ainda não foi configurada. Quando for, "Deploy to production" deve permanecer desligado.
