import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import users from '../../../fixtures/users.json'

When('o usuário pede para listar os detalhes de um usuário que existe', function() {
    cy.listUserDetails(users.userWithTokenAndID.token, users.userWithTokenAndID.userID);
});

Then('o sistema deve retornar os detalhes do usuário autenticado', () => {
    cy.checkUserDetailsResponse('success');
});

Given('o usuário pede para listar os detalhes de um usuário sem fornecer um token de autenticação', function() {
    cy.listUserDetails('token_invalido', users.userWithTokenAndID.userID);
});

Then('o sistema deve retornar uma mensagem de erro de autenticação', () => {
    cy.checkUserDetailsResponse('unauthorized');
});