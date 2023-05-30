import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import Footer from '../../Components/Footer';

const AdminHome = () => {
    const state = useSelector((store) => store.admin)
    const navigate = useNavigate()
    return (
        <div>

            {state.isAuthenticated ? <>
                <AdminHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={state.admin.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{state.admin.name}</h5>
                                            <h5 className="card-title">{state.admin.registrationNumber}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{state.admin.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{state.admin.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{state.admin.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Joining Year</td>
                                                <td>{state.admin.joiningYear}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{state.admin.department}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{state.admin.contactNumber ?
                                                    state.admin.contactNumber : "NA"}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </div>
                <Footer />
            </> : (navigate('/'))}

        </div>
    )
}

export default AdminHome