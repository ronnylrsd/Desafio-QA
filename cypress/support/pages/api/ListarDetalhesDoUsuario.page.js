Cypress.Commands.add('listUserDetails', (token, userId) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'GET',
            url: `${urls.APIuser}/${userId}`,
            headers: { 'Authorization': `Bearer ${token}` },
            failOnStatusCode: false
        }).as('response').then((response) => {
            cy.log('**📋 Detalhes do Usuário:**')
            cy.log(`- ID do Usuário: ${response.body.userId}`)
                cy.log(`- Nome de Usuário: ${response.body.username}`)
                if (response.body.books && response.body.books.length > 0) {
                    cy.log('- Livros Alugados:')
                    response.body.books.forEach(book => cy.log(`  - ISBN: ${book.isbn}, Título: ${book.title}`))
                    } else {
                        cy.log('- Nenhum livro alugado.')
                        };
        });
    });
});

Cypress.Commands.add('checkUserDetailsResponse', (expectedStatus) => {
    if (expectedStatus === 'success') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('userId');
            expect(response.body).to.have.property('username');
            expect(response.body).to.have.property('books');
        });
    } else if (expectedStatus === 'unauthorized') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq("User not authorized!");
        });
    } else {
        throw new Error(`Status de verificação inválido: ${expectedStatus}`);
    }
});