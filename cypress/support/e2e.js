// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './pages/api/CriarUsuario.page.js'
import './pages/api/CriarToken.page.js'
import './pages/api/Autorizado.page.js'
import './pages/api/ListarLivros.page.js'
import './pages/api/AlugarLivros.page.js'
import './pages/api/ListarDetalhesDoUsuario.page.js'
import './pages/front-end/RegistroEstudante.page.js'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });