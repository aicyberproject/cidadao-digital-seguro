# Curadoria da biblioteca de vídeos educativos — Issue #63

Projeto: **Cidadão Digital Seguro — Prevenção e Combate a Crimes Cibernéticos**  
Repositório: `aicyberproject/cidadao-digital-seguro`  
Branch de integração: `v1.6.0-revisao-integrada-curso`  
Frente recomendada: `v1.6.6-curadoria-videos-issue-63`  
Issue: **#63 — Planejar reorganização da biblioteca de vídeos educativos**  
Data de referência: 2026-06-15

---

## 1. Objetivo da frente

Planejar a reorganização da biblioteca de vídeos educativos do curso **Cidadão Digital Seguro**, com base em curadoria de materiais oficiais, públicos, institucionais e pedagogicamente adequados.

Esta frente não deve alterar, neste primeiro momento, a arquitetura do app nem o fluxo de conclusão dos módulos. O objetivo imediato é produzir uma **matriz de curadoria**, validar fontes e preparar documentação para posterior implementação.

---

## 2. Estado de partida

A série `v1.6.5` foi concluída e consolidada na branch de integração `v1.6.0-revisao-integrada-curso`.

Última consolidação registrada:

```text
PR #69 — Consolida melhorias visuais da v1.6.5
Tag: v1.6.5-f-consolidacao
Commit esperado na integração: b3de55f...
Branch atual esperada: v1.6.0-revisao-integrada-curso
```

Antes de iniciar a nova frente, confirmar:

```powershell
git checkout v1.6.0-revisao-integrada-curso
git pull origin v1.6.0-revisao-integrada-curso
git log --oneline -12
git rev-parse v1.6.5-f-consolidacao
git rev-parse origin/v1.6.0-revisao-integrada-curso
```

O ideal é que a tag `v1.6.5-f-consolidacao` e `origin/v1.6.0-revisao-integrada-curso` apontem para o mesmo hash iniciado por `b3de55f`.

---

## 3. Escopo da Issue #63

A Issue #63 deve responder a quatro perguntas:

1. **Quais vídeos educativos devem compor a biblioteca do curso?**
2. **Em qual módulo ou tema cada vídeo deve ser utilizado?**
3. **O vídeo deve ser material complementar, etapa interna do módulo ou item de biblioteca geral?**
4. **Quais critérios técnicos, editoriais e jurídicos devem orientar a inclusão?**

---

## 4. Critérios de curadoria

Cada vídeo candidato deve ser avaliado pelos seguintes critérios.

| Critério | Pergunta de validação | Decisão esperada |
|---|---|---|
| Fonte | O vídeo é oficial, institucional ou de fonte confiável? | Priorizar MJSP, PF, CERT.br/NIC.br/CGI.br, FEBRABAN, Banco Central, INTERPOL e entidades públicas. |
| Disponibilidade | O vídeo está publicamente acessível? | Confirmar link e plataforma. |
| Estabilidade | O link parece estável e institucional? | Preferir páginas oficiais e canais institucionais. |
| Aderência temática | O vídeo se encaixa em qual módulo? | Associar a módulo, aula, glossário ou biblioteca. |
| Linguagem | A linguagem é adequada para público amplo? | Priorizar vídeos curtos, claros e orientados à ação. |
| Duração | O tempo é compatível com curso autoinstrucional? | Preferir vídeos de até 5 minutos; vídeos longos devem ser aprofundamento. |
| Direitos de uso | O curso pode linkar/incorporar o vídeo? | Preferir link externo ou incorporação apenas quando permitido pela plataforma/fonte. |
| Acessibilidade | Há legenda, transcrição ou boa compreensão audiovisual? | Priorizar vídeos com legendas ou roteiro simples. |
| Risco reputacional | Há publicidade, celebridade, campanha temporal ou conteúdo datado? | Classificar como campanha complementar quando houver temporalidade forte. |

---

## 5. Fontes prioritárias

### 5.1 MJSP / Aliança Nacional de Combate a Fraudes Bancárias Digitais

Uso recomendado:

- eixo institucional do curso;
- prevenção de fraudes bancárias digitais;
- resposta inicial a golpes;
- documentos públicos e biblioteca de apoio;
- eventual seção “Sofri um golpe, e agora?”.

Observação: a página da Aliança deve ser tratada como fonte guarda-chuva para materiais, notícias, plano de ação, documentos e eventuais vídeos educativos vinculados ao MJSP.

### 5.2 FEBRABAN — campanha antifraudes com Fábio Porchat

Vídeos já identificados como candidatos prioritários:

| Tema | Link | Uso sugerido | Prioridade |
|---|---|---|---|
| Falsa Central | https://youtu.be/fzZixOUV9os | Módulo 4 ou Módulo 5; golpes bancários e engenharia social. | Alta |
| Falsa Venda | https://youtu.be/n0GvVfx4Y1s | Módulo 4; comércio eletrônico, compras online e marketplaces. | Alta |
| Golpe do Zap | https://youtu.be/DMNxapx10dg | Módulo 5; golpes por mensageria e falso conhecido. | Alta |

Uso pedagógico recomendado:

- vídeos curtos de transição;
- bloco “É Golpe”;
- biblioteca complementar;
- abertura de estudos de caso.

Cuidados:

- campanha com celebridade e caráter publicitário;
- verificar se a mensagem permanece atual;
- evitar transformar o curso em repositório de propaganda;
- contextualizar como campanha educativa de prevenção.

### 5.3 CERT.br / NIC.br / CGI.br — Cartilha de Segurança para Internet e Cidadão na Rede

Uso recomendado:

- fonte principal para higiene digital;
- autenticação, backup, privacidade, proteção de dados, golpes, banco via internet, comércio eletrônico, celulares, computadores, redes e códigos maliciosos;
- vídeos curtos do projeto Cidadão na Rede;
- palestras do CERT.br como material de aprofundamento.

Vídeos e tópicos candidatos extraídos da página de fascículos:

| Tema | Item candidato | Uso sugerido | Prioridade |
|---|---|---|---|
| Autenticação | Palestra CERT.br sobre autenticação; vídeos Cidadão na Rede sobre senhas, gerenciador de senhas e 2FA | Módulo 2 | Alta |
| Backup | Palestra CERT.br sobre backup; vídeos Cidadão na Rede sobre backup e backup do celular | Módulo 2 ou 6 | Alta |
| Banco via Internet | Dicas de Pix, códigos de verificação, boletos falsos, cartão virtual, limites bancários e apps falsos | Módulo 4 | Alta |
| Golpes | Fascículos “Não se Deixe Enganar”, “Evite Fraudes” e “Caiu? Veja o que Fazer” | Módulos 5 e 6 | Alta |
| Privacidade e Proteção de Dados | vídeos e fascículos correlatos | Módulo 2 e biblioteca | Média/Alta |
| Celulares e Tablets | bloqueio de tela, aplicativos oficiais, links, proteção do chip SIM | Módulo 3 | Alta |
| Boatos | checagem de fontes, desinformação e conteúdo manipulado | Módulo 5 | Média/Alta |

### 5.4 INTERPOL — campanha #ThinkTwice

Vídeos/temas candidatos:

| Tema | Uso sugerido | Prioridade |
|---|---|---|
| Ransomware attacks | Módulo 5; ransomware, malware e resposta preventiva. | Média/Alta |
| Malware attacks | Módulo 3 ou 5; códigos maliciosos e prevenção. | Média/Alta |
| Phishing in the digital age | Módulo 5; phishing e links suspeitos. | Alta |
| Scams and generative AI | Módulo 5; golpes com IA generativa e deepfakes. | Alta |
| Romance baiting | Módulo 5; golpes afetivos, engenharia social e extorsão. | Média |

Uso pedagógico recomendado:

- biblioteca complementar internacional;
- seção “Pense duas vezes”; 
- reforço do comando: pausar, avaliar, verificar e agir com prudência;
- eventual material de aprofundamento para comparar campanhas internacionais.

Cuidados:

- idioma inglês;
- verificar disponibilidade de legendas;
- evitar uso como vídeo obrigatório se não houver versão em português;
- inserir contextualização em português no curso.

### 5.5 Banco Central do Brasil

Pendência de pesquisa:

- localizar vídeos oficiais sobre Pix, segurança bancária digital, golpe do falso funcionário, valores a receber, registrato, cartão, boletos, canais oficiais e prevenção a fraudes.

Uso sugerido:

- Módulo 4 — Transações e Consumo Seguro;
- biblioteca de documentos públicos;
- seção de “canais oficiais”.

Prioridade: alta, mas dependente de validação de links.

### 5.6 Polícia Federal

Pendência de pesquisa:

- localizar vídeos institucionais públicos da PF sobre crimes cibernéticos, golpes, prevenção, denúncia, engenharia social, abuso de identidade e proteção de dados.

Uso sugerido:

- Módulo 1 — ecossistema institucional;
- Módulo 5 — ameaças e golpes;
- Módulo 6 — resposta, denúncia e preservação mínima de evidências.

Prioridade: alta, mas dependente de validação de links.

---

## 6. Matriz preliminar por módulo

### Módulo 1 — Ecossistema de Segurança Digital

Objetivo do vídeo neste módulo:

- apresentar a ideia de responsabilidade compartilhada;
- mostrar que crimes digitais exigem resposta integrada;
- contextualizar a Aliança Nacional e fontes oficiais.

Candidatos:

| Fonte | Vídeo/tema | Tipo de uso | Status |
|---|---|---|---|
| MJSP / Aliança | vídeos institucionais da Aliança, se disponíveis | Biblioteca ou abertura de módulo | Pendente validar |
| PF | vídeo institucional sobre prevenção a crimes cibernéticos | Biblioteca | Pendente validar |
| INTERPOL | Be Cyber Aware / visão geral de campanhas | Complementar internacional | Validar idioma e legenda |

### Módulo 2 — Pilares da Higiene Digital

Objetivo do vídeo neste módulo:

- ensinar proteção básica: senhas, autenticação, atualização, backup, privacidade e proteção de dados.

Candidatos:

| Fonte | Vídeo/tema | Tipo de uso | Status |
|---|---|---|---|
| CERT.br | Autenticação / senhas / 2FA | Vídeo recomendado | Prioritário |
| Cidadão na Rede | Senhas seguras, senhas variadas, gerenciador de senhas, verificação em dois fatores | Biblioteca temática | Prioritário |
| CERT.br | Backup | Vídeo recomendado | Prioritário |
| Cidadão na Rede | Backup e backup do celular | Biblioteca temática | Prioritário |
| CERT.br/NIC.br/CGI.br | Privacidade e proteção de dados | Material complementar | Pendente detalhar |

### Módulo 3 — Proteção de Dispositivos e Redes

Objetivo do vídeo neste módulo:

- demonstrar condutas de proteção de celulares, tablets, computadores, redes Wi-Fi, aplicativos e malware.

Candidatos:

| Fonte | Vídeo/tema | Tipo de uso | Status |
|---|---|---|---|
| CERT.br/Cidadão na Rede | Bloqueio de tela | Vídeo recomendado | Prioritário |
| CERT.br/Cidadão na Rede | Cuidado com aplicativos falsos | Vídeo recomendado | Prioritário |
| CERT.br | Computadores / antivírus / atualizações | Complementar | Pendente detalhar |
| INTERPOL | Malware attacks | Complementar internacional | Validar legenda |
| MJSP | Celular Seguro | Biblioteca / resposta preventiva | Pendente validar link final |

### Módulo 4 — Transações e Consumo Seguro

Objetivo do vídeo neste módulo:

- prevenir golpes em banco via internet, Pix, boletos, compras online, marketplaces e falsas vendas.

Candidatos:

| Fonte | Vídeo/tema | Tipo de uso | Status |
|---|---|---|---|
| FEBRABAN | Falsa Central | Estudo de caso / bloco “É Golpe” | Prioritário |
| FEBRABAN | Falsa Venda | Estudo de caso / comércio eletrônico | Prioritário |
| CERT.br/Cidadão na Rede | Dicas de uso do Pix | Vídeo recomendado | Prioritário |
| CERT.br/Cidadão na Rede | Boletos falsos | Vídeo recomendado | Prioritário |
| CERT.br/Cidadão na Rede | Compras seguras: cartão virtual | Vídeo recomendado | Prioritário |
| Banco Central | Pix e segurança bancária digital | Biblioteca / fonte oficial | Pendente validar |

### Módulo 5 — Catálogo de Ameaças e Golpes

Objetivo do vídeo neste módulo:

- expor tipologias de golpe, engenharia social, phishing, malware, ransomware, perfis falsos, golpes com IA e desinformação.

Candidatos:

| Fonte | Vídeo/tema | Tipo de uso | Status |
|---|---|---|---|
| FEBRABAN | Golpe do Zap | Estudo de caso | Prioritário |
| INTERPOL | Phishing in the digital age | Complementar internacional | Alta prioridade |
| INTERPOL | Scams and generative AI | Complementar internacional | Alta prioridade |
| INTERPOL | Ransomware attacks | Complementar internacional | Média/Alta |
| CERT.br | Golpes: Não se Deixe Enganar | Material complementar | Prioritário |
| CERT.br | Golpes: Evite Fraudes | Material complementar | Prioritário |
| CERT.br | Boatos | Complementar | Média/Alta |

### Módulo 6 — Resposta a Incidentes e Denúncia

Objetivo do vídeo neste módulo:

- orientar o que fazer após cair em golpe, vazamento de dados, furto de celular, invasão de conta ou prejuízo financeiro.

Candidatos:

| Fonte | Vídeo/tema | Tipo de uso | Status |
|---|---|---|---|
| MJSP / Aliança | “Sofri um golpe, e agora?” | Vídeo ou bloco de resposta | Pendente validar |
| CERT.br | Golpes: Caiu? Veja o que Fazer | Material principal | Prioritário |
| CERT.br | Vazamento de Dados | Material complementar | Prioritário |
| CERT.br | Furto de Celular | Material complementar | Prioritário |
| PF | denúncia / preservação de evidências | Biblioteca ou orientação final | Pendente validar |

---

## 7. Classificação editorial dos vídeos

Cada vídeo deverá receber uma das seguintes classificações:

| Classe | Significado | Exemplo de uso |
|---|---|---|
| Obrigatório | Vídeo integrado ao fluxo do módulo, necessário para conclusão. | Futuras videoaulas próprias ou vídeos oficiais centrais. |
| Recomendado | Aparece dentro do módulo, mas sem bloquear progressão. | Vídeos CERT.br/Cidadão na Rede sobre senhas e backup. |
| Complementar | Fica na biblioteca de vídeos, vinculado ao módulo. | Campanhas FEBRABAN e INTERPOL. |
| Aprofundamento | Conteúdo mais longo, técnico ou contextual. | Palestras, webinars e painéis. |
| Campanha | Peça curta, publicitária ou de conscientização. | FEBRABAN com Fábio Porchat; INTERPOL #ThinkTwice. |

Recomendação para a v1.6.6:

```text
Não tornar vídeos externos obrigatórios ainda.
Classificar tudo como Recomendado, Complementar, Aprofundamento ou Campanha.
Manter a lógica de videoaula obrigatória reservada para vídeos próprios ou placeholders internos.
```

---

## 8. Modelo de metadados para futura implementação

Quando a curadoria for implementada no app, recomenda-se criar um arquivo estruturado semelhante a:

```text
src/content/videoLibrary.js
```

Modelo sugerido:

```js
export const videoLibrary = [
  {
    id: 'febraban-falsa-central-2025',
    title: 'Falsa Central',
    source: 'FEBRABAN',
    campaign: 'Capricha no NÃO, que não tem golpe',
    url: 'https://youtu.be/fzZixOUV9os',
    modules: ['m4', 'm5'],
    themes: ['fraudes bancarias', 'engenharia social', 'falsa central'],
    type: 'campaign',
    priority: 'high',
    language: 'pt-BR',
    status: 'candidate-validated',
    notes: 'Peça curta de campanha antifraude com Fábio Porchat.',
  },
]
```

Campos mínimos recomendados:

```text
id
title
source
url
modules
themes
type
priority
language
status
notes
```

Campos opcionais:

```text
duration
embedUrl
thumbnail
license
accessibility
lastCheckedAt
sourcePage
```

---

## 9. Checklist de validação antes de inclusão

Para cada vídeo, preencher:

```markdown
- [ ] Link abre corretamente.
- [ ] Fonte é oficial ou confiável.
- [ ] Canal é institucional ou reconhecido.
- [ ] Tema é aderente ao módulo.
- [ ] Linguagem é adequada ao público amplo.
- [ ] Duração é compatível com uso educacional.
- [ ] Vídeo possui legenda ou compreensão suficiente.
- [ ] Não há conteúdo desatualizado ou conflitante.
- [ ] Não há promessa comercial inadequada ao curso.
- [ ] Incorporação/link externo é aceitável.
- [ ] Foi definida classificação editorial.
- [ ] Foi definido módulo principal e temas secundários.
```

