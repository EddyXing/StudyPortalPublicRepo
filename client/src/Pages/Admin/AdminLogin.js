import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import { setAdmin } from '../../features/adminSlice'



const LoginPage = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const url = "https://collegeapi.onrender.com"

    useEffect(() => {
        if (store.admin.isAuthenticated) {
            navigate('/admin')
        }
    }, [store.admin.isAuthenticated, navigate])
    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const loginCredentials = { registrationNumber, password }

        const response = await fetch(`${url}/api/admin/login`, {
            method: 'POST',
            body: JSON.stringify(loginCredentials),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const decoded = jwt_decode(json.token)
        if (!response.ok) {
            setError(json)
            setIsLoading(false)
        }
        if (response.ok) {
            //saving the admin token to local storage
            localStorage.setItem('adminJwtToken', JSON.stringify(json.token))
            setIsLoading(false)
            setError(null)
            setRegistrationNumber('')
            setPassword('')
            dispatch(setAdmin(decoded))
        }

    }

    useEffect(() => {
        if (store.error ||
            store.admin.isAuthenticated) {
            setIsLoading(false)
        }

        else {
            setIsLoading(true)
        }
    }, [store.error, store.admin.isAuthenticated])


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="d-flex justify-content-md-center align-items-center vh-100">
                        <div>
                            <h1 className="display-4 text-center">ADMIN</h1>
                            <form noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="emailId">Registration Number</label>
                                    <input onChange={(e) => setRegistrationNumber(e.target.value)} type="text" value={registrationNumber} className={classnames("form-control form-control-lg",
                                        {
                                            'is-invalid': error.registrationNumber

                                        })} id="emailId" />
                                    {error.registrationNumber && (<div className="invalid-feedback">{error.registrationNumber}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordId">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} className={classnames("form-control form-control-lg", {
                                        "is-invalid": error.password
                                    })} type="password" id="passwordId" />
                                    {error.password && (<div className="invalid-feedback">{error.password}</div>)}
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
                                {!isLoading && <button type="submit" className="btn btn-info btn-block">Log In</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage