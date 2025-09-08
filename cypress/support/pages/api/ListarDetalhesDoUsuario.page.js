Cypress.Commands.add('listUserDetails', (token, userId) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'GET',
            url: `${urls.APIuser}/${userId}`,
            headers: { 'Authorization': `Bearer ${token}` },
            failOnStatusCode: false
        }).as('response').then((response) => {
            if (response.status === 200) {
                cy.log('**📋 Detalhes do Usuário:**');
                cy.log(`- ID do Usuário: ${response.body.userId}`);
                cy.log(`- Nome de Usuário: ${response.body.username}`);
                if (response.body.books && response.body.books.length > 0) {
                    cy.log('- Livros Alugados:');
                    response.body.books.forEach(book => cy.log(`  - ISBN: ${book.isbn}, Título: ${book.title}`));
                } else {
                    cy.log('- Nenhum livro alugado.');
                }
            }
        });
    });
});

Cypress.Commands.add('checkUserDetailsResponse', (scenario) => {
    const scenarios = {
        success: {
            status: 200,
            validateBody: (body) => {
                expect(body).to.have.property('userId');
                expect(body).to.have.property('username');
                expect(body).to.have.property('books');
            }
        },
        unauthorized: {
            status: 401,
            validateBody: (body) => {
                expect(body.message).to.eq("User not authorized!");
            }
        }
    };

    const expected = scenarios[scenario];
    if (!expected) throw new Error(`Cenário de validação inválido: ${scenario}`);

    cy.get('@response').then((response) => {
        expect(response.status).to.eq(expected.status);
        if (expected.validateBody) {
            expected.validateBody(response.body);
        }
    });
});