const express = require('express')
const router = express.Router()

const { adminLogin, addFaculty, addStudent,
    addSubject, getAllFaculties, getAllStudents, getAllSubjects,
    addAdmin,
    getAllStudent,
    getAllFaculty,
    getAllSubject } = require('../controllers/adminController')

//require auth for all admin routes
const requireAuth = require('../middleware/requireAuth')

router.post('/login', adminLogin)
router.post('/addAdmin', addAdmin)
router.use(['/getAllFaculty', '/getAllStudent', '/getAllSubject', '/addFaculty', '/addStudent', '/addSubject'], requireAuth)
router.post('/addFaculty', addFaculty)
router.post('/addStudent', addStudent)
router.post('/addSubject', addSubject)
router.post('/getAllFaculty', getAllFaculty)
router.post('/getAllStudent', getAllStudent)
router.post('/getAllSubject', getAllSubject)
router.get('/getFaculties', getAllFaculties)
router.get('/getStudents', getAllStudents)
router.get('/getSubjects', getAllSubjects)

module.exports = router