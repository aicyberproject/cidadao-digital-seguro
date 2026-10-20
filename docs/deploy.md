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

## Preview de Pull Request

Não há preview automático de Pull Request. O workflow e o repositório de preview foram removidos. Para conferir uma alteração, rode `npm run build` e `npm run preview` localmente.

## Deploy manual alternativo

O projeto mantém o script:

```bash
npm run deploy
```

Esse script usa `gh-pages -d dist`. O caminho recomendado para produção, porém, é o workflow principal de GitHub Pages.
