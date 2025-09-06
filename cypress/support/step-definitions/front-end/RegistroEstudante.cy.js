import { And, Given } from "cypress-cucumber-preprocessor/steps";
import { generateStudent } from '../../factories/studentFactory';

Given('que o usuário acessa a página de registro de estudante', () => {
    cy.visit('/automation-practice-form');
});

When('o usuário preenche o formulário com dados válidos', () => {
    const student = generateStudent();
    cy.fillStudentForm(student);
});

And('o usuário clica em {string}', (button) => {
    cy.clickOn(button);
});

Then('o sistema deve exibir um pop-up de confirmação com os dados corretos', function() {
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('have.text', 'Thanks for submitting the form');
});