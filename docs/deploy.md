# Deploy

## GitHub Pages

O projeto é publicado como site estático no GitHub Pages. O Vite usa o base path atual:

```text
/cidadao-digital-seguro/
```

A URL de produção esperada é:

```text
https://aicyberproject.github.io/cidadao-digital-seguro/
```

## Workflow principal

O deploy de produção está configurado em:

```text
.github/workflows/deploy.yml
```

Ele roda em:

- push para `main`;
- execução manual por `workflow_dispatch`.

Fluxo do workflow:

1. checkout do repositório;
2. configuração do Node.js 20;
3. instalação com `npm ci`;
4. build com `npm run build`;
5. upload do artefato do Pages;
6. publicação com `actions/deploy-pages`.

No GitHub, o Pages deve estar configurado em **Settings > Pages > Build and deployment > GitHub Actions**.

## Preview automático por Pull Request

O preview de PR está configurado em:

```text
.github/workflows/preview.yml
```

Ele roda em:

- `pull_request` aberto;
- `pull_request` atualizado;
- `pull_request` reaberto;
- execução manual por `workflow_dispatch`.

O build de preview usa:

```bash
npm run build -- --base=/cidadao-digital-seguro-preview/
```

O resultado da pasta `dist` é publicado no repositório:

```text
aicyberproject/cidadao-digital-seguro-preview
```

Branch de publicação:

```text
main
```

URL de preview:

```text
https://aicyberproject.github.io/cidadao-digital-seguro-preview/
```

Em Pull Requests, o workflow comenta a URL com o SHA do commit do PR:

```text
https://aicyberproject.github.io/cidadao-digital-seguro-preview/?preview=<sha-do-pr>
```

O preview é compartilhado e sobrescrito a cada execução concluída. Portanto, a hospedagem sempre reflete o último PR ou execução manual que publicou com sucesso.

## Secret necessário

O workflow de preview usa:

```text
PREVIEW_DEPLOY_TOKEN
```

Esse secret deve existir no repositório principal e precisa permitir escrita no repositório:

```text
aicyberproject/cidadao-digital-seguro-preview
```

Sem esse token, o workflow consegue validar e buildar, mas falha ao fazer checkout/push no repositório de preview.

## .nojekyll

O workflow de preview preserva/cria `.nojekyll` no repositório de preview. Esse arquivo evita processamento do GitHub Pages por Jekyll e reduz risco de assets estáticos serem ignorados.

## Deploy manual alternativo

O projeto mantém o script:

```bash
npm run deploy
```

Esse script usa `gh-pages -d dist`. O caminho recomendado para produção, porém, é o workflow principal de GitHub Pages.

## Referência adicional

Detalhes operacionais do preview também estão em:

```text
docs/preview.md
```
