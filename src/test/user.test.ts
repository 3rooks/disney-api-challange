import test from 'ava';
import got from 'got-cjs';
import { expectStatusCode } from './utils/status';

test.before(() => {
    console.log(`
            ************************
            | STARTING TESTS USERS | 
            ************************ 
        `);
});

test('Register Succesfully', async (t) => {
    const response = await got.post(
        'http://localhost:8080/api/v1/auth/register',
        {
            json: {
                username: 'qasdasdsad',
                email: 'abc.abc.com',
                password: 'qwertyqw'
            },
            throwHttpErrors: false
        }
    );

    expectStatusCode(t, 400, response);
});

test.after.always(() => {
    console.log(`
            ***********************
            |     TESTS ENDED     | 
            *********************** 
        `);
});
