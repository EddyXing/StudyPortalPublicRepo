import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAdmin } from '../features/adminSlice'


const Home = () => {
    const { admin } = useSelector(store => store.admin)
    const [name, setName] = useState("")
    useEffect(() => {

        if (admin.name) {
            setName(admin.name)
        }
    }, [admin.name])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        localStorage.removeItem('adminJwtToken')
        dispatch(setAdmin(null))
        navigate('/adminLogin')
    }
    return (
        <div className="container-fluid">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h4 className="navbar-brand mt-1" href="">AIT</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button type="button" className="btn"><Link to="/admin" className="text-decoration-none"><li>{name.toUpperCase()}</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addFaculty" className="text-decoration-none"><li>ADD FACULTY</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addStudent" className="text-decoration-none"><li>ADD STUDENT</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addSubject" className="text-decoration-none"><li>ADD SUBJECT</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addAdmin" className="text-decoration-none"><li>ADD ADMIN</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allFaculties" className="text-decoration-none"><li>OUR FACULTIES</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allStudents" className="text-decoration-none"><li>OUR STUDENTS</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allSubject" className="text-decoration-none"><li>SUBJECTS</li></Link></button>
                        </li>

                    </ul>
                </div>
                <div>

                    <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn btn-secondary"><li>LOGOUT</li></button>

                </div>
            </nav>
        </div>
    )
}

export default Home