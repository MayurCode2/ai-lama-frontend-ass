import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/auth/authSlice"
import projectReducer from "../pages/project/projectSlice"



export const store = configureStore({
   reducer:{
    auth: authReducer,
    projects:projectReducer,
   
   }
})

