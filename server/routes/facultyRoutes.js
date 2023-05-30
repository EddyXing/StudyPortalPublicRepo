const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

const { fetchStudents, markAttendance, facultyLogin, getAllSubjects,
    updatePassword, forgotPassword, postOTP, uploadMarks, updateProfile } = require('../controllers/facultyController')

//require auth for all faculty routes
const requireAuth = require('../middleware/requireAuth')

router.post('/login', facultyLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.use(requireAuth)

router.post('/updateProfile', upload.single("avatar"), updateProfile)

router.post('/fetchStudents', fetchStudents)

router.post('/fetchAllSubjects', getAllSubjects)

router.post('/markAttendance', markAttendance)

router.post('/uploadMarks', uploadMarks)

router.post('/updatePassword', updatePassword)

module.exports = router