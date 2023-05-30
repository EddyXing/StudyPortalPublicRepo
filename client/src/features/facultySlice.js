import { createSlice } from "@reduxjs/toolkit"
import isEmpty from "../validation/is-empty"

const initialState = {
    isAuthenticated: false,
    faculty: null,
    flag: false,
    updateProfileFlag: false,
    allSubjectCodeList: null,
    fetchedStudents: null,
    fetchedStudentsHelper: true
}

const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setFaculty: (state, action) => {
            state.isAuthenticated = !isEmpty(action.payload)
            state.faculty = action.payload
        },
        fetchStudents: (state, action) => {
            state.fetchedStudentsHelper = false
            state.fetchedStudents = action.payload
        },
        facultyUpdateProfileFlag: (state, action) => {
            state.updateProfileFlag = action.payload
        },
        getSubjectCodeList: (state, action) => {
            state.allSubjectCodeList = action.payload
        },
        helper: (state, action) => {
            state.fetchedStudentsHelper = action.payload
        }
    }
})

export const { setFaculty, fetchStudents, facultyUpdateProfileFlag, getSubjectCodeList, helper } = facultySlice.actions

export default facultySlice.reducer