import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const errorHelperSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrorsHelper: (state, action) => {
            return action.payload;
          }          
    }
})

export const { setErrorsHelper } = errorHelperSlice.actions

export default errorHelperSlice.reducer