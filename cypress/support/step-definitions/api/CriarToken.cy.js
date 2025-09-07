import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import users from '../../../fixtures/users.json'
import { generateValidUser } from '../../factories/userFactory';

When('o usuário tenta criar um token com dados válidos', () => {
    const validUser = generateValidUser();
    cy.postUser(validUser).as('response');
    cy.postToken(validUser).as('response');
});

Then('o token deve ser criado com sucesso', () => {
    cy.checkPostTokenResponse('success')
});

When('o usuário tenta criar um token com dados inválidos', () => {
    cy.postToken(users.invalidUser).as('response');
});

Then('o token não é criado', () => {
    cy.checkPostTokenResponse('failure')
});