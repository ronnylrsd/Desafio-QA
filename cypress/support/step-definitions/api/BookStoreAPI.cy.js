import { Given, When, And, Then, Before, After } from 'cypress-cucumber-preprocessor/steps'

When('eu criar um usuário com dados válidos' , () => {
    cy.createUser()
});

Then('o usuário deve ser criado com sucesso', () => {
    cy.validateUserCreation()
});