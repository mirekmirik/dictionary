import { createSlice } from "@reduxjs/toolkit";
import { ErrorT, Status, User } from "../../types";
import { getProfile, loginUser, registerUser } from "./auth-thunks";
import { AppDispatch } from "../store";



interface AuthState {
    user: User | null,
    status: Status,
    error: ErrorT | null
}

const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null
}


const AuthSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers: {
        clearError: () => {
            return initialState
        },
        logout: () => {
            localStorage.removeItem('token')
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.error = null
                state.status = 'fulfilled'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload!
                state.status = 'rejected'
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.error = null
                state.status = 'fulfilled'
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload!
                state.status = 'rejected'
            })
            .addCase(getProfile.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = null
                state.status = 'fulfilled'
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.user = null
                state.error = action.payload!
                state.status = 'rejected'
            })
    }
})

export const logoutUser = () => (dispatch: AppDispatch) => {
    dispatch({ type: "RESET" })
    dispatch(logout())
}

export const { clearError, logout } = AuthSlice.actions

export default AuthSlice.reducer
