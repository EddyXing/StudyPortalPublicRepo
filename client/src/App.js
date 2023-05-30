import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import jwt_decode from 'jwt-decode'


import AdminLogin from './Pages/Admin/AdminLogin'

import AdminAddStudent from './Pages/Admin/AdminAddStudent'

import AdminAddFaculty from './Pages/Admin/AdminAddFaculty'

import AdminAddSubject from './Pages/Admin/AdminAddSubject'

import AdminAddAdmin from './Pages/Admin/AdminAddAdmin'

import AdminGetAllFaculty from './Pages/Admin/AdminGetAllFaculty'

import AdminGetAllStudent from './Pages/Admin/AdminGetAllStudents'

import AdminGetAllSubject from './Pages/Admin/AdminGetAllSubjects'

import AdminHome from './Pages/Admin/AdminHome'


import FacultyHome from './Pages/Faculty/FacultyHome'

import FacultyAttendance from './Pages/Faculty/FacultyAttendance'

import FacultyUpdatePassword from './Pages//Faculty/FacultyUpdatePassword'

import ForgotPassword from './Pages/ForgotPassword'

import FacultyUploadMarks from './Pages/Faculty/FacultyUploadMarks'

import FacultyUpdateProfile from './Pages/Faculty/FacultyUpdateProfile'


import FacultyStudentLoginPage from './Pages/FacultyStudentLoginPage'


import StudentHome from './Pages/Student/StudentHome'

import StudentDetails from './Pages/Student/StudentDetails'

import StudentAttendance from './Pages/Student/StudentAttendance'

import StudentUpdateProfile from './Pages/Student/StudentUpdateProfile'

import StudentUpdatePassword from './Pages/Student/StudentUpdatePassword'

import StudentSubjectList from './Pages/Student/StudentSubjectList'

import StudentTestPerformace from './Pages/Student/StudentTestPerformance'

import Chat from './Pages/Student/Chat'

import ReceiverUserDetails from './Pages/Student/ReceiverUserDetails'


import { setAdmin } from './features/adminSlice';
import { setFaculty } from './features/facultySlice';
import { setStudent } from './features/studentSlice';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminJwtToken'))
    const currentTime = Date.now() / 1000
    if (admin) {
      const decoded = jwt_decode(admin)
      dispatch(setAdmin(decoded))
      if (decoded.exp < currentTime) {
        dispatch(setAdmin(null))
      }
    }
  }, [dispatch])

  useEffect(() => {
    const faculty = JSON.parse(localStorage.getItem('facultyJwtToken'))
    const currentTime = Date.now() / 1000
    if (faculty) {
      const decoded = jwt_decode(faculty)
      dispatch(setFaculty(decoded))
      if (decoded.exp < currentTime) {
        dispatch(setFaculty(null))
      }
    }
  }, [dispatch])

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem('studentJwtToken'))
    const currentTime = Date.now() / 1000
    if (student) {
      const decoded = jwt_decode(student)
      dispatch(setStudent(decoded))
      if (decoded.exp < currentTime) {
        dispatch(setStudent(null))
      }
    }
  }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route path='/admin' element={<AdminHome />} />
            <Route path="/admin/addStudent" element={<AdminAddStudent />} />
            <Route path="/admin/addFaculty" element={<AdminAddFaculty />} />
            <Route path="/admin/addSubject" element={<AdminAddSubject />} />
            <Route path="/admin/addAdmin" element={<AdminAddAdmin />} />
            <Route path="/admin/allFaculties" element={<AdminGetAllFaculty />} />
            <Route path="/admin/allStudents" element={<AdminGetAllStudent />} />
            <Route path="/admin/allSubject" element={<AdminGetAllSubject />} />

            <Route path='/faculty' element={<FacultyHome />} />
            <Route path='/attendenceFaculty' element={<FacultyAttendance />} />
            <Route path="/faculty/updatePassword" element={<FacultyUpdatePassword />} />
            <Route path="/faculty/uploadMarks" element={<FacultyUploadMarks />} />
            <Route path="/faculty/updateProfile" element={<FacultyUpdateProfile />} />
            <Route path="/forgotPassword/:user" element={<ForgotPassword />} />

            <Route path='/' element={<FacultyStudentLoginPage />} />

            <Route path='/student' element={<StudentHome />} />
            <Route path="/studentDetails" element={<StudentDetails />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path='/student/updateProfile' element={<StudentUpdateProfile />} />
            <Route path="/student/updatePassword" element={<StudentUpdatePassword />} />
            <Route path="/student/getAllSubjects" element={<StudentSubjectList />} />
            <Route path="/student/testPerformance" element={<StudentTestPerformace />} />
            <Route path="/chat/:room" element={<Chat />} />
            <Route path="/student/:registrationNumber" element={<ReceiverUserDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;