import { faker } from '@faker-js/faker';

export function generateValidUser(overrides) {
    const defaultPassword = "Test@123";

    const user = {
        userName: faker.internet.userName() + faker.random.numeric(3),
        password: defaultPassword,
        ...overrides,
    };

    return user;
}