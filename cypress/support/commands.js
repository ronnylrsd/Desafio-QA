// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('setupUserAndSession', function(userCredentials) {
    cy.postUser(userCredentials).its('body.userID').as('userID').then(userID => {
        this.userID = userID;
    });

    cy.postToken(userCredentials).its('body.token').as('token').then(token => {
        this.token = token;
    });

    cy.listBooks().its('body.books').then(books => {
        const isbns = books.map(book => book.isbn);
        cy.wrap(isbns).as('isbnList');
        this.isbnList = isbns;
    });
});

Cypress.Commands.add('navigateToSection', (sectionName) => {
    cy.contains('h5', sectionName).click();
});

Cypress.Commands.add('getRowByText', (text) => {
    return cy.contains('.rt-td', text)
            .closest('.rt-tr-group');
});

Cypress.Commands.add('navigateToSubmenu', (submenuName) => {
    cy.contains('span', submenuName).click();
});