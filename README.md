# Cidadão Digital Seguro

Aplicação web em React/Vite para o curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**.

O curso funciona como uma trilha autoinstrucional com módulos liberados progressivamente, culminando em uma avaliação final e emissão de certificado digital. O progresso do participante é salvo no navegador por `localStorage`. A versão v1.6.5 consolidou melhorias de experiência visual, navegação assistida e redução de densidade nas áreas transversais. Na v1.6.7, foi introduzido o modelo de dados inicial para a biblioteca de vídeos educativos curados.

## Recursos do Curso

A plataforma oferece uma experiência de aprendizado completa e acessível:
- **6 Módulos Principais**: Conteúdo estruturado com progressão de aprendizado.
- **Avaliações**: Quizzes por módulo e Avaliação Final integradora.
- **Certificação**: Emissão automática de certificado em PDF com código verificador.
- **Glossário**: Dicionário pesquisável de termos técnicos em linguagem cidadã.
- **Biblioteca**: Área transversal com cartilhas e documentos públicos oficiais.
- **Vídeos Educativos**: Acervo institucional de campanhas e orientações.
- **Checklists Interativos**: Guias de ação rápida para situações de risco.
- **Simulações Rápidas**: Cenários práticos para treinar a tomada de decisão contra golpes.
- **Acessibilidade**: Alta aderência a padrões ARIA, navegação por teclado e suporte a leitores de tela.

## Links principais

- Produção: `https://aicyberproject.github.io/cidadao-digital-seguro/`
- Preview de PR: `https://aicyberproject.github.io/cidadao-digital-seguro-preview/`

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [Desenvolvimento](docs/desenvolvimento.md)
- [Testes](docs/testes.md)
- [Deploy](docs/deploy.md)
- [Roadmap](docs/roadmap.md)
- [Preview automático](docs/preview.md)
- [Evolução das videoaulas v1.5.2 a v1.5.7](docs/videoaulas-v1.5.2-v1.5.7.md)

## Comandos essenciais

```bash
npm install
npm run dev
npm run check
```

Use `npm run check` antes de abrir ou atualizar um Pull Request. Esse comando executa validação de conteúdo, build de produção e testes E2E.
