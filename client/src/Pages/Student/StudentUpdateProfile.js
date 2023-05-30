import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HomeHelper from '../../Components/StudentHomeHelper'

import { useNavigate } from 'react-router-dom'
import { setStudent } from '../../features/studentSlice'
import { setErrors } from '../../features/errorSlice'

const StudentUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [gender, setGender] = useState('')
    const [studentMobileNumber, setContactNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])
    const formHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append("gender", gender)
        formData.append("studentMobileNumber", studentMobileNumber)
        formData.append("fatherName", fatherName)
        formData.append("fatherMobileNumber", fatherMobileNumber)
        formData.append("aadharCard", aadharCard)
        formData.append("avatar", avatar)
        formData.append("email", store.student.student.student.email)
        const response = await fetch('http://localhost:4000/api/student/updateProfile', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            dispatch(setErrors(json))
            setIsLoading(false)
        }
        if (response.ok) {
            setGender('')
            setAadharCard('')
            setAvatar('')
            setContactNumber('')
            setFatherContactNumber('')
            dispatch(setErrors({}))
            setIsLoading(false)
            alert("Kindly login again to see updates")
            localStorage.removeItem('studentJwtToken')
            dispatch(setStudent({}))
            navigate('/')
        }
        setModal(true)
    }
    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col-md-5 w-100 m-auto">
                            <form onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="inputId">Profile Picture</label>
                                    <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genderId">Gender</label>
                                    <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                        <option>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numberId">Contact Number</label>
                                    <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fatherId">Father Name</label>
                                    <input onChange={(e) => setFatherName(e.target.value)} type="text" className="form-control" id="fatherId" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fathercnId">Father Contact Number</label>
                                    <input onChange={(e) => setFatherContactNumber(e.target.value)} type="number" className="form-control" id="fathercnId" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="aadharId">Aadhar Card Number</label>
                                    <input onChange={(e) => setAadharCard(e.target.value)} type="number" className="form-control" id="aadharId" />
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
                                {error.emptyFields && <div className="alert alert-danger" role="alert">{error.emptyFields}</div>}
                                {!isLoading && <button type="submit" className="btn btn-info">Update</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </> : (navigate('/'))}

        </div>
    )
}

export default StudentUpdateProfile