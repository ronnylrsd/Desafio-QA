import { When, Then } from "cypress-cucumber-preprocessor/steps";

When('que o usuário pede para listar os livros', () => {
    cy.listBooks().as('response');
});

Then('o sistema deve retornar a lista de livros disponíveis', () => {
    cy.checkListBooksResponse();
});
