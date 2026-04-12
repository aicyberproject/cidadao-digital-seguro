# Cidadão Digital Seguro

Aplicação web em React para o curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**.

A interface foi organizada como uma trilha progressiva de aprendizagem, com:

1. módulos liberados sequencialmente
2. conteúdo principal por etapa
3. videoaulas marcáveis
4. checklists
5. atividades práticas
6. quizzes com aproveitamento mínimo
7. avaliação final integradora
8. certificado real em PDF
9. persistência de progresso via `localStorage`

## Nome do repositório configurado

Este projeto já está configurado para GitHub Pages com o `base` correspondente a:

```text
cidadao-digital-seguro
```

Portanto, o cenário esperado de publicação é:

```text
https://SEU_USUARIO.github.io/cidadao-digital-seguro/
```

Se o nome do seu repositório for diferente, altere a constante `repoName` em `vite.config.js`.

## Estrutura do projeto

```text
cidadao-digital-seguro-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Tecnologias utilizadas

1. React 18
2. Vite
3. Framer Motion
4. Lucide React
5. jsPDF
6. CSS puro

## Requisitos

1. Node.js 18 ou superior
2. npm 9 ou superior

## Como executar localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Rode o ambiente de desenvolvimento

```bash
npm run dev
```

### 3. Gere a versão de produção

```bash
npm run build
```

### 4. Visualize a versão de produção localmente

```bash
npm run preview
```

## Como publicar no GitHub

### 1. Crie o repositório com este nome

```text
cidadao-digital-seguro
```

### 2. Inicialize e envie o projeto

```bash
git init
git add .
git commit -m "Curso web com GitHub Pages e certificado em PDF"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cidadao-digital-seguro.git
git push -u origin main
```

## Como ativar o GitHub Pages

O arquivo de workflow já está incluído em:

```text
.github/workflows/deploy.yml
```

No GitHub:

1. abra **Settings**
2. entre em **Pages**
3. em **Build and deployment**, selecione **GitHub Actions**

Depois disso, cada push para `main` publicará automaticamente a aplicação.

## Deploy manual alternativo com gh-pages

Se preferir publicar manualmente na branch `gh-pages`, use:

```bash
npm run deploy
```

## Certificado em PDF

A aplicação agora gera um certificado real em PDF diretamente no navegador.

Na tela de certificação, o participante deve:

1. informar o nome completo
2. clicar em **Baixar certificado em PDF**

O PDF inclui:

1. nome do participante
2. nome do curso
3. data de conclusão
4. status de aprovação
5. layout formal de certificado

## Onde editar o conteúdo do curso

O conteúdo principal da trilha está em:

```text
src/App.jsx
```

Nesse arquivo você pode editar:

1. textos de cada módulo
2. quizzes
3. links oficiais
4. regras de progressão
5. avaliação final
6. certificado

## Onde editar o visual

O estilo da aplicação está em:

```text
src/index.css
```

## Observação importante

Esta versão é adequada para:

1. GitHub Pages
2. Vercel
3. Netlify
4. uso como trilha web incorporada em área de membros

Ela ainda não usa autenticação, banco de dados ou backend. O progresso permanece salvo localmente no navegador por `localStorage`.
