import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from 'jwt-decode';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "",
        email: '',
        password: '',
        phone: '',
        role: '',
        token: '', 
        isLogged: false,
        isRegister: false,
        isError: false,
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                username: action.payload.user.name,
                email: action.payload.user.email,
                role: jwt(action.payload.token).user.role, 
                phone:  jwt(action.payload.token).user.phone,
                token: action.payload.token,
                isLogged: true,
                successMessage: 'Te has loggueado correctamente'
            }
        },
        register: (state, action) => {
            return {
                ...state,
                isRegister: true,
                successMessage: 'Te has registrado correctamente'
            }
        },
        logError: (state, action) => {
            return {
                ...state,
                isError: !action.payload.success,
                errorMessage: action.payload.message
            }
        },
        logout: (state) => {
            return {
                ...state.initialState
            }
        }
    }
})

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const user = await axios.post('https://aml-mysql-28-06-22-videostore.herokuapp.com/users/login',
        {
            email: email,
            password: password
        })

        let response = user
        if(response.status === 200){
            localStorage.setItem('token', response.data.token)
            dispatch(login(response.data))
        } 
    } catch (error) {
        dispatch(logError(error))
    }
}

export const registerUser = (email, password, name, phone, address) => async (dispatch) => {
    try {
        const user = await axios.post('https://aml-mysql-28-06-22-videostore.herokuapp.com/users/register',
        {
            name: name,
            password: password,
            phone: phone,
            email: email,
            address: address
        })

        let response = user
        if(response.status === 200){
            dispatch(register(response.data))
        } 
    } catch (error) {
        dispatch(logError(error))
    }
}

export const { login, logError, register, logout } = userSlice.actions
export const userSelector = (state) =>state.user
export default userSlice.reducer
 