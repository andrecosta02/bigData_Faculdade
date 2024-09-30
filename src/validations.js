const { body } = require('express-validator');

const employeeValidations = [
    body('data.name')
        .notEmpty().withMessage('name cannot be empty')
        .isString().withMessage('name must be a string')
        .isLength({ min: 3, max: 60 }).withMessage('name must be between 3 and 60 characters'),

    body('data.email')
        .notEmpty().withMessage('email cannot be empty')
        .isString().withMessage('email must be a string')
        .isEmail().withMessage('email must be a valid email address')
        .isLength({ min: 3, max: 60 }).withMessage('email must be between 3 and 60 characters'),

    body('data.gender')
        .notEmpty().withMessage('gender cannot be empty')
        .isString().withMessage('gender must be a string')
        .isIn(['M', 'F']).withMessage('Gender must be either M or F'),

    body('data.cpf')
        .notEmpty().withMessage('cpf cannot be empty')
        .isString().withMessage('cpf must be a string')
        .isLength({ min: 11, max: 11 }).withMessage('cpf must be 11 characters')
        .matches(/^\d+$/).withMessage('CPF must contain only numbers'),

    body('data.cep')
        .notEmpty().withMessage('cep cannot be empty')
        .isString().withMessage('cep must be a string')
        .isLength({ min: 8, max: 8 }).withMessage('CEP must be exactly 8 characters long')
        .matches(/^\d+$/).withMessage('CEP must contain only numbers'),

    body('data.admissao')
        .notEmpty().withMessage('admissao cannot be empty')
        .isISO8601().withMessage('the date must be in ISO 8601 format (YYYY-MM-DD)')
        .custom((value) => {
            const inputDate = new Date(value);
            const currentDate = new Date();
            if (inputDate > currentDate) {
                throw new Error('date cannot be greater than the current date');
            }
            return true;
        }),

    body('data.salary')
        .notEmpty().withMessage('salary cannot be empty')
        .isFloat({ gt: 0 }).withMessage('salary must be a number greater than zero'),

    body('data.phone')
        .notEmpty().withMessage('phone cannot be empty')
        .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/).withMessage('the phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX'),

    body('data.position')
        .notEmpty().withMessage('position cannot be empty')
        .isString().withMessage('position must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('The position must be between 2 and 50 characters long.')
];

module.exports = {
    employeeValidations,
};
