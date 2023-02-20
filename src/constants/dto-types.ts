import { Type } from '@sinclair/typebox';

/**
 * Common types
 */

export const idType = Type.String({
    format: 'uuid',
    errorMessage: {
        type: '${0#} must be a string',
        format: '${0#} should be a uuidv4'
    }
});

export const imageType = Type.String({
    minLength: 10,
    maxLength: 1000,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 10 letters',
        maxLength: '${0#} must have a maximum of 1000 letters'
    }
});

/**
 * User types
 */

export const usernameType = Type.String({
    minLength: 2,
    maxLength: 15,
    errorMessage: {
        type: '${0#} must be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 2 letters',
        maxLength: '${0#} must have a maximum of 15 letters'
    }
});

export const emailType = Type.String({
    format: 'email',
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} must comply RFC 5322'
    }
});

export const passwordType = Type.String({
    format: 'password',
    minLength: 8,
    maxLength: 20,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} must have a lowercase, an uppercase and a number',
        minLength: '${0#} must have at least 8 letters',
        maxLength: '${0#} must have a maximum of 20 letters'
    }
});

/**
 * Product types
 */

export const titleType = Type.String({
    minLength: 2,
    maxLength: 50,
    errorMessage: {
        type: '${0#} must be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 2 letters',
        maxLength: '${0#} must have a maximum of 50 letters'
    }
});

export const orderType = Type.String({
    minLength: 3,
    maxLength: 4,
    errorMessage: {
        type: '${0#} must be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 3 letters',
        maxLength: '${0#} must have a maximum of 4 letters'
    }
});

export const originalTitleDTOSchema = Type.String({
    minLength: 2,
    maxLength: 50,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 2 letters',
        maxLength: '${0#} must have a maximum of 50 letters'
    }
});

export const originalTitleRomanisedDTOSchema = Type.String({
    minLength: 5,
    maxLength: 50,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 5 letters',
        maxLength: '${0#} must have a maximum of 50 letters'
    }
});

export const historyType = Type.String({
    minLength: 10,
    maxLength: 1000,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 10 letters',
        maxLength: '${0#} must have a maximum of 1000 letters'
    }
});

export const directorDTOSchema = Type.String({
    minLength: 2,
    maxLength: 100,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 2 letters',
        maxLength: '${0#} must have a maximum of 100 letters'
    }
});

export const producerDTOSchema = Type.String({
    minLength: 2,
    maxLength: 100,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 2 letters',
        maxLength: '${0#} must have a maximum of 100 letters'
    }
});

export const releaseYearType = Type.Integer({
    minimum: 1895,
    maximum: 2050,
    errorMessage: {
        type: '${0#} should be a integer number',
        format: '${0#} should be a YYYY',
        minimum: '${0#} should be above 1895',
        maximum: '${0#} should be below 2050'
    }
});

export const ratedType = Type.Integer({
    minimum: 1,
    maximum: 10,
    errorMessage: {
        type: '${0#} should be a integer number',
        format: '${0#} should be a integer number',
        minimum: '${0#} should be above 0',
        maximum: '${0#} should be below 10'
    }
});

export const ageType = Type.Integer({
    minimum: 1,
    maximum: 100,
    errorMessage: {
        type: '${0#} should be a integer number',
        format: '${0#} should be a integer number',
        minimum: '${0#} should be above 0',
        maximum: '${0#} should be below 100'
    }
});

export const minDurationDTOSchema = Type.Number({
    minimum: 60,
    maximum: 180,
    errorMessage: {
        type: '${0#} should be a number',
        format: '${0#} should be a hh--MM--ss',
        minimum: '${0#} should be above 60 minutes',
        maximum: '${0#} should be below 180 minutes'
    }
});

export const infoDTOSchema = Type.String({
    minLength: 10,
    maxLength: 1000,
    errorMessage: {
        type: '${0#} should be a string',
        format: '${0#} should be a string',
        minLength: '${0#} must have at least 100 letters',
        maxLength: '${0#} must have a maximum of 1000 letters'
    }
});

export const priceDTOSchema = Type.Number({
    minimum: 100,
    maximum: 500,
    errorMessage: {
        type: '${0#} should be a number',
        format: '${0#} should be a number',
        minimum: '${0#} should be above 100',
        maximum: '${0#} should be below 500'
    }
});

export const quantityDTOSchema = Type.Number({
    minimum: 1,
    maximum: 100,
    errorMessage: {
        type: '${0#} should be a number',
        format: '${0#} should be a number',
        minimum: '${0#} should be above 2',
        maximum: '${0#} should be below 100'
    }
});
