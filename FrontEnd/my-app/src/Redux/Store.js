import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'
import CoursesSlice from './Slices/CoursesSlice'
import leactureSliceReducer from './Slices/LeactureSlice'

const Store = configureStore({
    reducer:{
        auth: AuthSlice,
        courses: CoursesSlice,
        leacture:leactureSliceReducer

       
}, devTools: process.env.NODE_ENV !== 'production',})

export default Store