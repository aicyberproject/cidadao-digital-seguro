# Preview automatico de Pull Request

Este repositorio possui um workflow de preview para Pull Requests em `.github/workflows/preview.yml`.

## Como funciona

O workflow roda quando um Pull Request e aberto, atualizado ou reaberto, e tambem pode ser executado manualmente por `workflow_dispatch`.

Em cada execucao, ele:

1. faz checkout do codigo do Pull Request;
2. configura Node.js;
3. instala dependencias com `npm ci`;
4. valida o conteudo com `npm run validate:content`;
5. gera o build com `npm run build -- --base=/cidadao-digital-seguro-preview/`;
6. copia a pasta `dist` para o repositorio `aicyberproject/cidadao-digital-seguro-preview`, branch `main`;
7. preserva o arquivo `.nojekyll`;
8. comenta no Pull Request a URL do preview.

## Secret necessario

O repositorio principal precisa ter o secret `PREVIEW_DEPLOY_TOKEN`.

Esse token deve permitir escrita no repositorio:

```text
aicyberproject/cidadao-digital-seguro-preview
```

## URL de acesso

O preview fica disponivel em:

```text
https://aicyberproject.github.io/cidadao-digital-seguro-preview/
```

Nos Pull Requests, o workflow comenta a URL com o SHA do commit do PR como parametro de cache:

```text
https://aicyberproject.github.io/cidadao-digital-seguro-preview/?preview=<sha-do-pr>
```

## Sobrescrita do preview

O preview usa um unico repositorio e uma unica branch de publicacao. Por isso, o conteudo publicado e sobrescrito a cada atualizacao de Pull Request ou execucao manual do workflow.

A URL comentada no PR identifica o commit que disparou aquela publicacao, mas o conteudo hospedado sempre corresponde a execucao mais recente que concluiu o deploy.
