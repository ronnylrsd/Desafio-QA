import { When, Then } from "cypress-cucumber-preprocessor/steps";
import users from '../../../fixtures/users.json'
import { generateValidUser } from "../../factories/userFactory";

When('o usuário tenta entrar com dados válidos', () => {
    const validUser = generateValidUser();
    cy.postUser(validUser);
    cy.postAuth(validUser);
});

Then('o usuário deve estar autorizado', () => {
    cy.checkPostAuthResponse('success')
});

When('o usuário tenta entrar com dados inválidos', () => {
    const validUser = generateValidUser();
    cy.postUser(validUser);
    const credentialsWithWrongPass = {
        userName: validUser.userName,
        password: 'senha-errada-propositalmente'
    };
    cy.postAuth(credentialsWithWrongPass);
});

Then('o usuário não deve estar autorizado com dados inválidos', () => {
    cy.checkPostAuthResponse('userNotFound')
});

When('o usuário tenta entrar sem dados', () => {
    cy.postAuth(users.invalidUser).as('response');
});

Then('o usuário não deve estar autorizado com campos vazios', () => {
    cy.checkPostAuthResponse('failure')
});