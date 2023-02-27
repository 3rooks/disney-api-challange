import { Response } from 'got-cjs';

export const expectStatusCode = (
    t: any,
    expectedCode: number,
    response: Response
) => {
    t.is(
        response.statusCode,
        expectedCode,
        `Expected status code ${expectedCode}, but received ${response.statusCode}`
    );
};
