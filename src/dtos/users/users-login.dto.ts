// import { emailType, passwordType } from '#constants/dto-types.js';
// import { ajv } from '#lib/ajv.js';
// import { Type } from '@sinclair/typebox';

// const userLoginDTOSchema = Type.Object(
//     {
//         email: emailType,
//         password: passwordType
//     },
//     {
//         additionalProperties: false,
//         errorMessage: {
//             additionalProperties: 'Invalid JSON Schema '
//         }
//     }
// );

// const validateSchema = ajv.compile(userLoginDTOSchema);

// export const userLoginDTO = (req, res, next) => {
//     const isValid = validateSchema(req.body);

//     if (!isValid)
//         return res.status(400).json({
//             errors: validateSchema.errors.map((error) => error.message)
//         });

//     next();
// };
