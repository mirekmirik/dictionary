import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import { SERVER } from "../../config";

type UserFormData = {
    login: User['login'],
    password: string
}

export const registerUser = createAsyncThunk<UserFormData, UserFormData, { rejectValue: string }>('@@auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch(`${SERVER}/api/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error)
        }
        const result = await response.json()
        return result

    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
    }
})


export const loginUser = createAsyncThunk<undefined, UserFormData, { rejectValue: string }>('@@auth/login', async (data, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch(`${SERVER}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error)
        }
        const result = await response.json()
        dispatch(getProfile(result.token))
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
    }
})



export const getProfile = createAsyncThunk<User, string, { rejectValue: string }>('@@auth/getProfile', async (token, { rejectWithValue }) => {
    try {
        const response = await fetch(`${SERVER}/api/auth/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        localStorage.setItem('token', token)
        return data.user

    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
    }
})