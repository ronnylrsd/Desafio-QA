import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { generateValidUser } from "../../factories/userFactory";

Given('que o usuário está autenticado com livros disponíveis', function() {
    const validUser = generateValidUser();
    cy.setupUserAndSession(validUser);
});

When('o usuário seleciona {string} livros para alugar', function(booksQtd) {
    cy.pickRandomBooks(booksQtd);
    cy.get('@token').then(token => {
        cy.get('@userID').then(userID => {
            cy.get('@collectionToRent').then(collection => {
                cy.addBooksToCollection(token, userID, collection);
            });
        });
    });
});

Then('o sistema deve confirmar que os livros foram alugados com sucesso', () => {
    cy.checkBooksAPIResponse('success');
});

// Remova o 'Dado que o usuário tenta realizar o aluguel sem estar autenticado'

When('o usuário tenta alugar um livro sem estar autenticado', function() {
    const invalidToken = 'token_invalido';
    const invalidUserId = 'id_invalido';
    const fakeCollection = [{ "isbn": "9781449325862" }];
    cy.addBooksToCollection(invalidToken, invalidUserId, fakeCollection);
});

Then('o sistema deve retornar uma mensagem de erro de campo inválido', () => {
    cy.checkBooksAPIResponse('idMissing');
});

When('o usuário seleciona um livro com ID inválido para alugar', function () {
    const invalidCollection = [{ "isbn": "0000000000000" }];
    cy.addBooksToCollection(this.token, this.userID, invalidCollection);
});

Then('o sistema deve retornar uma mensagem de erro de livro não encontrado', () => {
    cy.checkBooksAPIResponse('notFound');
});
