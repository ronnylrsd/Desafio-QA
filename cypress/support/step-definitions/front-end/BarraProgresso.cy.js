import { And, Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('que o usuário acessa a página de widgets', () => {
    cy.visit('/');
    cy.navigateToSection('Widgets');
});

And('o usuário clica em {string} no submenu', (submenuName) => {
    cy.navigateToSubmenu(submenuName);
});

When('o usuário inicia o progresso da barra', () => {
    cy.clickOn('Start');
});

And('para antes dos {string}%', function(maxValueStr) {
    const maxValue = parseInt(maxValueStr);
    const minValue = maxValue - 5;
    this.maxValue = maxValue;

    cy.stopProgressBarInRange(minValue, maxValue);
});

Then('o sistema deve mostrar um valor menor ou igual ao escolhido', function() {
    cy.getProgressBarValue().then(finalValue => {
        cy.log(`Valor final: ${finalValue} | Valor máximo esperado: < ${this.maxValue}`);
        expect(finalValue).to.be.lessThan(this.maxValue);
    });
});

When('o usuário continuar o progresso', () => {
    cy.clickOn('Start');
});

And('chegar aos 100%', () => {
    cy.waitOneHundredPerCent()
});

And('o usuário clica em resetar', () => {
    cy.clickOn('Reset');
});

Then('o valor da barra deve ser resetada', () => {
    cy.checkReset();
});