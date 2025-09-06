import { And, Given } from "cypress-cucumber-preprocessor/steps";
import { generateStudent, generateInvalidStudent } from '../../factories/studentFactory';

Given('que o usuário acessa a página de registro de estudante', () => {
    cy.visit('/');
    cy.contains('h5', 'Forms').click();
    cy.contains('span', 'Practice Form').click();
    cy.url().should('include', '/automation-practice-form');
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

Given('o usuário preenche o formulário apenas com os campos obrigatórios', () => {
    const student = generateStudent();
    const requiredFields = ['firstName', 'lastName', 'gender', 'mobile', 'birthDate'];
    cy.fillStudentForm(student, { fields: requiredFields });
});

Then('o sistema não deve exibir o pop-up de confirmação', () => {
    cy.get('.modal-content').should('not.exist');
    cy.get('body').should('not.contain', 'Thanks for submitting the form');
});

Given('o usuário preenche o formulário com dados inválidos', () => {
    const invalidStudent = generateInvalidStudent();
    const fieldsForThisTest = ['firstName', 'lastName', 'mobile', 'gender'];
    cy.fillStudentForm(invalidStudent, { fields: fieldsForThisTest });
});

