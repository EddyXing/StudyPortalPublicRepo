const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

const { checkAttendance, getAllStudents, getStudentByName, studentLogin,
    updatePassword, forgotPassword, getStudentByRegNo,
    postOTP, postPrivateChat, getPrivateChat, differentChats,
    previousChats, updateProfile, getAllSubjects, getMarks } = require('../controllers/studentController')

//require auth for all student routes
const requireAuth = require('../middleware/requireAuth')

router.post('/login', studentLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.use(requireAuth)
//upload profile
router.post('/updateProfile', upload.single("avatar"), updateProfile)

//upload password
router.post('/updatePassword', updatePassword)

//chat related routes    
router.post('/chat/:roomId', postPrivateChat)

router.get('/chat/:roomId', getPrivateChat)

router.get('/chat/newerChats/:receiverName', differentChats)

router.get('/chat/previousChats/:senderName', previousChats)

router.get('/getMarks', getMarks)

router.get('/getAllSubjects', getAllSubjects)

router.get('/checkAttendance', checkAttendance)

//helper routes
router.post('/getAllStudents', getAllStudents)

router.post('/getStudentByRegNo', getStudentByRegNo)

router.post('/getStudentByName', getStudentByName)

module.exports = router