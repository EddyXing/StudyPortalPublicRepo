import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import { useNavigate } from 'react-router-dom'
import { fetchStudents, getSubjectCodeList, helper } from '../../features/facultySlice'


const FacultyAttendance = () => {
    const store = useSelector((store) => store)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    const [checkedValue, setCheckedValue] = useState([])
    const [error, setError] = useState({})
    // const [flag, setFlag] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)

    const url = "https://collegeapi.onrender.com"

    const handleInputChange = (e) => {
        const tempCheck = checkedValue
        let index
        if (e.target.checked) {
            tempCheck.push(e.target.value)
        }
        else {
            index = tempCheck.indexOf(e.target.value)
            tempCheck.splice(index, 1)
        }
        setCheckedValue(tempCheck)
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const studentData = { department, year, section }
        const response = await fetch(`${url}/api/faculty/fetchStudents`, {
            method: 'POST',
            body: JSON.stringify(studentData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(localStorage.getItem('facultyJwtToken'))}`
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
            dispatch(fetchStudents(json.result))
            dispatch(getSubjectCodeList(json.subjectCode))
        }

    }

    useEffect(() => {
        if (store.error || !store.faculty.fetchedStudentsHelper) {
            setIsLoading(false)
        }

    }, [store.error, store.faculty.fetchedStudentsHelper])



    const secondFormHandler = async (e) => {
        e.preventDefault()
        setIsLoading2(true)
        const attendance = { selectedStudents: checkedValue, subjectCode, department, year, section }
        console.log(attendance, store.faculty.fetchedStudents)
        const response = await fetch(`${url}/api/faculty/markAttendance`, {
            method: 'POST',
            body: JSON.stringify(attendance),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(localStorage.getItem('facultyJwtToken'))}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json)
            setIsLoading2(false)
        }
        if (response.ok) {
            setError({})
            setIsLoading2(false)
            setCheckedValue([])
            setSubjectCode('')
            setDepartment('')
            setYear('')
            setSection('')
            alert("attendence has been marked successfully")
            dispatch(helper(true))
        }

    }

    useEffect(() => {
        if (store.faculty.fetchedStudentsHelper) {
            setIsLoading2(false)
        }

    }, [store.faculty.fetchedStudentsHelper])

    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                {store.faculty.fetchedStudentsHelper && <div className="row justify-content-center mt-4 ">
                    <div className="col-md-4">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="branchId">Department</label>
                                <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.department

                                    })} id="branchId">
                                    <option>Select</option>
                                    <option value={store.faculty.faculty.faculty.department}>{store.faculty.faculty.faculty.department}</option>
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

                            <div className="form-group">
                                <label htmlFor="sectionId">Section</label>
                                <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.section

                                    })} id="sectionId">
                                    <option>Select</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                </select>
                                {error.section && (<div className="invalid-feedback">{error.section}</div>)}
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
                            {!isLoading && <button type="submit" className="btn btn-info  ">Search</button>}
                        </form>
                    </div>
                </div>}


                {!store.faculty.fetchedStudentsHelper && <div className="row  justify-content-center mt-4">
                    <div className="col-md-4">
                        <form onSubmit={secondFormHandler}>
                            <div className="form-group">
                                <label htmlFor="subjectId">Subject Code</label>
                                <select required onChange={(e) => setSubjectCode(e.target.value)} className="form-control" id="subjectId">
                                    <option>Select</option>
                                    {
                                        store.faculty.allSubjectCodeList.map(subjectCodeName =>
                                            <option>{subjectCodeName}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td><div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                        </div></td>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Student Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.fetchedStudents.map((obj, index) =>
                                            <tr>
                                                <td><div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value={obj._id} onChange={handleInputChange} id="defaultCheck1" />
                                                </div></td>
                                                <td key={index}>{obj.registrationNumber}</td>
                                                <td>{obj.name}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="row justify-content-center">
                                <div className="col-md-1">
                                    {
                                        isLoading2 && <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {!isLoading2 && <button type="submit" className="btn btn-info ml-1  ">Submit</button>}
                        </form>
                    </div>
                </div>
                }</> : (navigate('/'))}

        </div>
    )
}

export default FacultyAttendance