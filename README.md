<h1 align="center">Projeto de Automação de Testes E2E - DemoQA</h1>

<h3 align="center">Testes de API e Front-End com Cypress e Cucumber</h3>

![Aplicação testada Parte 1](https://github.com/user-attachments/assets/c8164350-ad1a-4bd1-bb0f-f90901112910)
![Aplicação testada Parte 2](https://github.com/user-attachments/assets/b000d218-b2bd-465b-a96b-a604846e4205)
<br>

## 💻 Projeto

Este projeto foi criado para aplicar e demonstrar conhecimentos avançados em testes automatizados E2E. Utilizando **Cypress** e **Cucumber (Gherkin)**, a suíte valida múltiplos fluxos e regras de negócio da aplicação [DemoQA](https://demoqa.com), cobrindo tanto cenários de **Front-End (UI)** quanto de **API**.

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- **NodeJS:** Ambiente de execução JavaScript.
- **Cypress:** Framework principal para a automação de testes E2E.
- **Cucumber:** Ferramenta para desenvolvimento orientado por comportamento (BDD).
- **Gherkin:** Linguagem para escrita das especificações de teste (`.feature`).
- **Faker.js:** Biblioteca para geração de dados de teste dinâmicos e massivos.
- **@4tw/cypress-drag-drop:** Plugin para interações de arrastar e soltar (Drag and Drop).
- **cypress-cucumber-preprocessor:** Plugin para integrar Cucumber e Cypress.

## 💡 Padrões e Práticas de Engenharia de Testes

Este projeto foi desenvolvido seguindo práticas modernas de engenharia de qualidade, focando em criar testes robustos, manuteníveis e escaláveis:

- **BDD (Behavior-Driven Development):** As features são escritas em Gherkin, servindo como uma "documentação viva" que descreve o comportamento esperado da aplicação de forma clara para todos os stakeholders.

- **Organização com Módulos de Comandos:** Adotamos uma abordagem pragmática para o Page Object Model. Em vez de classes, cada funcionalidade tem seu próprio "módulo de comandos" (`.page.js`) que centraliza seletores e ações de alto nível, mantendo os testes limpos e organizados.

- **Fábricas de Dados Dinâmicos (Data Factories):** Para garantir a independência e a resiliência dos testes, utilizamos o Faker.js para criar dados únicos a cada execução (ex: usuários, senhas). Esta abordagem é superior ao uso de `fixtures` estáticas, pois evita conflitos de estado e torna os testes autocontidos.

- **Comandos Customizados de Alto Nível:** Ações complexas e reutilizáveis foram abstraídas em comandos (`cy.addNewRecord()`, `cy.setupUserAndSession()`), criando uma DSL (Linguagem de Domínio Específico) que torna os steps dos testes extremamente legíveis e declarativos.

- **Estratégias para Testes Robustos:** Foram aplicadas técnicas avançadas para eliminar instabilidade ("flakiness"):
    - **Comandos Recursivos:** Para interações complexas que modificam o DOM em sequência (como ordenação de listas e criação/deleção em massa), utilizamos comandos recursivos para garantir que cada ação termine antes da próxima começar, respeitando a fila de comandos do Cypress.

## ⚙️ Configuração do Ambiente
Siga os passos abaixo para configurar o ambiente e rodar os testes localmente:

1.  **Pré-requisitos:**
    - [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
    - [Visual Studio Code](https://code.visualstudio.com/) (ou outro editor de sua preferência)

2.  **Instalação:**
    - Clone o repositório: `git clone [URL_DO_SEU_REPOSITÓRIO]`
    - Navegue até a pasta: `cd [NOME_DA_PASTA]`
    - Instale as dependências: `npm install`

## 🚀 Como executar

- Rode o comando `npx cypress open` para abrir a interface gráfica do cypress ou `npx cypress run` para rodar em background.

## 📱 Exemplos de telas

### Preenchimento de Formulário com Sucesso
![Preenchimento de Formulário com Sucesso](https://github.com/user-attachments/assets/f1a2807c-70e8-4b44-8ca2-33943d708c4d)

### Validação de Campos Obrigatórios
![Validação de Campos Obrigatórios](https://github.com/user-attachments/assets/24a0017b-1cf7-4313-ba2f-f05f13578efe)

### Interação com Tabela (Adicionar/Remover)
![Interação com Tabela (Adicionar/Remover)](https://github.com/user-attachments/assets/e6dde930-097d-4c89-a9ac-d33c4f9ef5ed)


## 🔭 OBSERVAÇÕES

- Os testes foram desenhados para serem independentes, criando e limpando seus próprios dados quando necessário.
- A suíte inclui testes de cenários positivos e de validação de erros (caminho infeliz).
- A API da aplicação DemoQA demonstrou instabilidades e bugs durante os testes (ex: enviar campos vazios).

## 👷 COLABORADOR

#### Nome: Ronny Lima Ribeiro da Silva
- LinkedIn: [ronnylrsd](https://www.linkedin.com/in/ronnylrsd/)
- GitHub: [ronnylrsd](https://github.com/ronnylrsd)
