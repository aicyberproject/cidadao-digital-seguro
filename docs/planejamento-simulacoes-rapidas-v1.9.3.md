# Planejamento das Simulações Rápidas — v1.9.3

## 1. Introdução
Como parte da série v1.9.x de evolução das ferramentas transversais, este documento visa diagnosticar a estrutura atual das "Simulações Rápidas" e planejar a inserção e refinamento de cenários práticos de tomada de decisão. O objetivo é criar experiências de microlearning que testem os conceitos abordados nos módulos de forma interativa, sem interferir no fluxo principal do curso.

## 2. Diagnóstico da Estrutura Atual
A base de dados `src/content/simulations.js` suporta as Simulações Rápidas. O schema atual é composto por:
- `id`, `title`, `situation`, `scenario` (o contexto do golpe).
- `warningSigns` (lista de *red flags*).
- `options` (array contendo `label`, `isCorrect` e `feedback`).
- `finalGuidance` (dica de fechamento).
- `category` e `relatedModule`.

### 2.1 O que funciona bem
- **Feedback Imediato**: A arquitetura permite respostas corretas e incorretas com justificativas diretas, favorecendo a correção de rota em tempo real.
- **Microlearning Isolado**: A execução não bloqueia a progressão do usuário e não impacta o sistema de certificação, garantindo segurança operacional.
- **Riqueza de Metadados**: A listagem de `warningSigns` é excelente para treino de percepção de risco.

### 2.2 Oportunidades de Evolução
- **Sincronia Lúdica**: Alguns cenários já abordam golpes (ex: Falsa Central, QR Code), mas a linguagem do feedback poderia ecoar diretamente os marcadores visuais do curso, como "Momento É Golpe!".
- **Camadas de Complexidade**: As opções atuais são diretas (Certo/Errado). No futuro, o design de UX poderia incluir cenários de múltiplas etapas, embora isso não seja recomendável no escopo técnico de curto prazo para preservar a leveza.
- **Falta de Interface Pós-Escolha**: A apresentação do `feedback` e do `finalGuidance` poderia utilizar os componentes de `LudicBlocks.jsx` na UI para criar reforço visual.

## 3. Planejamento de Cenários Prioritários

A estrutura atual conta com 10 simulações que já cobrem cenários relevantes. Para a evolução do conteúdo, sugere-se garantir cobertura focada nestes temas:

1.  **Falsa Central Bancária** (Módulos 1 e 4): Testar a conduta de "interromper o contato e buscar canal oficial independente". (Já coberto, mas pode ter o feedback refinado).
2.  **QR Code Estático Fraudulento** (Módulo 4): Simular a pressão de pagar uma "taxa inesperada" e testar a conferência do recebedor na tela do banco.
3.  **Falso Suporte de TI / Acesso Remoto** (Módulo 3): Validar a rejeição de pedidos de instalação de software de controle remoto ("AnyHelp").
4.  **Perfil Falso / Smishing de Familiar** (Módulo 5): Prática da conduta de confirmar identidade por canal de voz/vídeo antes do Pix.
5.  **Golpe do "Seu dado vazou"** (Módulo 5): Treinar a não inserção de dados em links suspeitos com senso de urgência.
6.  **Preservação de Evidências (Novo Cenário sugerido)** (Módulo 6): Simular o momento exato após o golpe, testando a decisão entre "apagar por vergonha" ou "tirar print e não bloquear antes da preservação".

## 4. Critérios Pedagógicos para Feedback
- **Objetividade**: O feedback de erro não deve ser culpabilizante ("Você caiu no golpe!"), mas sim corretivo e explicativo ("Essa ação abre uma vulnerabilidade porque...").
- **Ligação Lúdica**: Empregar "Momento É Golpe!" nas explicações de cenários de engenharia social. Empregar "Palavra do Especialista" nas dicas de prevenção técnica (ex: uso do cartão virtual).
- **Independência**: A simulação deve ser compreensível mesmo por quem ainda não leu o módulo relacionado, atuando como um gatilho de curiosidade.

## 5. Próximos Passos
Esta frente v1.9.3 é puramente documental. A implementação real exigirá ajustes em `src/content/simulations.js` para adicionar/refinar os cenários, e opcionalmente em `src/App.jsx` se for decidido reutilizar os componentes do `LudicBlocks.jsx` na tela de resultados da simulação.

**Recomendação para a próxima frente**: Realizar o diagnóstico final e planejamento visual global, focando em contraste, tipografia e responsividade da interface.

---
Diagnóstico e planejamento registrados em 17/06/2026.
