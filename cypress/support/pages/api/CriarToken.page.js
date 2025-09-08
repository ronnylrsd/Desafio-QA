Cypress.Commands.add('postToken', (tokenPayload) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIcreateToken,
            body: tokenPayload,
            failOnStatusCode: false
        }).as('tokenResponse');
    });
});

Cypress.Commands.add('checkPostTokenResponse', (scenarioName) => {
    const scenarios = {
        success: {
            status: 200,
            validateBody: (response) => {
                expect(response.body).to.have.property('token');
                cy.wrap(response.body.token).as('token');
            }
        },
        failure: {
            status: 400,
            validateBody: (response) => {
                expect(response.body.message).to.eq("UserName and Password required.");
            }
        }
    };

    const expected = scenarios[scenarioName];
    if (!expected) {
        throw new Error(`Cenário de validação desconhecido: '${scenarioName}'`);
    }
    cy.get('@tokenResponse').then((response) => {
        expect(response.status).to.eq(expected.status);
        if (expected.validateBody) {
            expected.validateBody(response);
        }
    });
});