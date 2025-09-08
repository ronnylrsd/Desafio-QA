import '@4tw/cypress-drag-drop';

const sortableConfig = {
    itemSelector: '#sortableContainer .list-group-item:visible',
    numberMap: {
        'One': 1, 'Two': 2, 'Three': 3,
        'Four': 4, 'Five': 5, 'Six': 6,
    }
};

Cypress.Commands.add('placeItemsInOrder', (sortedTexts, index = 0) => {
    if (index >= sortedTexts.length) {
        return;
    }

    const targetText = sortedTexts[index];
    cy.contains(sortableConfig.itemSelector, targetText).then($itemToMove => {
        cy.get(sortableConfig.itemSelector).eq(index).then($currentItemAtIndex => {
            if ($itemToMove.text() !== $currentItemAtIndex.text()) {
                $itemToMove.drag($currentItemAtIndex[0], { force: true });
            }
            cy.placeItemsInOrder(sortedTexts, index + 1);
        });
    });
});

Cypress.Commands.add('sortListAscending', () => {
    const { itemSelector, numberMap } = sortableConfig;
    cy.get(itemSelector).then($items => {
        const texts = [...$items].map(item => item.innerText.trim());
        const sortedTexts = [...texts].sort((a, b) => (numberMap[a] || 0) - (numberMap[b] || 0));
        cy.placeItemsInOrder(sortedTexts);
    });
});

Cypress.Commands.add('checkListIsSortedAscending', () => {
    const { itemSelector, numberMap } = sortableConfig;
    cy.get(itemSelector).then($items => {
        const currentTexts = [...$items].map(item => item.innerText.trim());
        const currentNumbers = currentTexts.map(text => numberMap[text] || 0);
        const sortedNumbers = [...currentNumbers].sort((a, b) => a - b);
        expect(currentNumbers, "A lista na tela deve estar ordenada").to.deep.equal(sortedNumbers);
    });
});