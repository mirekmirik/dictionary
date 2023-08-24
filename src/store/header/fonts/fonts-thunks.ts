import { createAsyncThunk } from '@reduxjs/toolkit'
import { Font } from '../../../types'
import { API_DICTIONARY, API_FONTS } from '../../../config'

export const loadFonts = createAsyncThunk<Font[], undefined, { rejectValue: string }>('@@fonts/load-fonts', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(API_FONTS)
        if (!response.ok) {
            throw new Error(`An error occurred during get fonts...`)
        }
        const { items } = await response.json()
        const fonts: Font[] = items.slice(0, 30).map((font: Font) => {
            return {
                family: font.family
            }
        })
        return fonts;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
    }
})
