# Log de execução — Cidadão Digital Seguro

> Regra: toda sessão de trabalho (humana ou de agente) registra aqui, com data,
> o que foi feito, decisões tomadas e a próxima prioridade.
>
> Este log é o **diário de execução**; o histórico de mudanças do produto continua
> no `CHANGELOG.md`. Um não substitui o outro: o CHANGELOG diz *o que mudou na
> release*, o log diz *o que foi feito na sessão e por quê*.

## 2026-07-13 (Claude Code)

- Projeto entrou na governança padrão (`project-scaffold`). Já tinha `README.md`,
  `AGENTS.md`, `GEMINI.md` e `CHANGELOG.md` — faltava só este `log.md`.
- **Clone git aninhado removido.** Existia um `cidadao-digital-seguro/cidadao-digital-seguro/`
  — um segundo clone completo do mesmo repositório, na branch
  `claude/repo-audit-updates-e50k0g`. Antes de apagar, foi confirmado que a branch
  estava integralmente publicada no `origin` e que o PR #120 (v3.1.0) já havia sido
  mergeado em 05/07. Nada se perdeu.
- Estado do produto: **v3.0.0 lançada**, com as pendências do roadmap v3.1.0 (links,
  certificado, acessibilidade e mobile) já mergeadas na `main`.
- **Próxima prioridade:** cortar a release v3.1.0 formalmente — o trabalho já está na
  `main` mas não foi tagueado nem versionado no `package.json` (ainda em `3.0.0`).

## 2026-10-09 (Claude Code)

- **Correção da entrada de 2026-07-13.** Ela dizia que o `package.json` estava em `3.0.0`
  e que a v3.1.0 não estava versionada. Isso estava errado: `package.json` e `CHANGELOG.md`
  já estão em `3.1.0` (entrada de 2026-07-04). O que falta é a tag Git `v3.1.0`, que não
  existe no repositório local nem no `origin`.
- Estado do produto: **v3.1.0 versionada** na `main`; tag `v3.0.0` existe, `v3.1.0` não.
- **Próxima prioridade:** criar a tag `v3.1.0` apontando para a `main` e publicar a release,
  somente após confirmação.
