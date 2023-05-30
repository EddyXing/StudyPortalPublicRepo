import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import Footer from '../../Components/Footer';

const FacultyHome = () => {
    const navigate = useNavigate()
    const { faculty, isAuthenticated } = useSelector((store) => store.faculty)
    return (
        <>
            {isAuthenticated ? <>
                <FacultyHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={faculty.faculty.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{faculty.faculty.name}</h5>
                                            <h5 className="card-title">{faculty.faculty.registrationNumber}</h5>
                                            <Link to='/faculty/updateProfile' className="btn btn-info">UPDATE PROFILE</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{faculty.faculty.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{faculty.faculty.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{faculty.faculty.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Date Of Birth</td>
                                                <td>{faculty.faculty.dob}</td>
                                            </tr>
                                            <tr>
                                                <td>Designation</td>
                                                <td>{faculty.faculty.designation}</td>
                                            </tr>
                                            <tr>
                                                <td>Joining Year</td>
                                                <td>{faculty.faculty.joiningYear}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{faculty.faculty.department}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>{faculty.faculty.gender ? faculty.faculty.gender :

                                                    "NA"
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{faculty.faculty.facultyMobileNumber ?
                                                    faculty.faculty.facultyMobileNumber : "NA"}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">

                        </div>

                    </div>
                </div>
                <Footer />
            </> : (navigate('/'))}

        </>


    )
}

export default FacultyHome