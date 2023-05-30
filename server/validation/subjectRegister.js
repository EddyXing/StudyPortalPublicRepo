const validator = require('validator');
const isEmpty = require('./is-empty');


const validateSubjectRegisterInput = (data) => {
    let errors = {}
    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : '';
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.totalLectures = !isEmpty(data.totalLectures) ? data.totalLectures : '';


    if (validator.isEmpty(data.subjectName)) {
        errors.subjectName = ' Subject Name field is required';
    }

    if (validator.isEmpty(data.subjectCode)) {
        errors.subjectCode = 'Subject Code field is required';
    }

    if (validator.isEmpty(data.year)) {
        errors.year = 'Year field is required';
    }

    if (validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (validator.isEmpty(data.totalLectures)) {
        errors.totalLectures = 'Total Lecture field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSubjectRegisterInput