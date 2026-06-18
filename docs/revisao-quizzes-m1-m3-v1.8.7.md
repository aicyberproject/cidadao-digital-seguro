# Revisão Pedagógica dos Quizzes — Módulos 1 a 3 (v1.8.7)

## 1. Introdução
Esta revisão teve como objetivo alinhar os bancos de questões dos módulos 1, 2 e 3 com a camada lúdica implementada na série v1.7.x. Buscou-se reforçar, através das avaliações, os alertas de golpe e dicas técnicas que foram destacados visualmente no conteúdo.

## 2. Metodologia
- **Mapeamento de Blocos**: Identificação dos blocos "Momento É Golpe!" e "Palavra do Especialista" inseridos nos módulos 1, 2 e 3.
- **Ajuste Cirúrgico**: Alteração de enunciados e alternativas para espelhar a linguagem e os cenários apresentados nesses blocos.
- **Manutenção de Estrutura**: Garantia da permanência de exatamente 30 questões por módulo, sem alteração na lógica de pontuação ou dificuldade.

## 3. Detalhamento dos Ajustes

### Módulo 1 — Ecossistema de Segurança Digital
- **Questão m1-q009**: Refinada para adotar a marcação "Momento É Golpe!" e incluir a solicitação de instalação de aplicativos de acesso remoto, reforçando o alerta sobre falsas centrais telefônicas.

### Módulo 2 — Pilares da Higiene Digital
- **Questão m2-q013**: Refinada para tratar especificamente do phishing de códigos SMS voltado à invasão de contas (WhatsApp/e-mail), conectando-se diretamente ao bloco lúdico do Pilar 2 (2FA).

### Módulo 3 — Proteção de Dispositivos e Redes
- **Questão m3-q014**: Introduziu a metáfora do IMEI como o "chassis" do celular, termo técnico-lúdico usado pelo personagem especialista para facilitar a memorização.
- **Questão m3-q021**: Refinada para descrever o risco de engenharia social via suporte técnico falso em redes sociais, alinhando-se ao alerta de golpe inserido na Lição 4.

## 4. Validação Técnica
- **Integridade**: O script `npm run validate:content` confirmou que as questões mantêm IDs únicos, alternativas válidas e os totais exigidos.
- **Fluxo**: O build e os testes E2E confirmam que a navegação e a conclusão dos quizzes permanecem estáveis.

## 5. Conclusão
Os ajustes fortaleceram o vínculo entre o conteúdo teórico-lúdico e a avaliação de aprendizagem. O aluno agora encontra no quiz cenários idênticos aos destacados como críticos durante a leitura.

**Recomendação para v1.8.8**: Prosseguir com a revisão pedagógica dos quizzes dos **Módulos 4 a 6**, focando em transações financeiras, catálogo de ameaças e resposta a incidentes.

---
Revisão pedagógica registrada em 17/06/2026.
