import { When, Then } from "cypress-cucumber-preprocessor/steps";
import users from '../../../fixtures/users.json'
import { generateValidUser } from "../../factories/userFactory";

When('o usuário tenta entrar com dados válidos', () => {
    const validUser = generateValidUser();
    cy.postUser(validUser);
    cy.log(validUser.userName)
    cy.log(validUser.password)
    cy.postAuth(validUser).then((response) => {
        cy.log('Auth response: ' + JSON.stringify(response.body));
        cy.wrap(response).as('response');
    });
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