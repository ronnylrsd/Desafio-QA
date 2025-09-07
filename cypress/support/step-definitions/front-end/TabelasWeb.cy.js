import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { generateTableItem } from "../../factories/tableItemFactory";

Given('que o usuário acessa a página de tabelas da web', () => {
    cy.visitWebTables()
});

When('o usuário aperta no botão {string}', (button) => {
    cy.clickOnTW(button)
});

And('o usuário preenche o formulário para a tabela com dados válidos', () => {
    const tableItem = generateTableItem();
    cy.fillTableForm(tableItem);
    cy.wrap(tableItem).as('submittedItem');
});

Then('o sistema deve adicionar o novo registro à tabela', function() {
    cy.get('@submittedItem').then(item => {
        cy.verifyTableRowData(item);
    });
});

Given('que um registro foi adicionado à tabela com dados conhecidos', () => {
    const initialItem = generateTableItem();
    cy.preAddItem(initialItem);
});

And('o usuário edita este registro com novos dados válidos', () => {
    const updatedItem = generateTableItem();
    cy.wrap(updatedItem).as('updatedItem');
    cy.updateTableForm(updatedItem);
});

Then('o sistema deve atualizar o registro na tabela com os novos dados', function() {
    cy.get('@updatedItem').then(item => {
        cy.verifyTableRowData(item);
    });
});

Then('o sistema deve atualizar o registro na tabela sem os novos dados', function() {
    cy.get('@initialItem').then((item) => {
        cy.verifyNonExistenItem(item);
    });
});

Given('que o usuário cria {string} registros', function(itemsQtt) {
    const count = parseInt(itemsQtt);
    const addedItems = [];
    for (let i = 0; i < count; i++) {
        const newItem = generateTableItem();
        addedItems.push(newItem);
        cy.addTableRecord(newItem);
    }
    cy.wrap(addedItems).as('addedItems');
});

Then('o sistema deve atualizar a tabela com os registros', () => {
    cy.get('@addedItems').then(addedItems => {
        cy.verifyCreatedItems(addedItems);
    });
})

And('o usuário deleta todos os novos registros criados', () => {
    cy.get('@addedItems').then(addedItems => {
        cy.removeCreatedItems(addedItems);
    });
})