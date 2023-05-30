import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import isEmpty from "../validation/is-empty"

const initialState = {
    isAuthenticated: false,
    student: {},
    alongsideStudent: {},
    flag: false,
    chatHistory: [],
    regNumStudent: {},
    privateChat: [],
    privateChat2: [],
    newerChats: [],
    previousChats: [],
    allSubjects: [],
    attendance: [],
    allMarks: {}
}

const url = "https://collegeapi.onrender.com"

export const fetchNewerChats = createAsyncThunk(
    'student/fetchNewerChats',
    async (name, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/chat/newerChats/${name}`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('failed to fetch new chats')
        }
    }
)

export const fetchPreviousChats = createAsyncThunk(
    'student/fetchPreviousChats',
    async (name, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/chat/previousChats/${name}`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('failed to fetch previous chats')
        }
    }
)

export const fetchAttendance = createAsyncThunk(
    'student/fetchAttendance',
    async (name, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/checkAttendance`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('failed to fetch attendance')
        }
    }
)

export const getAllSubjects = createAsyncThunk(
    'student/getAllSubjects',
    async (name, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/getAllSubjects`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('failed to fetch subjects')
        }
    }
)

export const getMarks = createAsyncThunk(
    'student/getMarks',
    async (name, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/getMarks`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('Error in getting marks')
        }
    }
)

export const sendMessage = createAsyncThunk(
    'student/sendMessage',
    async ({ room, messageObj }, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/chat/${room}`, {
                method: 'Post',
                data: messageObj,
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('Error in sending message')
        }
    }
)

export const getPrivateConversation = createAsyncThunk(
    'student/getPrivateConversation',
    async (roomId, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/chat/${roomId}`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('Error in getting private chat')
        }
    }
)

export const getPrivateConversation2 = createAsyncThunk(
    'student/getPrivateConversation2',
    async (roomId, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/chat/${roomId}`, {
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('Error in getting private chat')
        }
    }
)

export const getStudentByRegName = createAsyncThunk(
    'student/getStudentByRegName',
    async (registrationNumber, thunkAPI) => {
        try {
            const res = await axios(`${url}/api/student/getStudentByRegNo`, {
                method: 'Post',
                data: { registrationNumber },
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('studentJwtToken'))}`
                }
            })
            return res.data.result
        } catch (err) {
            return thunkAPI.rejectWithValue('Error in getting private chat')
        }
    }
)

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudent: (state, action) => {
            state.isAuthenticated = !isEmpty(action.payload)
            state.student = action.payload
        },
        chatHelper: (state, action) => {
            state.alongsideStudent = action.payload
        },
        setFlag: (state, action) => {
            state.flag = true
        },
        setChat: (state, action) => {
            state.chatHistory = [action.payload, ...state.chatHistory]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewerChats.fulfilled, (state, action) => {
                state.newerChats = action.payload
            })
            .addCase(fetchPreviousChats.fulfilled, (state, action) => {
                state.previousChats = action.payload
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.attendance = action.payload
            })
            .addCase(getAllSubjects.fulfilled, (state, action) => {
                state.allSubjects = action.payload
            })
            .addCase(getMarks.fulfilled, (state, action) => {
                state.allMarks = action.payload
            })
            .addCase(getPrivateConversation.fulfilled, (state, action) => {
                state.privateChat = action.payload
            })
            .addCase(getPrivateConversation2.fulfilled, (state, action) => {
                state.privateChat2 = action.payload
            })
            .addCase(getStudentByRegName.fulfilled, (state, action) => {
                state.regNumStudent = action.payload
            })
    }
})

export const { setStudent, chatHelper, setFlag, setChat } = studentSlice.actions

export default studentSlice.reducer