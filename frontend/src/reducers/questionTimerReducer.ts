
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export const perQuestionTime = createSlice({
  name: 'duration',
  initialState:60,
  reducers: {
    setDuration: (_, action: PayloadAction<number>) => action.payload,
  },
})

export const { setDuration } = perQuestionTime.actions
export default perQuestionTime.reducer