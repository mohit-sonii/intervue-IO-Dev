
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OptionsType } from "../types";

const initialState :OptionsType[] =[]
export const questionReducer = createSlice({
    name:'questions',
    initialState,
    reducers:{
        addQuestion:(state,action:PayloadAction<OptionsType>)=>{
            state.push(action.payload)
        }
    }
})

export const { addQuestion } = questionReducer.actions
export default questionReducer.reducer