---

## 10. Proposta de backlog técnico

### v1.6.6-a — Documento de curadoria

Escopo:

- criar `docs/curadoria-videos-educativos-issue-63.md`;
- consolidar fontes, critérios e matriz por módulo;
- não alterar código de produção.

Validação:

```powershell
npm run validate:content
npm run check
```

### v1.6.6-b — Estrutura de dados da biblioteca

Escopo futuro:

- criar `src/content/videoLibrary.js`;
- incluir metadados dos vídeos candidatos já validados;
- não renderizar ainda, salvo se houver componente simples.

### v1.6.6-c — Página/aba Biblioteca de Vídeos

Escopo futuro:

- criar seção visual de biblioteca;
- filtros por módulo e tema;
- cards com fonte, título, descrição e link;
- evitar dependência de iframe no primeiro momento.

### v1.6.6-d — Integração com módulos

Escopo futuro:

- exibir vídeos recomendados dentro de cada módulo;
- manter vídeos externos como complementares;
- não travar conclusão do módulo por vídeo externo.

### v1.6.6-e — Revisão de acessibilidade e UX

Escopo futuro:

- validar navegação por teclado;
- textos alternativos;
- rótulos acessíveis;
- contraste visual;
- feedback claro de link externo.

---

## 11. Comandos Git sugeridos

Criar branch:

```powershell
git checkout v1.6.0-revisao-integrada-curso
git pull origin v1.6.0-revisao-integrada-curso
git checkout -b v1.6.6-curadoria-videos-issue-63
```

Adicionar documento:

```powershell
mkdir docs
notepad docs/curadoria-videos-educativos-issue-63.md
```

Validar:

```powershell
npm run validate:content
npm run check
```

Commit:

```powershell
git add docs/curadoria-videos-educativos-issue-63.md
git commit -m "Planeja curadoria da biblioteca de videos educativos"
git push -u origin v1.6.6-curadoria-videos-issue-63
```

Abrir PR:

```powershell
gh pr create \
  --base v1.6.0-revisao-integrada-curso \
  --head v1.6.6-curadoria-videos-issue-63 \
  --title "Planeja curadoria da biblioteca de videos educativos" \
  --body "## Resumo
- Documenta critérios de curadoria para vídeos educativos.
- Mapeia fontes oficiais e institucionais por módulo.
- Prepara backlog técnico para futura biblioteca de vídeos.

## Validação
- npm run validate:content
- npm run check

Closes #63"
```

---

## 12. Prompt sugerido para Codex CLI

```text
Use o Codex CLI no repositório aicyberproject/cidadao-digital-seguro.

Objetivo: iniciar a frente v1.6.6-curadoria-videos-issue-63 a partir da branch v1.6.0-revisao-integrada-curso.

Tarefas:
1. Confirmar que a branch atual está sincronizada com origin/v1.6.0-revisao-integrada-curso.
2. Criar a branch v1.6.6-curadoria-videos-issue-63.
3. Criar o arquivo docs/curadoria-videos-educativos-issue-63.md.
4. Inserir no arquivo a curadoria editorial da biblioteca de vídeos educativos, incluindo critérios de seleção, fontes prioritárias, matriz por módulo, checklist de validação e backlog técnico.
5. Não alterar src/App.jsx, src/index.css, módulos, questionBank, package.json, workflows ou arquivos de produção.
6. Rodar npm run validate:content e npm run check.
7. Fazer commit com a mensagem: Planeja curadoria da biblioteca de videos educativos.
8. Fazer push da branch.

Escopo negativo:
- Não implementar componente visual ainda.
- Não incorporar iframes.
- Não substituir videoaulas.
- Não alterar requisitos de conclusão dos módulos.
```

---

## 13. Decisão recomendada

A Issue #63 deve ser encerrada apenas com documentação e planejamento se o objetivo for manter a série incremental segura.

A implementação visual da biblioteca de vídeos deve ser uma issue posterior, porque envolve decisões de UX, acessibilidade, estrutura de dados, cards, filtros, links externos, thumbnails e eventual incorporação de vídeos.

Recomendação final:

```text
v1.6.6 = curadoria e planejamento
v1.6.7 = estrutura de dados da biblioteca
v1.6.8 = interface visual da biblioteca
v1.6.9 = integração seletiva por módulo
```
