# Planejamento da Fase de Ferramentas Transversais — v1.9.0

## 1. Objetivo da Fase v1.9.x
Após a consolidação da camada lúdica e avaliativa na série v1.8.x, a fase v1.9.x visa planejar e evoluir as ferramentas transversais do curso Cidadão Digital Seguro. O objetivo é aprimorar as áreas de apoio ao aluno (Glossário, Biblioteca e Simulações Rápidas), além de garantir a coesão estética e funcional por meio de uma auditoria visual global, fortalecendo a experiência pedagógica sem alterar o núcleo do curso.

## 2. Escopo e Fora de Escopo

**No Escopo:**
- Diagnóstico estrutural, pedagógico e visual das ferramentas transversais.
- Planejamento de melhorias baseadas em categorização, exemplos práticos e cenários lúdicos.
- Auditoria de consistência, responsividade e acessibilidade global.

**Fora de Escopo:**
- Implementação de novas funcionalidades nesta versão (v1.9.0).
- Alteração da lógica core (App.jsx, LudicBlocks.jsx, index.css).
- Inserção de novas dependências, alteração de localStorage, certificado ou lógica de progresso.
- Modificação dos módulos de conteúdo ou questionBank.

## 3. Diagnóstico do Estado Atual
Atualmente, as ferramentas transversais existem e operam com sucesso básico. No entanto, podem ser otimizadas para maior engajamento e clareza:
- **Glossário**: Funcional, mas pode ser enriquecido com categorias e exemplos práticos contextualizados.
- **Biblioteca / Documentos Públicos**: Possui documentos básicos, mas requer melhor organização de cartilhas, fascículos e materiais oficiais para facilitar a consulta contínua.
- **Simulações Rápidas**: Operacionais, mas podem ser expandidas para abordar cenários trabalhados na camada lúdica (QR Code, falsa central, falso suporte, preservação de evidências).

## 4. Matriz das Frentes Candidatas

| Frente Candidata | Descrição e Potencial de Melhoria |
| :--- | :--- |
| **A) Glossário** | Inclusão de categorias temáticas, exemplos práticos de aplicação de cada termo e links cruzados com módulos. |
| **B) Biblioteca / Documentos públicos** | Curadoria e indexação aprimorada de cartilhas, fascículos e documentos oficiais (ex: cartilhas do CERT.br e FEBRABAN). |
| **C) Simulações rápidas** | Desenvolvimento de novos cenários práticos (QR Code estático fraudulento, ligações de falsa central, interações de falso suporte e simulação de preservação de evidências). |
| **D) Auditoria visual global** | Revisão de toda a interface para assegurar consistência tipográfica, espaçamentos, responsividade impecável em mobile e aderência estrita às regras de acessibilidade (WCAG). |

## 5. Critérios de Priorização
A definição da sequência das próximas frentes baseia-se nos seguintes critérios:
- **Impacto Pedagógico**: Valor direto gerado para o aprendizado e retenção do aluno.
- **Baixo Risco Técnico**: Preferência por frentes que exijam pouca ou nenhuma alteração estrutural profunda.
- **Reutilização de Material Oficial**: Aproveitamento de fontes confiáveis (governo, FEBRABAN, CERT.br).
- **Compatibilidade Arquitetural**: Alinhamento natural com o código React/CSS atual.
- **Zero Novas Dependências**: Manutenção do peso leve da aplicação.
- **Preservação de Fluxos Críticos**: Garantia absoluta de não interferência no fluxo de progresso e certificação.

## 6. Riscos Técnicos e Pedagógicos
- **Risco Técnico**: Modificações no Glossário ou Biblioteca poderiam inadvertidamente introduzir bugs de renderização caso listas muito longas não sejam bem manipuladas.
    - *Mitigação*: Manter a abordagem baseada em componentes simples e evitar paginação ou requisições complexas não essenciais.
- **Risco Pedagógico**: Simulações Rápidas podem tornar-se confusas se não houver feedback claro e imediato, desviando a atenção do conteúdo modular.
    - *Mitigação*: Seguir a mesma sobriedade e brevidade utilizadas nas microinterações da v1.8.x.

## 7. Sequência Recomendada para a Série v1.9.x

A ordem proposta para a execução metódica e isolada das frentes é:

- **v1.9.0**: Planejamento documental da fase (versão atual).
- **v1.9.1**: Diagnóstico e planejamento específico do **Glossário**.
- **v1.9.2**: Diagnóstico e planejamento específico da **Biblioteca / Documentos públicos**.
- **v1.9.3**: Planejamento das **Simulações Rápidas** ou **Auditoria Visual Global** (decisão a ser avaliada após a v1.9.2 com base no esforço residual e tempo disponível).
