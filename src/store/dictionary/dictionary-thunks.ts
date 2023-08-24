import { createAsyncThunk } from '@reduxjs/toolkit'
import { Word } from '../../types'
import { API_DICTIONARY } from '../../config'

export const loadWord = createAsyncThunk<Word, string, { rejectValue: string }>('@@dictionary/load-word', async (word, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_DICTIONARY}/${word}`)
        if (!response.ok) {
            throw new Error(`An error occurred during get fonts...`)
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