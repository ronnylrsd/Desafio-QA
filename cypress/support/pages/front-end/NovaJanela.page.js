const selectors = {
    newWindowButton: '#windowButton'
}

Cypress.Commands.add('visitBrowserWindowsPage', () => {
    cy.visit('/');
    cy.navigateToSection('Alerts, Frame & Windows');
    cy.navigateToSubmenu('Browser Windows');
    cy.url().should('include', '/browser-windows');
});

Cypress.Commands.add('clickNewWindowButton', () => {
    cy.get(selectors.newWindowButton).click();
});