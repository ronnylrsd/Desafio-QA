const selectors = {
    'firstName': '#firstName',
    'lastName': '#lastName',
    'email': '#userEmail',
    'mobile': '#userNumber',
    'dateOfBirth': '#dateOfBirthInput',
    'subjects': '.subjects-auto-complete__value-container',
    'hobbies': '#hobbiesWrapper',
    'picture': '#uploadPicture',
    'address': '#currentAddress',
    'state': '#state',
    'city': '#city',
    'submit': '#submit',
    modal: {
        content: '.modal-content',
        title: '.modal-title',
        closeButton: '#closeLargeModal',
        tableRow: (label) => cy.contains('td', label).next('td'),
    }
}

Cypress.Commands.add('visitStudentForm', () => {
    cy.visit('/');
    cy.navigateToSection('Forms');
    cy.contains('span', 'Practice Form').click();
    cy.url().should('include', '/automation-practice-form');
});

Cypress.Commands.add('fillStudentForm', (studentData, options = {}) => {
    const allFields = ['firstName', 'lastName', 'email', 'gender', 'mobile', 'birthDate', 'subjects', 'hobbies', 'picture', 'address', 'state', 'city'];
    const fieldsToFill = options.fields || allFields;

    const fieldHandlers = {
        firstName: () => cy.get(selectors.firstName).type(studentData.firstName),
        lastName: () => cy.get(selectors.lastName).type(studentData.lastName),
        email: () => cy.get(selectors.email).type(studentData.email),
        gender: () => cy.selectRandomGender(),
        mobile: () => cy.get(selectors.mobile).type(studentData.mobile),
        birthDate: () => cy.selectBirthDate(studentData.birthDate),
        subjects: () => {
            studentData.subjects.forEach(subject => {
                cy.get(selectors.subjects).type(subject);
                cy.get('.subjects-auto-complete__option').contains(subject).click();
            });  
        },
        hobbies: () => cy.selectRandomHobbies(),
        picture: () => cy.uploadRandomPicture(),
        address: () => cy.get(selectors.address).type(studentData.address),
        state: () => cy.selectRandomDropdownOption(selectors.state),
        city: () => cy.selectRandomDropdownOption(selectors.city),
    };

    fieldsToFill.forEach(field => {
        if (fieldHandlers[field]) {
            fieldHandlers[field]();
        }
    });
});

Cypress.Commands.add('submitForm', () => {
    cy.get(selectors.submit).click();
});

Cypress.Commands.add('selectBirthDate', (birthDate) => {
    cy.get(selectors.dateOfBirth).click();
    cy.get('.react-datepicker__month-select').select(birthDate.month);
    cy.get('.react-datepicker__year-select').select(birthDate.year);
    cy.get(`.react-datepicker__day:not(.react-datepicker__day--outside-month)`)
        .contains(new RegExp(`^${birthDate.day}$`))
        .click();
});

Cypress.Commands.add('selectRandomGender', () => {
    const genderSelector = 'input[type="radio"][name="gender"]';

    cy.get(genderSelector).then($radios => {
        const randomIndex = Math.floor(Math.random() * $radios.length);

        cy.get(genderSelector).eq(randomIndex).check({ force: true });

        cy.get(genderSelector).eq(randomIndex).invoke('val').then(selectedValue => {
            cy.log(`**Gênero Selecionado:** ${selectedValue}`);
            cy.wrap(selectedValue).as('selectedGender');
        });
    });
});

Cypress.Commands.add('uploadRandomPicture', () => {
    const images = [
        'imagem-menor-que-5mb.txt',
        'imagem-muito-maior-que-5mb.txt',
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const filePath = `images/${randomImage}`;

    cy.get('#uploadPicture').selectFile(`cypress/fixtures/${filePath}`);

    cy.log(`**Imagem Enviada:** ${randomImage}`);
});

Cypress.Commands.add('selectRandomHobbies', () => {
    const hobbiesSelector = 'input[id^="hobbies-checkbox-"]';

    cy.get(hobbiesSelector).then($hobbies => {
        const totalHobbies = $hobbies.length;

        const quantityToSelect = Math.floor(Math.random() * totalHobbies) + 1;

        cy.log(`**Selecionando ${quantityToSelect} hobbie(s):**`);

        const selectedHobbies = [...$hobbies.get()]
        .sort(() => 0.5 - Math.random())
        .slice(0, quantityToSelect);

        selectedHobbies.forEach(hobbyElement => {
        cy.wrap(hobbyElement).check({ force: true });
        });
    });
});

Cypress.Commands.add('selectRandomDropdownOption', (containerSelector) => {
    cy.get(containerSelector).click();
    const optionsSelector = `${containerSelector} div[class*="-option"]`;
    cy.get(optionsSelector).its('length').then(optionsCount => {
        if (optionsCount > 0) {
        const randomIndex = Math.floor(Math.random() * optionsCount);
        cy.get(optionsSelector).eq(randomIndex).click();

        cy.get(containerSelector).invoke('text').then(selectedText => {
            cy.log(`**Opção Selecionada em '${containerSelector}':** ${selectedText}`);
        });
        } else {
        cy.log(`Nenhuma opção encontrada para '${containerSelector}', fechando dropdown.`);
        cy.get('body').click(); 
        }
    });
});

Cypress.Commands.add('closeModal', () => {
    cy.get(selectors.modal.closeButton).click({ force: true });
});

Cypress.Commands.add('verifySubmissionModal', (studentData) => {
    cy.get(selectors.modal.content).should('be.visible');
    cy.get(selectors.modal.title).should('have.text', 'Thanks for submitting the form');

    selectors.modal.tableRow('Student Name').should('contain.text', `${studentData.firstName} ${studentData.lastName}`);
    cy.get('@selectedGender').then(selectedGender => {
        selectors.modal.tableRow('Gender').should('have.text', selectedGender);
    });
    selectors.modal.tableRow('Mobile').should('contain.text', studentData.mobile);
});

Cypress.Commands.add('verifyFormValidation', () => {
    cy.get(selectors.modal.content).should('not.exist');
    cy.get(selectors.firstName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get(selectors.lastName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get(selectors.mobile).should('have.css', 'border-color', 'rgb(220, 53, 69)');
});