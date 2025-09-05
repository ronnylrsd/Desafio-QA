import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import users from '../../../fixtures/users.json'

When('o usuário tenta se cadastrar com dados válidos' , () => {
    cy.postUser(users.validUser).as('response');
});

Then('o sistema deve criar o Usuário com sucesso' , () => {
    cy.checkPostUserResponse('success')
});

When('o usuário tenta criar um usuário com uma senha simples' , () => {
    cy.postUser(users.userWithBadPassword).as('response');
});

Then('o sistema não permite se cadastrar com uma senha simples' , () => {
    cy.checkPostUserResponse('badPassword')
});

When('o usuário tenta se recadastrar' , () => {
    cy.postUser(users.existingUser).as('response');
});

Then('o sistema não deve permitir o usuário ser cadastrado novamente' , () => {
    cy.checkPostUserResponse('existingUser')
});