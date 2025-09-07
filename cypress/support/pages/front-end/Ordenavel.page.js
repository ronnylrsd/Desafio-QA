import '@4tw/cypress-drag-drop';

const sortableConfig = {
    itemSelector: '.list-group-item:visible',
    numberMap: {
        'One': 1, 'Two': 2, 'Three': 3,
        'Four': 4, 'Five': 5, 'Six': 6,
    }
};

Cypress.Commands.add('sortVisibleListByNumber', () => {
    const { itemSelector, numberMap } = sortableConfig;
    cy.get(itemSelector).then($items => {
        const texts = [...$items].map(item => item.innerText.trim());
        const sortedTexts = [...texts].sort((a, b) => (numberMap[a] || 0) - (numberMap[b] || 0));
        sortedTexts.forEach((text, sortedIndex) => {
            cy.get(itemSelector).then($currentItems => {
                const currentIndex = [...$currentItems].findIndex(item => item.innerText.trim() === text);
                if (currentIndex !== sortedIndex) {
                    cy.get(itemSelector).eq(currentIndex)
                        .drag(`${itemSelector}:eq(${sortedIndex})`, { force: true });
                    cy.get(itemSelector).eq(sortedIndex).should('have.text', text);
                }
            });
        });
    });
});

Cypress.Commands.add('checkOrder', () => {
    const { itemSelector, numberMap } = sortableConfig;
    cy.get(itemSelector).then($items => {
        const texts = [...$items].map(item => item.innerText.trim());
        const numbers = texts.map(text => numberMap[text] || 0);
        const sortedNumbers = [...numbers].sort((a, b) => a - b);
        expect(numbers).to.deep.equal(sortedNumbers);
    });
});
