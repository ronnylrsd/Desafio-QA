import { When, Then } from "cypress-cucumber-preprocessor/steps";
import users from '../../../fixtures/users.json'

When('o usuário tenta entrar com dados válidos', () => {
    cy.postAuth(users.validUser).as('response');
});

Then('o usuário deve estar autorizado', () => {
    cy.checkPostAuthResponse('success')
});

When('o usuário tenta entrar com dados inválidos', () => {
    cy.postAuth(users.userWithBadPassword).as('response');
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