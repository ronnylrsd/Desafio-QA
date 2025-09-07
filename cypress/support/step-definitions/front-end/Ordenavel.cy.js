import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('que o usuário acessa a página de interactions', () => {
    cy.visit('/');
    cy.navigateToSection('Interactions');
});

And('o usuário clica em {string} no submenu', (submenuName) => {
    cy.navigateToSubmenu(submenuName);
});

When('que o usuário ordernou a lista de forma crescente', (order) => {
    cy.sortVisibleListByNumber(order);
});

Then('o sistema deve exibir os itens de forma crescente', (order) => {
    cy.checkOrder(order);
})