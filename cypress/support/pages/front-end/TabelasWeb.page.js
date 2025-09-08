const selectors = {
    registrationForm: {
        firstName: '#firstName',
        lastName: '#lastName',
        email: '#userEmail',
        age: '#age',
        salary: '#salary',
        department: '#department',
        submit: '#submit'
    },
    table: {
        addButton: '#addNewRecordButton',
        searchBox: '#searchBox',
        rowByText: (text) => cy.contains('.rt-td', text).closest('.rt-tr-group'),
        editButtonInRow: (row) => row.find('span[id^="edit-record-"]'),
        deleteButtonInRow: (row) => row.find('span[id^="delete-record-"]'),
        tbody: '.rt-tbody',
    }
}

Cypress.Commands.add('visitWebTables', () => {
    cy.visit('/');
    cy.navigateToSection('Elements');
    cy.contains('span', 'Web Tables').click();
    cy.url().should('include', '/webtables');
});

Cypress.Commands.add('clickAddButton', () => {
    cy.get(selectors.table.addButton).click();
});

Cypress.Commands.add('clickSubmitOnModal', () => {
    cy.get(selectors.registrationForm.submit).click();
});

Cypress.Commands.add('fillTableForm', (tableData) => {
    cy.get(selectors.registrationForm.firstName).clear().type(tableData.firstName);
    cy.get(selectors.registrationForm.lastName).clear().type(tableData.lastName);
    cy.get(selectors.registrationForm.email).clear().type(tableData.email);
    cy.get(selectors.registrationForm.age).clear().type(tableData.age);
    cy.get(selectors.registrationForm.salary).clear().type(tableData.salary);
    cy.get(selectors.registrationForm.department).clear().type(tableData.department);
});

Cypress.Commands.add('editRecordByEmail', (email, newData) => {
    selectors.table.rowByText(email).within(() => {
        cy.wait(2000);
        cy.get('span[id^="edit-record-"]').click();
    });
    cy.fillTableForm(newData);
    cy.clickSubmitOnModal();
});

Cypress.Commands.add('deleteRecordByEmail', (email) => {
    selectors.table.rowByText(email).within(() => {
        cy.wait(2000);
        cy.get('span[id^="delete-record-"]').click();
    });
});

Cypress.Commands.add('addNewRecord', (itemData) => {
    cy.clickAddButton();
    cy.fillTableForm(itemData);
    cy.clickSubmitOnModal();
});

Cypress.Commands.add('verifyTableRowData', (item) => {
    cy.getRowByText(item.email).within(() => {
        cy.get('.rt-td').eq(0).should('have.text', item.firstName);
        cy.get('.rt-td').eq(1).should('have.text', item.lastName);
        cy.get('.rt-td').eq(2).should('have.text', item.age);
        cy.get('.rt-td').eq(3).should('have.text', item.email);
        cy.get('.rt-td').eq(4).should('have.text', item.salary);
        cy.get('.rt-td').eq(5).should('have.text', item.department);
    });
});

Cypress.Commands.add('verifyNonExistentItem', function(item) {
    cy.get('.rt-tbody')
        .should('not.contain', item.firstName)
        .and('not.contain', item.lastName)
        .and('not.contain', item.email)
});

Cypress.Commands.add('verifyCreatedItemsRecursively', (itemsArray) => {
    if (itemsArray.length === 0) return;
    const item = itemsArray.shift();
    cy.get(selectors.table.searchBox).clear().type(item.email);
    cy.verifyTableRowData(item);
    cy.verifyCreatedItemsRecursively(itemsArray);
});

Cypress.Commands.add('removeCreatedItemsRecursively', (itemsArray) => {
    if (itemsArray.length === 0) {
        cy.get(selectors.table.searchBox).clear();
        return;
    };
    const item = itemsArray.shift();
    cy.get(selectors.table.searchBox).clear().type(item.email);
    cy.deleteRecordByEmail(item.email);
    cy.verifyNonExistentItem(item);
    cy.removeCreatedItemsRecursively(itemsArray);
});