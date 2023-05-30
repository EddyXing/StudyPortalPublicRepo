import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setFaculty } from '../features/facultySlice'
import { setStudent } from '../features/studentSlice'
import classnames from 'classnames'
import jwtDecode from 'jwt-decode'

import '../Style/LoginPage.css'
import { setErrorsHelper } from '../features/errorHelperSlice'
import { setErrors } from '../features/errorSlice'


const FacultyStudentLoginPage = () => {
    const store = useSelector((state) => state)
    const dispatch = useDispatch()
    const [facultyRegNum, setFacultyRegNum] = useState('')
    const [facultyPassword, setFacultyPassword] = useState('')
    const [studentRegNum, setStudentRegNum] = useState('')
    const [studentPassword, setStudentPassword] = useState('')
    const [error, setError] = useState({})
    const [errorHelper, setErrorHelper] = useState({})
    const [isFacultyLoading, setIsFacultyLoading] = useState(false)
    const [isStudentLoading, setIsStudentLoading] = useState(false)

    const url = "https://collegeapi.onrender.com"

    const navigate = useNavigate()

    useEffect(() => {
        if (store.faculty.isAuthenticated) {
            navigate('/faculty')
        }
    }, [store.faculty.isAuthenticated, navigate])

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    useEffect(() => {
        if (store.student.isAuthenticated) {
            navigate('/student')
        }
    }, [store.student.isAuthenticated, navigate])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorHelper(store.errorHelper)
        }
    }, [store.errorHelper])


    const facultyFormHandler = async (e) => {
        e.preventDefault()
        setIsFacultyLoading(true)

        const loginCredentials = { registrationNumber: facultyRegNum, password: facultyPassword }

        const response = await fetch(`${url}/api/faculty/login`, {
            method: 'POST',
            body: JSON.stringify(loginCredentials),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            dispatch(setErrors(json))
            setIsFacultyLoading(false)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('facultyJwtToken', JSON.stringify(json.token))
            const decoded = jwtDecode(json.token)
            dispatch(setErrors(null))
            setIsFacultyLoading(false)
            setFacultyRegNum('')
            setFacultyPassword('')
            //update state
            dispatch(setFaculty(decoded))
        }
    }


    const studentFormHandler = async (e) => {
        e.preventDefault()
        setIsStudentLoading(true)

        const loginCredentials = { registrationNumber: studentRegNum, password: studentPassword }

        const response = await fetch(`${url}/api/student/login`, {
            method: 'POST',
            body: JSON.stringify(loginCredentials),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            dispatch(setErrorsHelper(json))
            setIsStudentLoading(false)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('studentJwtToken', JSON.stringify(json.token))
            const decoded = jwtDecode(json.token)
            dispatch(setErrorsHelper(null))
            setIsStudentLoading(false)
            setStudentRegNum('')
            setStudentPassword('')
            //update state
            dispatch(setStudent(decoded))
        }
    }

    return (
        <div className="container-fluid">
            <div className="row" id="trail">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                    <div className="row m-5">
                        <div className="col-md-8 m-auto border" style={{ backgroundColor: "white", borderRadius: "1.2rem", padding: "1rem 1rem 0rem 1rem" }}>
                            <div>
                                <h3 className="text-center ">FACULTY</h3>
                                <form noValidate onSubmit={facultyFormHandler}>
                                    <div className="form-group">
                                        <label htmlFor="facRegId">Registration Number</label>
                                        <input onChange={(e) => setFacultyRegNum(e.target.value)} type="text" value={facultyRegNum} className={classnames('form-control', {
                                            'is-invalid': error.registrationNumber
                                        })}
                                            id="facRegId" />
                                        {error.registrationNumber && (
                                            <div className="invalid-feedback">{error.registrationNumber}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordFacId">Password</label>
                                        <input onChange={(e) => setFacultyPassword(e.target.value)} value={facultyPassword} className={classnames("form-control", {
                                            'is-invalid': error.password
                                        })}
                                            type="password" id="passwordFacId" />
                                        {error.password && (
                                            <div className="invalid-feedback">{error.password}</div>
                                        )}
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-1">
                                            {
                                                isFacultyLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    {!isFacultyLoading && <button type="submit" className="btn btn-info btn-block">Log In</button>}
                                </form>
                                <p className="text-center mt-2 "><Link className="text-center text-decoration-none" to="/forgotPassword/faculty">Forgot Password?</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-md-8 m-auto border" style={{ backgroundColor: "white", borderRadius: "1.2rem", padding: "1rem 1rem 0rem 1rem" }}>
                            <div>
                                <h3 className="text-center">STUDENT</h3>
                                <form noValidate onSubmit={studentFormHandler}>
                                    <div className="form-group">
                                        <label htmlFor="studentId">Registration Number</label>
                                        <input onChange={(e) => setStudentRegNum(e.target.value)} type="text" value={studentRegNum} className={classnames('form-control', {
                                            'is-invalid': errorHelper.registrationNumber
                                        })}
                                            id="studentId" />
                                        {errorHelper.registrationNumber && (
                                            <div className="invalid-feedback">{errorHelper.registrationNumber}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordId">Password</label>
                                        <input onChange={(e) => setStudentPassword(e.target.value)} value={studentPassword} className={classnames("form-control", {
                                            'is-invalid': errorHelper.password
                                        })}
                                            type="password" id="passwordId" />
                                        {errorHelper.password && (
                                            <div className="invalid-feedback">{errorHelper.password}</div>
                                        )}
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-1">
                                            {
                                                isStudentLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isStudentLoading && <button type="submit" className="btn btn-info btn-block ">Log In</button>}

                                </form>
                                <p className="text-center"><Link className="text-center text-decoration-none" to="/forgotPassword/student">Forgot Password?</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyStudentLoginPage