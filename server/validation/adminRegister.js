const validator = require('validator');
const isEmpty = require('./is-empty');


const validateAdminRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (!validator.isLength(data.contactNumber, { min: 10, max: 10 })) {
        errors.contactNumber = 'ContactNumber must be of 10 digit';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }
    if (validator.isEmpty(data.dob)) {
        errors.dob = 'DOB field is required';
    }
    if (validator.isEmpty(data.contactNumber)) {
        errors.contactNumber = 'DOB field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


module.exports = validateAdminRegisterInput