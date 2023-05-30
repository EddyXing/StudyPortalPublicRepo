const validator = require('validator');
const isEmpty = require('./is-empty');


const validateFacultyUpdatePassword = (data) => {
    let errors = {}
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';


    if (validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Old Password field is required';
    }

    if (!validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Password must contain at least six character';
    }

    if (validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password field is required';
    }

    if (validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirm New Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFacultyUpdatePassword