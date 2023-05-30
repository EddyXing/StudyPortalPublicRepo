import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HomeHelper from '../../Components/StudentHomeHelper'
import { useNavigate } from 'react-router-dom'
import { fetchAttendance } from '../../features/studentSlice'

const StudentAttendance = () => {
    const store = useSelector(store => store)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((fetchAttendance()))
    }, [])

    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Subject Code</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Maximum Hours</th>
                                        <th scope="col">Present Hours</th>
                                        <th scope="col">Absent Hours</th>
                                        <th scope="col">Total Hours</th>
                                        <th scope="col">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.student.attendance.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.subjectCode}</td>
                                                <td>{res.subjectName}</td>
                                                <td>{res.maxHours}</td>
                                                <td>{res.lectureAttended}</td>
                                                <td>{res.absentHours}</td>
                                                <td>{res.totalLecturesByFaculty}</td>
                                                <td>{res.attendance}%</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </> : (navigate('/'))}


        </div>

    )
}

export default StudentAttendance