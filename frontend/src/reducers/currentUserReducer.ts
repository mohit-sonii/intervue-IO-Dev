
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState:"",
  reducers: {
    setUser: (_, action: PayloadAction<string>) => action.payload,
  },
})

export const { setUser } = currentUserSlice.actions

export default currentUserSlice.reducer