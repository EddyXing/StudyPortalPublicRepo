import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import { getAllStudent } from '../../features/adminSlice'

const AdminGetAllStudent = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const url = "https://collegeapi.onrender.com"

    const formHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch(`${url}/api/admin/getAllStudent`, {
            method: 'POST',
            body: JSON.stringify({ department, year }),
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
            setDepartment('')
            setYear('')
            dispatch(getAllStudent(json.result))
        }
    }

    useEffect(() => {
        if (store.admin.allStudent.length !== 0) {
            setIsLoading(false)
        }

    }, [store.admin.allStudent.length])
    return (
        <div>
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <form noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="departmentId">Department</label>
                                    <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.department
                                        })} id="departmentId">
                                        <option>Select</option>
                                        <option value="E.C.E">E.C.E</option>
                                        <option value="C.S.E">C.S.E</option>
                                        <option value="I.T">I.T</option>
                                        <option value="E.E.E">E.E.E</option>
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
                                {!isLoading && <button type="submit" className="btn btn-info btn-block  ">Search</button>}


                            </form>


                        </div>
                        <div className="col-md-8">

                            {store.admin.allStudent.length !== 0 && <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Section</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.admin.allStudent.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.registrationNumber}</td>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.section}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>}

                        </div>
                    </div>
                </div>
            </> : (navigate('/'))}
        </div>
    )
}

export default AdminGetAllStudent