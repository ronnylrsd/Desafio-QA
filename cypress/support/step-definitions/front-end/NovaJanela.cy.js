import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('que o usuário acessa a página de alertas, quadros e janelas', () => {
    cy.visit('/');
    cy.navigateToSection('Alerts, Frame & Windows');
    cy.url().should('include', '/alertsWindows');
});

When('o usuário clica no submenu {string}', (submenu) => {
    cy.contains('span', submenu).click();
    cy.url().should('include', '/browser-windows');
});

And('o usuário clica no botão {string}', (button) => {
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('#windowButton').click();
});

Then('o sistema deve tentar abrir uma nova janela', () => {
    cy.get('@windowOpen').should('be.called');
});

And('a página de exemplo deve ter o título {string}', (title) => {
    cy.visit('/sample');
    cy.get('#sampleHeading').should('have.text', title);
});

And('o usuário fecha a nova janela', () => {
    cy.go('back');
    cy.url().should('include', '/browser-windows');
});