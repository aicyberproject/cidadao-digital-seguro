# Videoaulas - evolução v1.5.2 a v1.5.7

Este documento registra a frente incremental de videoaulas do curso **Cidadão Digital Seguro**, consolidada entre as versões v1.5.2 e v1.5.7.

## Objetivo da frente

Preparar a aplicação para exibir videoaulas por módulo de forma progressiva, ainda sem incorporar mídia final. A evolução preservou o fluxo de progresso existente, manteve a marcação manual de videoaula assistida e evitou dependências, embeds, iframes ou links externos de vídeo.

## Evolução por versão

### v1.5.2 - Videoaulas nos módulos

Padronizou a presença do objeto `video` nos seis módulos do curso, mantendo linguagem explícita de preparação e duração provisória. A mudança criou a base de conteúdo para que cada módulo tivesse uma etapa de videoaula sem alterar a matriz curricular, os quizzes ou a certificação.

### v1.5.3 - Metadados pedagógicos

Acrescentou metadados pedagógicos aos objetos `video`, incluindo `status`, `objectives` e `topics`. Esses campos passaram a registrar o estado da videoaula, os objetivos de aprendizagem e os tópicos abordados, sem substituir o conteúdo didático principal do módulo.

### v1.5.4 - Renderização dos metadados

Atualizou a tela da videoaula para preservar e exibir os metadados pedagógicos. A interface passou a apresentar status, objetivos e tópicos com marcação semântica simples, mantendo o botão de conclusão e a lógica de progresso inalterados.

### v1.5.5 - Roteiros preliminares

Substituiu o texto genérico do campo `script` por roteiros preliminares curtos para futura gravação das videoaulas. Os roteiros foram escritos em linguagem cidadã, institucional e preventiva, compatível com a interface atual, sem indicar que os vídeos finais já existem.

### v1.5.6 - Layout dos roteiros

Separou o roteiro preliminar do cabeçalho visual da videoaula. O texto longo deixou de aparecer como título e passou a ser exibido em bloco próprio, com o rótulo "Roteiro preliminar", melhorando a leitura e a hierarquia da tela.

### v1.5.7 - Revisão visual final

Refinou a hierarquia visual da tela de videoaula, organizando cabeçalho, duração, status, roteiro, objetivos, tópicos e botão de conclusão. A revisão adicionou estilos específicos e pequenos para legibilidade, sem alterar conteúdo dos módulos ou regras de conclusão.

## Estado atual

A aplicação está preparada para exibir, em cada módulo:

- duração sugerida;
- status da videoaula;
- roteiro preliminar;
- objetivos da videoaula;
- tópicos abordados;
- botão de marcação da videoaula como assistida.

As videoaulas permanecem em estado preparatório. A inclusão futura de mídia final deve ser tratada como nova frente, com validação editorial, revisão de acessibilidade e decisão explícita sobre hospedagem, incorporação e fontes oficiais.

## Limites preservados

Durante a frente v1.5.2 a v1.5.7, não foram introduzidos:

- vídeo real, iframe, embed, YouTube ou link externo de mídia;
- dependências novas;
- mudanças na matriz curricular;
- alterações nos bancos de questões;
- mudanças nas regras de certificado;
- mudanças na lógica de progresso baseada em `videoDone`.
