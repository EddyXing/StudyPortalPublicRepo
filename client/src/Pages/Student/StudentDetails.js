import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HomeHelper from '../../Components/StudentHomeHelper'
import { Link, useNavigate } from 'react-router-dom'
import { setErrors } from '../../features/errorSlice'

const StudentDetails = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [result, setResult] = useState([])
    const [error, setError] = useState({})


    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const filterStudentHelper = async () => {
        const res = await fetch('http://localhost:4000/api/student/getAllStudents', {
            method: 'POST',
            body: JSON.stringify({ department, year, section }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
            }
        })

        const json = await res.json()
        if (!res.ok) {
            dispatch(setErrors(json))
        }
        if (res.ok) {
            setResult(json.result)
            dispatch(setErrors({}))
        }
    }

    const filterByNameHelper = async () => {

        const res = await fetch('http://localhost:4000/api/student/getStudentByName', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
            }
        })

        const json = await res.json()
        if (!res.ok) {
            dispatch(setErrors(json))
        }
        if (res.ok) {
            dispatch(setErrors({}))
            setResult(json.result)
        }
    }


    const formHandler = (e) => {
        e.preventDefault()
        if (name) {
            filterByNameHelper()
        }
        else {
            filterStudentHelper()
        }
    }
    console.log(error)
    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container">
                    {result.length === 0 && <div className="row">
                        <div className="col-md-3 border mt-4">
                            <div className="row mt-3">
                                <div className="col mb-2">
                                    <form className="form-inline" onSubmit={formHandler}>
                                        <div className="form-group mb-3">
                                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Search by name" type="text" className="form-control" />
                                        </div>
                                        <button type="submit" className="btn btn-block btn-info">Search</button>
                                    </form>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4 mb-4 ">
                                <div className="col">
                                    <form noValidate onSubmit={formHandler}>
                                        <div className="form-group">
                                            <label htmlFor="branchId">Branch</label>
                                            <select onChange={(e) => setDepartment(e.target.value)} className="form-control" id="branchId">
                                                <option>Select</option>
                                                <option value="E.C.E">E.C.E</option>
                                                <option value="E.E.E" >E.E.E</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Civil">Civil</option>
                                                <option value="I.T">I.T</option>
                                                <option value="C.S.E">C.S.E</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="yearId">Year</label>
                                            <select onChange={(e) => setYear(e.target.value)} className="form-control" id="yearId">
                                                <option>Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="sectionId">Section</label>
                                            <select onChange={(e) => setSection(e.target.value)} className="form-control" id="sectionId">
                                                <option>Select</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                                <option value="F">F</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-info btn-block">Search</button>
                                    </form>
                                    <br />
                                    {error.emptyFields && <div className="alert alert-danger" role="alert">{error.emptyFields}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 border mt-4">
                            <div className="row justify-content-center ">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md-6 border">
                                            <h4 className="text-center">New Chats</h4>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        store.student.newerChats.map((res, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{res.senderName}</td>
                                                                <td><Link to={`/student/${res.senderRegistrationNumber}`} className="text-decoration-none btn btn-info">Explore</Link></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-6 border">
                                            <h4 className="text-center">Older Chats</h4>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        store.student.previousChats.map((res, index) =>
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{res.receiverName}</td>
                                                                <td><Link to={`/student/${res.receiverRegistrationNumber}`} className="text-decoration-none btn btn-info">Explore</Link></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {result.length !== 0 && <div className="row">
                        <div className="col-md-6 m-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Chat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((obj, index) =>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{obj.registrationNumber}</td>
                                            <td>{obj.name}</td>
                                            <td><Link to={`/student/${obj.registrationNumber}`} className="text-decoration-none btn btn-info">Explore</Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>}

                </div></> : (navigate('/'))}

        </div>
    )
}

export default StudentDetails