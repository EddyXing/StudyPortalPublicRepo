import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import { adminAddSubjectFlag } from '../../features/adminSlice'

const AdminAddSubject = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [subjectName, setSubjectName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [totalLectures, setTotalLectures] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const url = "https://collegeapi.onrender.com"

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])
    const formHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const subjectCredential = {
            subjectCode,
            subjectName,
            totalLectures,
            department,
            year
        }

        const response = await fetch(`${url}/api/admin/addSubject`, {
            method: 'POST',
            body: JSON.stringify(subjectCredential),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(localStorage.getItem('adminJwtToken'))}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json)
            setIsLoading(false)
        }
        if (response.ok) {
            setError({})
            setIsLoading(false)
            setSubjectName('')
            setSubjectCode('')
            setTotalLectures('')
            setYear('')
            setDepartment('')
            dispatch(adminAddSubjectFlag(true))
        }
    }

    useEffect(() => {
        if (store.admin.adminAddSubjectFlag) {
            setError({})
        }
    }, [store.admin.adminAddSubjectFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddSubjectFlag) {
            setIsLoading(false)
        }
    }, [store.error, store.admin.adminAddSubjectFlag])

    return (
        <div>
            {store.admin.isAuthenticated ? <> <AdminHomeHelper />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="d-flex justify-content-md-center vh-100">
                                <form noValidate onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="snameId">Subject Name</label>
                                        <input onChange={(e) => setSubjectName(e.target.value)} type="text" className={classnames("form-control",
                                            {
                                                'is-invalid': error.subjectName
                                            })} id="snameId" />
                                        {error.subjectName && (<div className="invalid-feedback">{error.subjectName}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scodeId">Subject Code</label>
                                        <input onChange={(e) => setSubjectCode(e.target.value)} type="text" className={classnames("form-control",
                                            {
                                                'is-invalid': error.subjectCode
                                            })} id="scodeId" />
                                        {error.subjectCode && (<div className="invalid-feedback">{error.subjectCode}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="totalLectures">Total Lectures</label>
                                        <input onChange={(e) => setTotalLectures(e.target.value)} type="number" className={classnames("form-control",
                                            {
                                                'is-invalid': error.totalLectures
                                            })} id="totalLectures" />
                                        {error.totalLectures && (<div className="invalid-feedback">{error.totalLectures}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="departmentId">Department</label>
                                        <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.department
                                            })} id="departmentId">
                                            <option>Select</option>
                                            <option value="E.C.E">E.C.E</option>
                                            <option value="E.E.E">E.E.E</option>
                                            <option value="C.S.E">C.S.E</option>
                                            <option value="I.T">I.T</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Civil">Civil</option>
                                        </select>
                                        {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yearId">Year</label>
                                        <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.year

                                            })} id="yearId">
                                            <option>Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>

                                        {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-1">
                                            {
                                                isLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isLoading && <button type="submit" className="btn btn-info  ">Add Subject</button>}


                                </form>
                            </div>
                        </div>
                    </div>
                </div></> : (navigate('/'))}
        </div>
    )
}

export default AdminAddSubject