Cypress.Commands.add('postAuth', (authPayload) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIauth,
            body: authPayload,
            failOnStatusCode: false
        }).as('response');
    });
});

Cypress.Commands.add('checkPostAuthResponse', (scenario) => {
    const scenarios = {
        success: {
            status: 200,
            validateBody: (body) => {
                expect(body).to.be.true;
            }
        },
        userNotFound: {
            status: 404,
            validateBody: (body) => {
                expect(body.message).to.eq("User not found!");
            }
        },
        failure: {
            status: 400,
            validateBody: (body) => {
                expect(body.message).to.eq("UserName and Password required.");
            }
        }
    };

    const expected = scenarios[scenario];
    if (!expected) {
        throw new Error(`Cenário de validação inválido: ${scenario}`);
    }

    cy.get('@response').then((response) => {
        expect(response.status).to.eq(expected.status);
        if (expected.validateBody) {
            expected.validateBody(response.body);
        }
    });
});