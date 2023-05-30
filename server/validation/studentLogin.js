const validator = require('validator');
const isEmpty = require('./is-empty');


const validateStudentLoginInput = (data) => {
    let errors = {}
    data.registrationNumber = !isEmpty(data.registrationNumber) ? data.registrationNumber : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isLength(data.registrationNumber, { min: 12, max: 12 })) {
        errors.registrationNumber = 'Registration Number must be of 12 characters';
    }

    if (validator.isEmpty(data.registrationNumber)) {
        errors.registrationNumber = 'Registration Number field is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateStudentLoginInput