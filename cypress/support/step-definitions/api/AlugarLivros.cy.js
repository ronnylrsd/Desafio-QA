import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import users from '../../../fixtures/users.json'
import { generateValidUser } from "../../factories/userFactory";

Given('que o usuário está autenticado com livros disponíveis', function() {
    const validUser = generateValidUser();
    cy.setupUserAndSession(validUser);
});

When('o usuário seleciona {string} livros para alugar', function(booksQtd) {
    const randomIsbns = [...this.isbnList].sort(() => 0.5 - Math.random()).slice(0, booksQtd);
    const collection = randomIsbns.map(isbn => ({ "isbn": isbn }));
    cy.addBooksToCollection(this.token, this.userID, collection);
});

Then('o sistema deve confirmar que os livros foram alugados com sucesso', () => {
    cy.checkBooksAPIResponse('success');
});

Given('que o usuário tenta realizar o aluguel sem estar autenticado', function() {
    this.token = 'token_invalido';
    this.userID = 'id_invalido';
    cy.listBooks().its('body.books').then(books => {
        this.isbnList = books.map(book => book.isbn);
    });
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
