import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('que o usuário está na página de Janelas do Navegador', () => {
    cy.visitBrowserWindowsPage();
});

When('o usuário clica para abrir uma nova janela', () => {
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('#windowButton').click();
});

Then('uma nova janela com a página de exemplo deve ser aberta', () => {
    cy.get('@windowOpen').should('be.calledWith', '/sample');
});

And('a página de exemplo deve ter o título {string}', (title) => {
    cy.visit('/sample');
    cy.get('#sampleHeading').should('have.text', title);
});

And('o usuário fecha a nova janela', () => {
    cy.go('back');
    cy.url().should('include', '/browser-windows');
});