import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './features/adminSlice'
import facultyReducer from './features/facultySlice'
import studentReducer from './features/studentSlice'
import errorReducer from './features/errorSlice'
import errorHelperReducer from './features/errorHelperSlice'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        faculty: facultyReducer,
        student: studentReducer,
        error: errorReducer,
        errorHelper: errorHelperReducer
    }
})