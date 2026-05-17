# Testes

## Validação de conteúdo

```bash
npm run validate:content
```

Esse comando executa `scripts/validateContent.js` e verifica a estrutura esperada do curso. Ele reporta erros, warnings, total de módulos, quantidade de questões por módulo e total da avaliação final.

Use esse comando sempre que alterar:

- módulos;
- bancos de questões;
- avaliação final;
- links oficiais;
- introdução do curso.

## Testes E2E

```bash
npm run test:e2e
```

Os testes E2E usam Playwright. A suíte principal está em:

```text
tests/e2e/course-flow.spec.js
```

O teste cobre o fluxo principal do curso:

- abre `http://localhost:5173/cidadao-digital-seguro/`;
- limpa o progresso salvo;
- valida os 6 módulos;
- inicia o curso;
- avança pelas telas com `Próxima etapa`;
- responde quizzes de módulo;
- libera avaliação final;
- responde avaliação final;
- chega à tela de certificação.

O Playwright sobe o Vite pelo `webServer` configurado em `playwright.config.js`.

## Check completo

```bash
npm run check
```

Esse é o comando recomendado antes de PR. Ele roda, em sequência:

```bash
npm run validate:content
npm run build
npm run test:e2e
```

## Progresso no localStorage

O progresso do curso fica salvo no navegador com a chave:

```text
cidadao-digital-seguro-progress-v2
```

Para reiniciar manualmente em testes de navegador, abra o DevTools e execute:

```js
localStorage.removeItem('cidadao-digital-seguro-progress-v2')
location.reload()
```

Para inspecionar o progresso:

```js
JSON.parse(localStorage.getItem('cidadao-digital-seguro-progress-v2'))
```

Para liberar progresso manualmente durante depuração, prefira usar os botões da interface. Se precisar alterar o estado à mão, edite a chave no painel Application/Storage do navegador e recarregue a página. Evite commitar qualquer alteração de código criada apenas para liberar progresso.

## Porta 5173 ocupada

Se `npm run dev` ou `npm run test:e2e` falhar porque a porta `5173` está em uso, encerre o processo que está ocupando a porta.

No Windows PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue |
  Select-Object LocalAddress,LocalPort,State,OwningProcess
```

Depois identifique o processo:

```powershell
Get-Process -Id <PID>
```

E encerre, se for seguro:

```powershell
Stop-Process -Id <PID>
```

No macOS ou Linux:

```bash
lsof -i :5173
kill <PID>
```

Se houver outro servidor Vite legítimo rodando, pare esse servidor manualmente em vez de encerrar processos sem confirmar.

## Navegador do Playwright

Depois de instalar ou atualizar `@playwright/test`, pode ser necessário instalar o navegador local:

```bash
npx playwright install chromium
```
