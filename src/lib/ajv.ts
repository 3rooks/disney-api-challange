import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier');

ajv.addFormat('password', password);
addFormats(ajv, ['uuid', 'email']);
addErrors(ajv);
