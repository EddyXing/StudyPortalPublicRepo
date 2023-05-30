const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    totalLecturesByFaculty: {
        type: Number,
        default: 0
    },
    lectureAttended: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('attendance', attendanceSchema)