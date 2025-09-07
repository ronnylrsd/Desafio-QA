import { faker } from '@faker-js/faker';

export function generateValidUser() {
    const defaultPassword = "Test@123";

    const user = {
        userName: faker.internet.userName() + faker.random.numeric(3),
        password: defaultPassword,
    };

    return user;
}