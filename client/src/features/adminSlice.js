import { createSlice } from "@reduxjs/toolkit"
import isEmpty from "../validation/is-empty"

const initialState = {
    isAuthenticated: false,
    admin: null,
    adminAddFacultyFlag: false,
    adminAddStudentFlag: false,
    adminAddAdminFlag: false,
    adminAddSubjectFlag: false,
    allSubjects: [],
    allFaculty: [],
    allStudent: [],
    allSubject: []
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.isAuthenticated = !isEmpty(action.payload)
            state.admin = action.payload
        },
        getSubjects: (state, action) => {
            state.allSubjects = action.payload
        },
        adminAddAdminFlag: (state, action) => {
            state.adminAddAdminFlag = action.payload
        },
        adminAddFacultyFlag: (state, action) => {
            state.adminAddFacultyFlag = action.payload
        },
        adminAddStudentFlag: (state, action) => {
            state.adminAddStudentFlag = action.payload
        },
        adminAddSubjectFlag: (state, action) => {
            state.adminAddSubjectFlag = action.payload
        },
        getAllFaculty: (state, action) => {
            state.allFaculty = action.payload
        },
        getAllStudent: (state, action) => {
            state.allStudent = action.payload
        },
        getAllSubject: (state, action) => {
            state.allSubject = action.payload
        }
    }
})

export const { setAdmin, getSubjects, adminAddAdminFlag, adminAddFacultyFlag, adminAddStudentFlag, adminAddSubjectFlag, getAllFaculty, getAllStudent, getAllSubject } = adminSlice.actions

export default adminSlice.reducer