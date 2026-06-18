# Diagnóstico e Planejamento da Biblioteca e Documentos Públicos — v1.9.2

## 1. Introdução
Como parte da fase de evolução das ferramentas transversais (série v1.9.x), este documento consolida o diagnóstico da atual "Biblioteca" do curso Cidadão Digital Seguro. O objetivo é mapear o acervo existente de cartilhas, vídeos e links oficiais e planejar melhorias em sua taxonomia, filtros e critérios de inclusão, sem realizar alterações de código nesta etapa.

## 2. Diagnóstico do Estado Atual

Atualmente, o acervo está fragmentado em três bases de dados principais no diretório `src/content/`:

1.  **`library.js`**: Contém 21 documentos (em sua maioria fascículos do CERT.br e cartilhas governamentais). A estrutura possui os campos `title`, `source`, `category`, `type`, `relatedModule`, `description` e `url`. A extração de tipos e fontes é feita dinamicamente.
2.  **`videoLibrary.js`**: Contém 6 vídeos curados (campanhas da FEBRABAN, INTERPOL e MJSP). Possui um modelo de metadados mais rico, com campos como `modules` (array), `topics`, `priority` e `status`.
3.  **`officialLinks.js`**: Contém 4 links diretos para portais institucionais (PF, MJSP, FEBRABAN).

### 2.1 O que funciona bem:
- **Qualidade do Acervo**: A curadoria focou exclusivamente em fontes de alta credibilidade e materiais com forte apelo pedagógico.
- **Categorização Básica**: Os documentos e vídeos já apontam para os módulos relacionados, o que ajuda na contextualização.

### 2.2 Oportunidades de Melhoria (Lacunas):
- **Fragmentação da UI**: Na interface do usuário, documentos em texto e vídeos educativos ocupam áreas distintas, mas compartilham objetivos similares.
- **Falta de Tags (Palavras-chave)**: Diferente dos vídeos (que possuem `topics`), os documentos de `library.js` não possuem um sistema de *tags*, o que limita a eficácia de uma barra de busca para termos específicos (ex: "PIX", "vazamento").
- **Vínculos com Módulos**: Assim como no Glossário, a exibição do `relatedModule` é estática. Poderia ser transformada em uma etiqueta visual interativa (*badge*).

## 3. Diretrizes e Planejamento Futuro

Para evoluir a Biblioteca, planejam-se as seguintes ações para uma futura frente de desenvolvimento:

### 3.1 Evolução da Estrutura de Dados
1.  **Padronização de Arrays**: Alterar o campo `relatedModule` de `library.js` (que hoje é uma string como "Módulos 3 e 6") para um array `modules: ['Módulo 3', 'Módulo 6']`, facilitando filtros lógicos na UI.
2.  **Inclusão de Tags**: Adicionar o campo `tags: []` aos documentos em `library.js` para enriquecer a busca.

### 3.2 Critérios de Inclusão de Novos Materiais
Qualquer nova adição à Biblioteca deve respeitar rigorosamente as seguintes regras:
-   **Fonte Institucional**: Apenas documentos e campanhas emitidos por entidades governamentais (MJSP, Polícias), órgãos de registro/segurança técnica (CERT.br/NIC.br) ou confederações consolidadas (FEBRABAN). Não incluir blogs de tecnologia ou empresas privadas.
-   **Hospedagem na Origem**: Documentos devem apontar para a URL original da instituição (ex: domínios `.gov.br` ou `.cert.br`), garantindo autenticidade e evitando a expiração do material.
-   **Alinhamento ao Curso**: O conteúdo deve ter foco preventivo e educativo.

### 3.3 Refinamento da Interface
-   **Filtros Combinados**: Criar uma UI que permita filtrar simultaneamente por `Tipo` (Fascículo, Vídeo, Guia) e `Módulo`.
-   **Renderização Coesa**: Usar o mesmo design system de *cards* para vídeos e documentos.

## 4. Próximos Passos
Esta frente v1.9.2 é puramente documental e estratégica. Suas conclusões serão implementadas posteriormente, caso decidido pelo comitê de projeto.

**Recomendação para v1.9.3**: Seguir com o diagnóstico e planejamento da seção de **Simulações Rápidas**, avaliando como os novos conceitos lúdicos (ex: falsas centrais e QR Codes) podem ser transformados em desafios interativos.

---
Diagnóstico e planejamento registrados em 17/06/2026.
