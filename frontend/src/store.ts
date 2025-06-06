import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './reducers/currentUserReducer'
import perQuestionTime  from './reducers/questionTimerReducer'
import questionReducer from './reducers/questionsReducer'
import studentnameReducer from './reducers/studentNameReducer'

export const store = configureStore({
  reducer: {
    currentUser:currentUserReducer,
    duration:perQuestionTime,
    questions:questionReducer,
    studentName:studentnameReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch