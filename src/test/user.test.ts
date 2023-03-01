import { faker } from '@faker-js/faker';
import test from 'ava';
import { to } from './utils/fetch';
import { expectStatusCode } from './utils/status';

faker.locale = 'en_US';

export const USER_A = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

export const USER_B = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

test.before(() => {
    console.log(`
            ************************
            | STARTING TESTS USERS | 
            ************************ 
        `);
});

test.serial('Register Succesfully', async (t) => {
    const response = await to(
        t,
        'POST',
        'http://localhost:8080/api/v1/auth/register',
        {},
        USER_A
    );

    expectStatusCode(t, 201, response);
});

test.serial('Register Failed - Duplicated email', async (t) => {
    const response = await to(
        t,
        'POST',
        'http://localhost:8080/api/v1/auth/register',
        {},
        { ...USER_B, email: USER_A.email }
    );

    expectStatusCode(t, 409, response);
});

test.after.always(() => {
    console.log(`
            ***********************
            |     TESTS ENDED     | 
            *********************** 
        `);
});
