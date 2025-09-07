const RegistrationFormMapping = {
    'firstName': '#firstName',
    'lastName': '#lastName',
    'email': '#userEmail',
    'age': '#age',
    'salary': '#salary',
    'department': '#department',
    'submit': '#submit'
}

Cypress.Commands.add('visitWebTables', () => {
    cy.visit('/');
    cy.navigateToSection('Elements');
    cy.contains('span', 'Web Tables').click();
    cy.url().should('include', '/webtables');
});

Cypress.Commands.add('clickOnTW', (button) => {
    if (button === 'Add') {
            cy.get('#addNewRecordButton').click();
        } else if (button === 'Submit') {
            cy.get('#submit').click();
        } else if (button === 'Edit') {
            cy.get('@initialItem').then((item) => {
                cy.getRowByText(item.email).within(() => {
                    cy.wait(2000)
                    cy.get('span[id^="edit-record-"]').click();
                });
            });
        } else if (button === 'Delete') {
            cy.get('@initialItem').then((item) => {
                cy.getRowByText(item.email).within(() => {
                    cy.wait(2000)
                    cy.get('span[id^="delete-record-"]').click();
                });
            });
    }
});

Cypress.Commands.add('fillTableForm', (tableData) => {
    cy.get(RegistrationFormMapping.firstName).type(tableData.firstName);
    cy.get(RegistrationFormMapping.lastName).type(tableData.lastName);
    cy.get(RegistrationFormMapping.email).type(tableData.email);
    cy.get(RegistrationFormMapping.age).type(tableData.age);
    cy.get(RegistrationFormMapping.salary).type(tableData.salary);
    cy.get(RegistrationFormMapping.department).type(tableData.department);
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

Cypress.Commands.add('preAddItem', (item) => {
    cy.clickOnTW('Add');
    cy.fillTableForm(item);
    cy.clickOnTW('Submit');
    cy.get('.rt-tbody').should('contain', item.email)
    cy.wrap(item).as('initialItem');
})

Cypress.Commands.add('updateTableForm', (item) => {
    cy.get(RegistrationFormMapping.firstName).clear().type(item.firstName);
    cy.get(RegistrationFormMapping.lastName).clear().type(item.lastName);
    cy.get(RegistrationFormMapping.email).clear().type(item.email);
    cy.get(RegistrationFormMapping.age).clear().type(item.age);
    cy.get(RegistrationFormMapping.salary).clear().type(item.salary);
    cy.get(RegistrationFormMapping.department).clear().type(item.department);
});

Cypress.Commands.add('verifyNonExistenItem', (item) => {
    cy.get('.rt-tbody')
        .should('not.contain', item.firstName)
        .and('not.contain', item.lastName)
        .and('not.contain', item.email)
});

Cypress.Commands.add('getTableRowCount', () => {
    const tableRowsSelector = '.rt-tr-group[role="row"]:not(.-padRow)';
    return cy.get('.rt-tbody').then($tbody => {
        return $tbody.find(tableRowsSelector).length;
    });
});

Cypress.Commands.add('addTableRecord', (item) => {
    cy.clickOnTW('Add');
    cy.fillTableForm(item);
    cy.clickOnTW('Submit');
});

Cypress.Commands.add('verifyCreatedItems', (addedItems) => {
    const searchBoxSelector = '#searchBox';
    addedItems.forEach(item => {
        cy.log(`Verificando o item via busca: ${item.email}`);
        cy.get(searchBoxSelector).clear().type(item.email);
        cy.verifyTableRowData(item);
    });
    cy.get(searchBoxSelector).clear();
})

Cypress.Commands.add('removeCreatedItems', (addedItems) => {
    addedItems.forEach(item => {
        cy.log(`Deletando o item: ${item.email}`);
        cy.getRowByText(item.email).within(() => {
            cy.get('span[id^="delete-record-"]').click();
        });
    });
})