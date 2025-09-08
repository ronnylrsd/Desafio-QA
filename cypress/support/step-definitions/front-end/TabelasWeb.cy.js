import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { generateTableItem } from "../../factories/tableItemFactory";

Given('que o usuário está na página de tabelas da web', () => {
    cy.visitWebTables();
});

When('o usuário adiciona um novo registro com dados válidos', () => {
    const item = generateTableItem();
    cy.wrap(item).as('itemData');
    cy.addNewRecord(item);
});

Then('o registro deve ser exibido corretamente na tabela', () => {
    cy.get('@itemData').then(item => {
        cy.verifyTableRowData(item);
    });
});

Given('que um registro foi adicionado à tabela', () => {
    const item = generateTableItem();
    cy.addNewRecord(item);
    cy.wrap(item).as('initialItem');
});

When('o usuário edita este registro com novos dados', () => {
    const updatedItem = generateTableItem();
    cy.wrap(updatedItem).as('updatedItem');
    cy.get('@initialItem').then(initialItem => {
        cy.editRecordByEmail(initialItem.email, updatedItem);
    });
});

Then('o registro deve ser exibido na tabela com os dados atualizados', () => {
    cy.get('@updatedItem').then(item => {
        cy.verifyTableRowData(item);
    });
});

When('o usuário remove este registro', () => {
    cy.get('@initialItem').then(item => {
        cy.deleteRecordByEmail(item.email);
    });
});

Then('o registro não deve mais ser exibido na tabela', () => {
    cy.get('@initialItem').then(item => {
        cy.verifyNonExistentItem(item);
    });
});

When("o usuário adiciona {string} novos registros na tabela", (countStr) => {
    const count = parseInt(countStr);
    const addedItems = Cypress._.times(count, generateTableItem);
    cy.wrap(addedItems).as('addedItems');

    function addItemsRecursively(items) {
        if (items.length === 0) return;
        const item = items.shift();
        cy.addNewRecord(item);
        addItemsRecursively(items);
    }
    addItemsRecursively([...addedItems]);
});

Then('todos os {string} registros devem existir na tabela', () => {
    cy.get('@addedItems').then(items => {
        cy.verifyCreatedItemsRecursively([...items]);
    });
});

And('o usuário remove todos os registros criados', () => {
    cy.get('@addedItems').then(items => {
        cy.removeCreatedItemsRecursively([...items]);
    });
});

Then('eles não devem mais ser exibidos na tabela', () => {
    cy.get('@addedItems').then(addedItems => {
        addedItems.forEach(item => {
            cy.verifyNonExistentItem(item);
        });
    });
});