import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setStudent, fetchNewerChats, fetchPreviousChats } from '../features/studentSlice'


const Home = () => {
    const { student, newerChats, previousChats } = useSelector((store) => store.student)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    useEffect(() => {
        if (student.student.name) {
            setName(student.student.name)
        }
    }, [student.student.name])

    useEffect(() => {
        dispatch(fetchNewerChats(name))
        dispatch(fetchPreviousChats(name))
    }, [newerChats.length, previousChats.length, dispatch, name])

    const logoutHandler = () => {
        localStorage.removeItem('studentJwtToken')
        dispatch(setStudent({}))
        navigate('/')
    }

    console.log(newerChats, previousChats)
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light  bg-light">
                        <h4 className="navbar-brand mt-1" href="">AIT</h4>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <button type="button" className="btn"><Link to="/student" className="text-decoration-none"><li>{name.toUpperCase()}</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/student/updateProfile" className="text-decoration-none"><li>UPDATE PROFILE</li></Link></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ACADEMIC </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/student/testPerformance">Test Performance</Link>
                                        <Link className="dropdown-item" to="/student/attendance">Attendance</Link>
                                        <Link className="dropdown-item" to="/student/getAllSubjects">Student Subject List</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/studentDetails" className="text-decoration-none"><li>STUDENTS</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/studentDetails" className="text-decoration-none"><li>NEW CONVERSATION ({newerChats.length})</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/student/updatePassword" className="text-decoration-none"><li>UPDATE PASSWORD</li></Link></button>
                                </li>

                            </ul>

                        </div>
                        <div>
                            <button style={{ listStyle: "none" }} onClick={logoutHandler} type="button" className="btn btn-secondary"><li>LOGOUT</li></button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default Home