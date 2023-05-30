import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFaculty } from '../features/facultySlice'



const Home = () => {
    const { faculty } = useSelector((store) => store.faculty)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    useEffect(() => {

        if (faculty.faculty.name) {
            setName(faculty.faculty.name)
        }
    }, [faculty.faculty.name])
    const logoutHandler = () => {
        localStorage.removeItem('facultyJwtToken')
        dispatch(setFaculty(null))
        navigate('/')
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <h4 className="navbar-brand mt-1" href="">AIT</h4>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <button type="button" className="btn"><Link to="/faculty" className="text-decoration-none"><li>{name.toUpperCase()}</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/updateProfile" className="text-decoration-none"><li>UPDATE PROFILE</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/attendenceFaculty" className="text-decoration-none"><li>MARK ATTENDANCE</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/uploadMarks" className="text-decoration-none"><li>UPLOAD MARKS</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/updatePassword" className="text-decoration-none"><li>UPDATE PASSWORD</li></Link></button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn btn-secondary"><li>LOGOUT</li></button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Home