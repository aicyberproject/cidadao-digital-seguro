# Homologação Institucional, Jurídica e de Conteúdo Sensível — v2.9.0

Este documento consolida a revisão e homologação de conteúdo sensível para o curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**, realizada na branch `v2.9.0-homologacao-institucional`. 

O objetivo desta revisão é garantir conformidade institucional, jurídica e de comunicação preventiva, evitando riscos de falsas expectativas, orientações juridicamente inadequadas ou incentivo a ações autônomas pelo cidadão.

## 1. Diretrizes de Homologação Aplicadas

1. **Mitigação de Promessa de Recuperação de Valores:** Garantir que o curso não sugira que a devolução ou recuperação de valores financeiros perdidos em fraudes digitais é garantida ou fácil, destacando o papel das instituições financeiras e do Mecanismo Especial de Devolução (MED) como tentativas administrativas rápidas, sem garantia de sucesso.
2. **Mitigação de Promessa de Identificação de Criminosos:** Evitar qualquer afirmativa de que os autores dos golpes serão necessariamente identificados ou punidos, resguardando o caráter técnico das investigações criminais conduzidas pelas autoridades competentes.
3. **Desestímulo à Investigação ou Confronto Autônomo:** Garantir que todas as diretrizes de "primeira resposta" ao cidadão orientem a interrupção imediata do contato com suspeitos, a preservação de evidências digitais e o acionamento de canais oficiais, desestimulando expressamente tentativas de confrontar, negociar ou investigar de forma independente.
4. **Alinhamento Terminológico (Evidências vs. Provas):** Ajustar o termo "provas" para "evidências digitais" quando direcionado às ações do próprio cidadão (preservando o termo técnico "provas" apenas em discussões sobre o processo judicial/institucional ou na terminologia de delegacias).
5. **Destaque a Canais Oficiais:** Reforçar a necessidade de os participantes entrarem em contato com bancos, operadoras, plataformas e órgãos públicos utilizando exclusivamente os canais oficiais independentes e certificados.

---

## 2. Diagnóstico e Alterações Realizadas

### 2.1. Nomenclatura Cidadã (Evidências Digitais)
* **`src/content/courseIntro.js`:**
  * *Original:* `'Preservar provas e usar o canal correto em caso de incidente'`
  * *Modificado para:* `'Preservar evidências digitais e usar o canal correto em caso de incidente'`
* **`src/content/checklists.js`:**
  * *Original (situação):* `'Fui vítima de um crime ou golpe e preciso guardar provas.'`
  * *Modificado para:* `'Fui vítima de um crime ou golpe e preciso guardar evidências digitais.'`
  * *Original (descrição):* `'Garanta que as provas sejam válidas para uma investigação.'`
  * *Modificado para:* `'Garanta que as evidências sejam preservadas adequadamente para uso oficial.'`
  * *Original (finalGuidance):* `'Provas digitais são voláteis. Guarde tudo imediatamente após o incidente.'`
  * *Modificado para:* `'Evidências digitais são voláteis. Guarde tudo imediatamente após o incidente.'`
  * *Original (item checklist):* `'Registre um Boletim de Ocorrência (BO) detalhando o ocorrido e as provas.'`
  * *Modificado para:* `'Registre um Boletim de Ocorrência (BO) detalhando o ocorrido e anexando as evidências salvas.'`
* **`src/content/videos.js`:**
  * *Original (tag):* `'preservação de provas'`
  * *Modificado para:* `'preservação de evidências'`
* **`src/content/glossary.js`:**
  * *Original (definição):* `'Ato de guardar provas de um crime digital (prints, e-mails, extratos) sem alterá-las, para uso em investigações.'`
  * *Modificado para:* `'Ato de salvar e guardar registros de um incidente digital (como prints, e-mails, comprovantes e extratos) sem alterá-los, para apresentação às instituições competentes.'`
  * *Original (guidance):* `'Não apague as conversas com o golpista antes de registrar a ocorrência ou fazer uma ata notarial.'`
  * *Modificado para:* `'Não apague as conversas com perfis suspeitos antes de salvar todas as telas e informações importantes.'`

### 2.2. Prevenção de Promessa de Recuperação de Valores e Reembolso
* **`src/content/checklists.js`:**
  * *Original (item compras):* `'Dê preferência a plataformas que garantam a entrega ou devolvam o dinheiro.'`
  * *Modificado para:* `'Dê preferência a plataformas com sistemas de pagamento garantido e políticas claras de reembolso.'`
  * *Original (finalGuidance pós-golpe):* `'Agir rápido aumenta as chances de recuperação de valores e proteção de terceiros.'`
  * *Modificado para:* `'Agir rápido ao acionar as instituições oficiais pelos canais de atendimento autorizados ajuda na contenção de danos e na proteção de terceiros.'`

---

## 3. Coerência do Banco de Questões e Avaliação Final
Após varredura completa por termos de risco nos bancos de questões (`src/content/questionBank/`) e na Avaliação Final (`src/content/finalAssessment.js`), constatou-se que as estruturas de distratores de múltipla escolha e os feedbacks já diferenciam de forma excelente:
* **Tentar identificar o criminoso por conta própria** é sistematicamente classificado como conduta incorreta e perigosa (Ex: `m1-q008`, `finalAssessment`).
* **Preservar evidências digitais** é contextualizado como auxílio na apuração das autoridades, e não como uma garantia automática de restituição de dinheiro (Ex: `m1-q007`).
* O banco de questões desencoraja ativamente negociações diretas ou confrontos com suspeitos digitais, em conformidade com as diretrizes institucionais vigentes.

---

## 4. Resultados de Validação Técnica

* **`npm run validate:content`:** Aprovado (nenhum erro estrutural de conteúdo ou inconsistência curricular detectada).
* **`npm run check` (Build e E2E):** Todo o fluxo de simulação, quizzes e emissão de certificado continua 100% operacional.
