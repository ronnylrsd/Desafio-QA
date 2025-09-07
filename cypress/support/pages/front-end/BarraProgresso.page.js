const ProgressBarMapping = {
    'startStopButton': '#startStopButton',
    'resetButton': '#resetButton',
    'progressBar': '#progressBar .progress-bar'
}

Cypress.Commands.add('clickOn', (button) => {
    const buttonLower = button.toLowerCase();
    if (buttonLower === 'start' || buttonLower === 'stop') {
        cy.get(ProgressBarMapping.startStopButton)
            .should('be.visible')
            .and('be.enabled')
            .click();
    } else if (buttonLower === 'reset') {
        cy.get(ProgressBarMapping.resetButton)
            .should('be.visible')
            .and('be.enabled')
            .click();
    }
});

Cypress.Commands.add('stopProgressBarInRange', (minValue, maxValue) => {
    const checkAndStop = (retries = 100) => {
        if (retries < 0) {
            throw new Error('Não foi possível parar a barra de progresso na janela desejada.');
        }
        cy.getProgressBarValue().then(currentValue => {
            if (currentValue >= maxValue) {
                throw new Error(`A barra de progresso (valor: ${currentValue}%) ultrapassou o limite de ${maxValue}% antes de ser parada.`);
            }
            if (currentValue >= minValue) {
                cy.clickOn('Stop');
            } else {
                cy.wait(50);
                checkAndStop(retries - 1);
            }
        });
    };
    checkAndStop();
});

Cypress.Commands.add('getProgressBarValue', () => {
    return cy.get(ProgressBarMapping.progressBar)
        .invoke('attr', 'aria-valuenow')
        .then(value => parseInt(value));
});

Cypress.Commands.add('waitOneHundredPerCent', () => {
    cy.get(ProgressBarMapping.progressBar, { timeout: 15000 })
        .should('have.attr', 'aria-valuenow', '100');
});

Cypress.Commands.add('checkReset', () => {
    cy.get(ProgressBarMapping.startStopButton)
            .contains('Start')
            .should('be.visible')
            .and('be.enabled')
})