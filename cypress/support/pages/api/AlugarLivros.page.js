Cypress.Commands.add('addBooksToCollection', (token, userId, collectionOfIsbns) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIbooks,
            headers: { 'Authorization': `Bearer ${token}` },
            body: {
                "userId": userId,
                "collectionOfIsbns": collectionOfIsbns
            },
            failOnStatusCode: false
        }).as('response');
    });
});

Cypress.Commands.add('checkBooksAPIResponse', (expectedStatus) => {
    cy.get('@response').then((response) => {
        switch (expectedStatus) {
            case 'success':
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('books');
                cy.log('**📚 Livros Adicionados:**');
                response.body.books.forEach(book => cy.log(`- ISBN: ${book.isbn}`));
                break;

            case 'idMissing':
                expect(response.status).to.eq(401);
                expect(response.body.message).to.eq("User Id not correct!");
                break;

            case 'notFound':
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq("ISBN supplied is not available in Books Collection!");
                break;
            
            default:
                throw new Error(`Status de verificação inválido: ${expectedStatus}`);
        }
    });
});