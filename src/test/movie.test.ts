import test from 'ava';
import { to } from './utils/fetch';
import { expectStatusCode } from './utils/status';

const base = 'http://127.0.0.1:8080/api/v1';

test.before(() => {
    console.log(`
            ***********************
            |STARTING TESTS MOVIES| 
            *********************** 
        `);
});

test('movie get all', async (t) => {
    const response = await to(t, 'GET', `${base}/movies`, {}, undefined);
    expectStatusCode(t, 200, response);
});

test.after.always(() => {
    console.log(`
            ***********************
            |     TESTS ENDED     | 
            *********************** 
        `);
});
