import { When, Then } from "cypress-cucumber-preprocessor/steps";

When('que o usuário pede para listar os livros', () => {
    cy.listBooks();
});

Then('o sistema deve retornar a lista de livros disponíveis', () => {
    cy.validateBooksListResponse();
    cy.saveIsbnListFromResponse();
});
