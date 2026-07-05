# Cidadão Digital Seguro

Aplicação web em React/Vite para o curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**.

O curso funciona como uma trilha autoinstrucional com módulos liberados progressivamente, culminando em uma avaliação final e emissão de certificado digital. O progresso do participante é salvo no navegador por `localStorage`. A versão v1.6.5 consolidou melhorias de experiência visual, navegação assistida e redução de densidade nas áreas transversais. Na v1.6.7 e v1.6.8, foi introduzido e validado o modelo de dados para a biblioteca de vídeos educativos curados, que passou a ser exibida na interface na v1.6.9 e recebeu refinamento visual e editorial na v1.6.10. Na série v2.x, as ferramentas transversais de apoio (Glossário, Biblioteca de Documentos e Simulações Rápidas) foram completamente reestruturadas com esquemas de dados enriquecidos, indexação por tags/módulos, novas orientações lúdicas de feedback de conduta preventiva e unificação visual com a eliminação de estilos inline remanescentes.

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
- [Consolidação da Biblioteca de Vídeos v1.6.11](docs/consolidacao-biblioteca-videos-v1.6.11.md)
- [Consolidação da Série v1.6](docs/consolidacao-serie-v1.6.md)
- [Auditoria Final v1.6 (Pré-Main)](docs/auditoria-final-v1.6-pre-main.md)
- [Consolidação das Ferramentas Transversais v2.4.0](docs/consolidacao-ferramentas-transversais-v2.4.0.md)
- [Homologação v3.0.0-rc.1 e Saneamento de Links v3.0.0-rc.2](docs/homologacao-v3.0.0-rc.1-e-saneamento-links-v3.0.0-rc.2.md)
- [Notas da Release Final v3.0.0](docs/release-v3.0.0-final.md)
- [Projeto Pedagógico](docs/projeto-pedagogico-cidadao-digital-seguro.md)
- [Plano do Curso](docs/plano-do-curso-cidadao-digital-seguro.md)
- [Auditoria e Resolução de Pendências do Roadmap v3.1.0](docs/auditoria-pendencias-roadmap-v3.1.0.md)



## Comandos essenciais

```bash
npm install
npm run dev
npm run check
```

Use `npm run check` antes de abrir ou atualizar um Pull Request. Esse comando executa validação de conteúdo, build de produção e testes E2E.
