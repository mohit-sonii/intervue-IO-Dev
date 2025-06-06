
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const studentNameReducer = createSlice({
    name:'studentName',
    initialState:"",
    reducers:{
        studentname:(_,action:PayloadAction<string>)=>action.payload
    }
})

export const { studentname } = studentNameReducer.actions
export default studentNameReducer.reducer