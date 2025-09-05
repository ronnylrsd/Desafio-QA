import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import users from '../../../fixtures/users.json'

When('o usuário tenta criar um token com dados válidos', () => {
    cy.postToken(users.validUser).as('response');
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