import { And, Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { generateStudent, generateInvalidStudent } from '../../factories/studentFactory';

Given('que o usuário acessa a página de registro de estudante', () => {
    cy.visitStudentForm();
});

When('o usuário preenche o formulário com dados válidos', () => {
    const student = generateStudent();
    cy.wrap(student).as('studentData');
    cy.fillStudentForm(student);
});

And('o usuário clica em {string}', (button) => {
    if (button.toLowerCase() === 'submit') {
        cy.submitForm();
    } else if (button.toLowerCase() === 'close') {
        cy.closeModal();
    }
});

Then('o sistema deve exibir um pop-up de confirmação com os dados corretos', () => {
    cy.get('@studentData').then(studentData => {
        cy.verifySubmissionModal(studentData);
    });
});

Given('o usuário preenche o formulário apenas com os campos obrigatórios', () => {
    const student = generateStudent();
    const requiredFields = ['firstName', 'lastName', 'gender', 'mobile'];
    cy.wrap(student).as('studentData');
    cy.fillStudentForm(student, { fields: requiredFields });
});

Then('o sistema não deve exibir o pop-up de confirmação', () => {
    cy.verifyFormValidation();
});

Given('o usuário preenche o formulário com dados inválidos', () => {
    const invalidStudent = generateInvalidStudent();
    cy.fillStudentForm(invalidStudent, { fields: [ 'mobile'] });
});

