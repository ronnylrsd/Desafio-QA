Cypress.Commands.add('postToken', (tokenPayload) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIcreateToken,
            body: tokenPayload,
            failOnStatusCode: false
        });
    });
});

Cypress.Commands.add('checkPostTokenResponse', (expectedStatus) => {
    if (expectedStatus === 'success') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            cy.wrap(response.body.token).as('token');
        });
    } else if (expectedStatus === 'failure') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq("UserName and Password required.");
        });
    } else {
        throw new Error('Invalid expectedStatus value');
    }
});