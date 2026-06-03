# GEMINI.md — Regras para Gemini CLI no Cidadão Digital Seguro

Este repositório contém a aplicação web do curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos**.

## Papel preferencial do Gemini CLI

Usar o Gemini CLI preferencialmente para:

- auditoria de escopo;
- revisão de coerência pedagógica;
- identificação de inconsistências entre módulos;
- revisão de questões e alternativas;
- checagem de clareza para público leigo;
- comparação entre conteúdo, quiz e avaliação final;
- revisão de PR antes do merge.

Evitar usar o Gemini CLI para alterações amplas e automáticas sem issue específica.

## Matriz curricular oficial

A matriz vigente é:

1. Ecossistema de Segurança Digital
2. Pilares da Higiene Digital
3. Proteção de Dispositivos e Redes
4. Transações e Consumo Seguro
5. Catálogo de Ameaças e Golpes
6. Resposta a Incidentes e Denúncia

Não alterar essa matriz sem autorização expressa.

## Separação de projetos

Não misturar este repositório com o **Projeto EaD CIBERCRIME**.

Não importar conteúdos, pacotes operacionais, nomenclaturas ou decisões curriculares de outro projeto sem pedido explícito.

## Critérios de revisão

Ao revisar conteúdo, verificar:

- clareza para público leigo;
- rigor conceitual;
- linguagem institucional, acessível e não alarmista;
- orientação preventiva;
- distinção entre prevenção, contenção de danos, preservação de provas e comunicação às instituições adequadas;
- coerência entre conteúdo do módulo, atividade, quiz e avaliação;
- ausência de fontes inventadas;
- ausência de instruções operacionais que facilitem abuso, fraude ou prática criminosa.

## Arquivos de conteúdo

Priorizar revisão de:

```text
src/content/modules/*.js
src/content/questionBank/*.js
src/content/finalAssessment.js
src/content/courseIntro.js
src/content/officialLinks.js
```
