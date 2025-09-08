Cypress.Commands.add('listBooks', () => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'GET',
            url: urls.APIbooks,
            failOnStatusCode: false
        }).as('booksResponse');
    });
});

Cypress.Commands.add('validateBooksListResponse', () => {
    cy.get('@booksResponse').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('books');
        expect(response.body.books).to.be.an('array').that.is.not.empty;
        response.body.books.forEach(book => {
            expect(book).to.have.all.keys('isbn', 'title', 'subTitle', 'author', 'publish_date', 'publisher', 'pages', 'description', 'website');
        });
    });
});

Cypress.Commands.add('saveIsbnListFromResponse', () => {
    cy.get('@booksResponse').then((response) => {
        const isbnList = response.body.books.map(book => book.isbn);
        cy.wrap(isbnList).as('isbnList');
    });
});