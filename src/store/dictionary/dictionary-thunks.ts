import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, Word } from '../../types'
import { ADD_MARKED_SERVER, ADD_RECENTS_SERVER, API_DICTIONARY, DELETE_RECENTS_SERVER, GET_MARKED_SERVER, GET_RECENTS_SERVER, SERVER } from '../../config'

export const loadWord = createAsyncThunk<Word, string, { rejectValue: string }>('@@dictionary/load-word', async (word, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_DICTIONARY}/${word}`)
        if (!response.ok) {
            const data = await response.json()

            throw new Error(data.title)
        }
        const [data] = await response.json()
        return data
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
    }
})
export const addFavouriteWord = createAsyncThunk<undefined, { login: User['login'], word: Word['word'] }, { rejectValue: string }>('@@dictionary/add-favourite-word', async (data, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${SERVER}/${ADD_MARKED_SERVER}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error)
        }
        
        dispatch(getFavouriteWords(data.login))
        
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Unknown error by marked word...');
    }
})

export const getFavouriteWords = createAsyncThunk<string[], string, { rejectValue: string }>('@@dictionary/get-favourite-words', async (login, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${SERVER}/${GET_MARKED_SERVER}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ login })
        })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error)
        }
        const result = await response.json()
        return result;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Unknown error by get marked words...');
    }
})

export const addRecentWord = createAsyncThunk<string, { login: User['login'], word: Word['word'] }, { rejectValue: string }>('@@dictionary/add-recent-words', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${SERVER}/${ADD_RECENTS_SERVER}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error)
        }
        const result = await response.json()
        return result;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Unknown error by add to recents word...');
    }
})

export const getRecentWords = createAsyncThunk<string[], string, { rejectValue: string }>('@@dictionary/get-recent-words', async (login, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${SERVER}/${GET_RECENTS_SERVER}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({ login })
        })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error)
        }
        return (await response.json())
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Unknown error by add to recents word...');
    }
})

export const deleteRecentWord = createAsyncThunk<string[], { login: User['login'], word: Word['word'] }, { rejectValue: string }>('@@dictionary/delete-recent-words', async (data, {rejectWithValue}) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${SERVER}/${DELETE_RECENTS_SERVER}/${data.login}/${data.word}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error)
        }
        const result = await response.json()
        return result;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Unknown error by add to recents word...');
    }
})