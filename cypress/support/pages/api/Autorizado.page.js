Cypress.Commands.add('postAuth', (authPayload) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIauth,
            body: authPayload,
            failOnStatusCode: false
        })
    });
});

Cypress.Commands.add('checkPostAuthResponse', (expectedStatus) => {
    if (expectedStatus === 'success') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(200);
        });
    } else if (expectedStatus === 'userNotFound') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq("User not found!");
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