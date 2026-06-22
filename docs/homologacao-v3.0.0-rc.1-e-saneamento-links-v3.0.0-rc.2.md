# Homologação da v3.0.0-rc.1 e Saneamento de Links Externos — v3.0.0-rc.2

Este documento consolida os resultados obtidos durante a homologação manual da versão `3.0.0-rc.1` do curso **Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos** e as ações de saneamento adotadas na versão `3.0.0-rc.2`.

---

## 1. Status Geral da Homologação (v3.0.0-rc.1)

A versão **v3.0.0-rc.1** foi avaliada por meio de auditoria de conteúdo, validação estrutural de dados e testes pontuais de fluxo. O status final é:
* **Aprovada com ressalvas não bloqueantes.**
* O fluxo pedagógico principal e todos os recursos transversais foram mantidos intactos e sem qualquer interrupção funcional.

---

## 2. Achados da Homologação Manual

### 2.1. Homologação do Fluxo Principal e Certificação
* **Fluxo Geral:** A navegação por teclado, filtros e mecanismos de progressão de leitura funcionaram adequadamente.
* **Simulações Rápidas:** As simulações transversais foram avaliadas de forma extremamente positiva, com o feedback pós-resolução atuando como reforço prático eficaz.
* **Emissão de Certificado:**
  * O gerador de PDF emitiu o certificado contendo dinamicamente a versão correta do projeto (`3.0.0-rc.1`).
  * Durante a homologação, foi gerado o certificado com o **código verificador de teste: CDS-3001-1LYHRSV**.
  * Todos os metadados do certificado foram validados.

### 2.2. Diagnóstico de Links Externos (Ressalvas Encontradas)
Durante a varredura automatizada e auditoria manual dos 40 links únicos do conteúdo pedagógico e biblioteca de documentos, foram identificados links externos inativos ou desatualizados, que constituíram as ressalvas da homologação da v3.0.0-rc.1:

* **Portal Anti-Fraude FEBRABAN:** O link antigo `https://antifraude.febraban.org.br/` (presente na biblioteca e vídeos) apresentou falha/timeout persistente.
* **Programa Celular Seguro:** O link institucional `https://www.gov.br/mj/pt-br/assuntos/celular-seguro` (presente em vídeos) retornou erro 404 (página movida).
* **CERT.br Vídeos:** O link genérico `https://cartilha.cert.br/videos/` (presente na lista de vídeos) retornou erro 404.
* **Campanhas INTERPOL (Think Twice):** O link oficial da campanha `https://www.interpol.int/en/Crimes/Cybercrime/Cyber-safety-campaigns` foi classificado como **instável** nas ferramentas de varredura automatizada devido ao bloqueio ativo de robôs/scrapers por CDN/WAF. Contudo, o link permanece **plenamente acessível para navegação humana** e foi mantido no conteúdo pedagógico.

---

## 3. Ações de Saneamento Aplicadas na v3.0.0-rc.2

Para solucionar as ressalvas encontradas na v3.0.0-rc.1 e preparar a plataforma para a entrega formal à chefia, foram aplicadas as seguintes correções na versão `3.0.0-rc.2`:

1. **Atualização do Link FEBRABAN:** 
   * Substituído o endereço inativo por `https://portal.febraban.org.br/AntiFraude/` (página oficial ativa do portal anti-fraude) em `src/content/library.js` e `src/content/videos.js`.
2. **Atualização do Link Celular Seguro:** 
   * Substituído o link antigo do Ministério da Justiça pelo link direto do serviço: `https://celularseguro.mj.gov.br/` em `src/content/videos.js`.
3. **Atualização do Link CERT.br Vídeos:** 
   * Substituído o link inativo pelo endereço oficial do projeto **Cidadão na Rede** do NIC.br/CERT.br: `https://cidadaonarede.nic.br/` em `src/content/videos.js`.
4. **Tratamento da URL da INTERPOL:**
   * A URL original foi mantida ativa, com documentação dessa ressalva técnica de bloqueio de robôs nas auditorias automatizadas para evitar alertas futuros falsos na pipeline.

---

## 4. Resultados do Validador de Conteúdo

A validação por meio dos scripts oficiais após as edições registrou o seguinte sumário estrutural de conteúdo:

```text
Totais de Conteúdo Pedagógico:
- Módulos Principais: 6 (m1 a m6)
- Quizzes dos Módulos: 30 questões cada (Total: 180)
- Questões da Avaliação Final: 18
- Itens de Glossário: 27
- Itens da Biblioteca: 21 (todos os links de fascículos certificados)
- Vídeos Educacionais: 10
- Checklists Práticos: 10
- Simulações Rápidas: 10
- Biblioteca de Vídeos Curados (Modelo): 6
```

Nenhum erro de integridade curricular, violação de isolamento de projetos (CiberCrime) ou inconsistência de dados foi encontrado.
