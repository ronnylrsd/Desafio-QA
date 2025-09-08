import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import { generateValidUser } from '../../factories/userFactory';

When('o usuário tenta se cadastrar com dados válidos', () => {
    const validUser = generateValidUser();
    cy.postUser(validUser);
});

Then('o sistema deve criar o Usuário com sucesso', () => {
    cy.checkPostUserResponse('success');
});

When('o usuário tenta criar um usuário com uma senha simples' , () => {
    const userWithBadPassword = generateValidUser({ password: '123' });
    cy.log(`Username: ${userWithBadPassword.userName}`);
    cy.log(`Password: ${userWithBadPassword.password}`);
    cy.postUser(userWithBadPassword);
});

Then('o sistema não permite se cadastrar com uma senha simples' , () => {
    cy.checkPostUserResponse('badPassword')
});

When('o usuário tenta se recadastrar' , () => {
    const existingUser = generateValidUser();
    cy.postUser(existingUser);
    cy.postUser(existingUser);
});

Then('o sistema não deve permitir o usuário ser cadastrado novamente' , () => {
    cy.checkPostUserResponse('existingUser')
});