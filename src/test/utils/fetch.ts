import got, { GotRequestFunction, Headers, Response } from 'got-cjs';

interface Methods {
    [index: string]: GotRequestFunction;
    GET: GotRequestFunction;
    POST: GotRequestFunction;
    PUT: GotRequestFunction;
    PATCH: GotRequestFunction;
    DELETE: GotRequestFunction;
}

const methods: Methods = {
    GET: got.get,
    POST: got.post,
    PUT: got.put,
    PATCH: got.patch,
    DELETE: got.delete
};

export const to = async (
    t: any,
    method: string,
    url: string,
    head: Headers,
    body: object | undefined
): Promise<Response> => {
    try {
        return await methods[method](url, {
            headers: head,
            json: body,
            throwHttpErrors: false
        });
    } catch (error) {
        return t.fail(error);
    }
};
