const StudentRegistrationFormMapping = {
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
    'submit': '#submit'
}

Cypress.Commands.add('fillStudentForm', (studentData, options = {}) => {
    const allFields = ['firstName', 'lastName', 'email', 'gender', 'mobile', 'birthDate', 'subjects', 'hobbies', 'picture', 'address', 'state', 'city'];
    const fieldsToFill = options.fields || allFields;

    if (fieldsToFill.includes('firstName')) {
        cy.get(StudentRegistrationFormMapping.firstName).type(studentData.firstName);
    }
    if (fieldsToFill.includes('lastName')) {
        cy.get(StudentRegistrationFormMapping.lastName).type(studentData.lastName);
    }
    if (fieldsToFill.includes('email')) {
        cy.get(StudentRegistrationFormMapping.email).type(studentData.email);
    }
    if (fieldsToFill.includes('gender')) {
        cy.selectRandomGender();
    }
    if (fieldsToFill.includes('mobile')) {
        cy.get(StudentRegistrationFormMapping.mobile).type(studentData.mobile);
    }
    if (fieldsToFill.includes('birthDate')) {
        cy.selectBirthDate(studentData.birthDate);
    }
    if (fieldsToFill.includes('subjects') && studentData.subjects) {
        studentData.subjects.forEach(subject => {
            cy.get(StudentRegistrationFormMapping.subjects).type(subject);
            cy.get('.subjects-auto-complete__option').contains(subject).click();
        });
    }
    if (fieldsToFill.includes('hobbies')) {
        cy.selectRandomHobbies();
    }
    if (fieldsToFill.includes('picture')) {
        cy.uploadRandomPicture();
    }
    if (fieldsToFill.includes('address')) {
        cy.get(StudentRegistrationFormMapping.address).type(studentData.address);
    }
    if (fieldsToFill.includes('state')) {
        cy.selectRandomDropdownOption(StudentRegistrationFormMapping.state);
    }
    if (fieldsToFill.includes('city')) {
        cy.selectRandomDropdownOption(StudentRegistrationFormMapping.city);
    }
});

Cypress.Commands.add('selectBirthDate', (birthDate) => {
    cy.get(StudentRegistrationFormMapping.dateOfBirth).click();
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

Cypress.Commands.add('clickOnSR', (buttonText) => {
    if (buttonText.toLowerCase() === 'submit') {
        cy.get(StudentRegistrationFormMapping.submit).click();
    } else if (buttonText.toLowerCase() === 'close') {
        cy.get('#closeLargeModal').click({ force: true });
    } else {
        cy.contains('button', buttonText).click({ force: true });
    }   
    cy.log(`**Clicou no botão:** ${buttonText}`);
});