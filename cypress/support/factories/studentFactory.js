const { faker } = require('@faker-js/faker/locale/pt_BR');

export const generateStudent = () => {
    const birthDate = faker.date.birthdate({ min: 18, max: 50, mode: 'age' });
    const subjects = ['Maths', 'Physics', 'English', 'Chemistry', 'History', 'Biology', 'Computer Science', 'Economics', 'Arts', 'Social Studies'];
    const quantityToSelect = Math.floor(Math.random() * subjects.length) + 1;

    const selectedSubjects = [...subjects]
        .sort(() => 0.5 - Math.random())
        .slice(0, quantityToSelect);

    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        mobile: faker.phone.phoneNumber('##########'),
        birthDate: {
            day: birthDate.getDate(),
            month: birthDate.toLocaleString('en-US', { month: 'long' }),
            year: birthDate.getFullYear().toString(),
        },
        subjects: selectedSubjects,
        address: faker.address.streetAddress(),
    };
};