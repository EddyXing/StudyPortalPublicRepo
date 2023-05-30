import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { setFlag } from '../features/studentSlice'


const ForgotPassword = () => {
    const store = useSelector((store) => store)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useParams()
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [helper, setHelper] = useState(false)

    const url = "https://collegeapi.onrender.com"

    useEffect(() => {
        if (store.error) {
            setErrors(store.error)
        }
    }, [store.error])

    useEffect(() => {
        if (store.student.flag) {
            setHelper(true)
        }
    }, [store.student.flag])

    const sendOTPHandler = async (e) => {
        e.preventDefault()
        if (user === "student") {
            const response = await fetch(`${url}/api/student/forgotPassword`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setErrors(json)
            }
            if (response.ok) {
                setErrors({})
                dispatch(setFlag())
            }
        }
        else if (user === "faculty") {
            const response = await fetch(`${url}/api/faculty/forgotPassword`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setErrors(json)
            }
            if (response.ok) {
                setErrors({})
                dispatch(setFlag())
            }
        }
    }

    const submitOTPHandler = async (e) => {
        e.preventDefault()
        if (user === "student") {
            const response = await fetch(`${url}/api/student/postOTP`, {
                method: 'POST',
                body: JSON.stringify({ email, otp, newPassword, confirmNewPassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert("Password Update, kindly login with updated password")
            const json = await response.json()
            if (!response.ok) {
                setErrors(json)
            }
            if (response.ok) {
                setErrors({})
                setEmail('')
                setOtp('')
                setNewPassword('')
                setConfirmNewPassword('')
                navigate('/')
            }
        }
        else if (user === "faculty") {
            const response = await fetch(`${url}/api/faculty/postOTP`, {
                method: 'POST',
                body: JSON.stringify({ email, otp, newPassword, confirmNewPassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert("Password Update, kindly login with updated password")
            const json = await response.json()
            if (!response.ok) {
                setErrors(json)
            }
            if (response.ok) {
                setErrors({})
                setEmail('')
                setOtp('')
                setNewPassword('')
                setConfirmNewPassword('')
                navigate('/')
            }
        }
    }




    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 m-auto">
                    {!helper ? <>
                        <form noValidate onSubmit={sendOTPHandler}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail11">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className={classnames('form-control', {
                                    'is-invalid': errors.email
                                })} id="exampleInputEmail11" placeholder="Provide our registered email" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">OTP will be only valid for 5 minute.</small>
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">Send OTP</button>
                        </form>
                    </> : <>
                        <form noValidate onSubmit={submitOTPHandler}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">OTP</label>
                                <input onChange={(e) => setOtp(e.target.value)} value={otp} type="number" className={classnames('form-control', {
                                    'is-invalid': errors.otp
                                })} id="exampleInputEmail1" />
                                {errors.otp && (
                                    <div className="invalid-feedback">{errors.otp}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">New Password</label>
                                <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" className={classnames('form-control', {
                                    'is-invalid': errors.newPassword
                                })} id="exampleInputEmail2" />
                                {errors.newPassword && (
                                    <div className="invalid-feedback">{errors.newPassword}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail3">Confirm New Password</label>
                                <input onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} type="password" className={classnames('form-control', {
                                    'is-invalid': errors.confirmNewPassword
                                })} id="exampleInputEmail3" />
                                {errors.confirmNewPassword && (
                                    <div className="invalid-feedback">{errors.confirmNewPassword}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword