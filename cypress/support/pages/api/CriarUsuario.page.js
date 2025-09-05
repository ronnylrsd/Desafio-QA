Cypress.Commands.add('postUser', (userPayload) => {
    cy.fixture('urls.json').then((urls) => {
        cy.request({
            method: 'POST',
            url: urls.APIcreateUser,
            body: userPayload,
            failOnStatusCode: false
        });
    });
});

Cypress.Commands.add('checkPostUserResponse', (expectedStatus) => {
    if (expectedStatus === 'success') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('username');
            cy.wrap(response.body.userID).as('userID');
        });
    } else if (expectedStatus === 'badPassword') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
        });
    } else if (expectedStatus === 'existingUser') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(406);
            expect(response.body.message).to.eq("User exists!");
        });
    } else if (expectedStatus === 'emptyFields') {
        cy.get('@response').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq("UserName and Password required.");
        });
    } else {
        throw new Error('Invalid expectedStatus value');
    }
});