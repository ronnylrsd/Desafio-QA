import { faker } from "@faker-js/faker";

const user = {
    userName: faker.internet.userName(),
    password: faker.internet.password()
}

Cypress.Commands.add('createUser', () => {
    cy.fixture('urls.json').then((urls) => { 
        
        cy.request({
            method: 'POST',
            url: urls.APIcreateUser,
            body: {
                "userName": faker.internet.userName(),
                "password": faker.internet.password()
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.username).to.eq("testeAccenture")
        })
        
    });
});

Cypress.Commands.add('validateUserCreation', () => {
    cy.request({
        method: 'POST',
        url: urls.APIcreateUser,
        body: {
            "userName": "testeAccenture",
            "password": "Teste@123"
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(406)
        expect(response.body.message).to.eq("User exists!")
    })
});
