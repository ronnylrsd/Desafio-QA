Cypress.Commands.add('postUser', (userPayload) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIcreateUser,
            body: userPayload,
            failOnStatusCode: false
        }).as('userResponse');
    });
});

Cypress.Commands.add('checkPostUserResponse', (scenario) => {
    const scenarios = {
        success: {
            status: 201,
            validateBody: (body) => {
                expect(body).to.have.property('userID');
                expect(body).to.have.property('username');
                cy.wrap(body.userID).as('userID');
            }
        },
        badPassword: {
            status: 400,
            validateBody: (body) => {
                expect(body.message).to.include("Passwords must have at least one non alphanumeric character");
            }
        },
        existingUser: {
            status: 406,
            validateBody: (body) => {
                expect(body.message).to.eq("User exists!");
            }
        },
        emptyFields: {
            status: 400,
            validateBody: (body) => {
                expect(body.message).to.eq("UserName and Password required.");
            }
        }
    };

    const expected = scenarios[scenario];
    if (!expected) throw new Error(`Cenário de validação inválido: ${scenario}`);
    cy.get('@userResponse').then((response) => {
        expect(response.status).to.eq(expected.status);
        if (expected.validateBody) {
            expected.validateBody(response.body);
        }
    });
});