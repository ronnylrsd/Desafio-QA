import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { generateValidUser } from '../../factories/userFactory';

Given('que um usuário está autenticado no sistema', function() {
    const user = generateValidUser();
    cy.setupUserAndSession(user);
});

When('o usuário pede para listar seus detalhes', function() {
    cy.get('@token').then(token => {
        cy.get('@userID').then(userID => {
            cy.listUserDetails(token, userID);
        });
    });
});

Then('o sistema deve retornar os detalhes do usuário autenticado', () => {
    cy.checkUserDetailsResponse('success');
});

Given('o usuário tenta listar os detalhes sem um token de autenticação', function() {
    cy.get('@userID').then(userID => {
        cy.listUserDetails('token_invalido', userID);
    });
});

Then('o sistema deve retornar uma mensagem de erro de autenticação', () => {
    cy.checkUserDetailsResponse('unauthorized');
});