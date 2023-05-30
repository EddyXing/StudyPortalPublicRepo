import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import { facultyUpdateProfileFlag, setFaculty } from '../../features/facultySlice'
import { setErrors } from '../../features/errorSlice'


const FacultyUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [gender, setGender] = useState('')
    const [facultyMobileNumber, setContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const url = "https://collegeapi.onrender.com"

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
        formData.append("facultyMobileNumber", facultyMobileNumber)
        formData.append("aadharCard", aadharCard)
        formData.append("avatar", avatar)
        formData.append("email", store.faculty.faculty.faculty.email)
        const response = await fetch(`${url}/api/faculty/updateProfile`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('facultyJwtToken'))}`
            }
        })
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            dispatch(setErrors(json))
            setIsLoading(false)
        }
        if (response.ok) {
            setGender('')
            setAadharCard('')
            setAvatar('')
            setContactNumber('')
            dispatch(setErrors({}))
            dispatch(facultyUpdateProfileFlag(true))
            alert("Kindly login again to see updates")
            localStorage.removeItem('facultyJwtToken')
            dispatch(setFaculty(null))
            navigate('/')
        }
    }

    useEffect(() => {
        if (store.faculty.updateProfileFlag) {
            setIsLoading(false)
        }
    }, [store.faculty.updateProfileFlag])

    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
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
                </div></> : (navigate('/'))}

        </div>
    )
}

export default FacultyUpdateProfile