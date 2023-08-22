import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Status } from '../../../types/status'
import { loadFonts } from './fonts-thunks'
import { Font } from '../../../types'

interface fontsState {
    status: Status,
    fonts: Font[],
    currentFont: Font,
    error: string | null,
}


const initialState: fontsState = {
    status: 'idle',
    error: null,
    fonts: [],
    currentFont: {
        family: ''
    },
}

export const fontsSlice = createSlice({
    name: '@@fonts',
    initialState,
    reducers: {
        setFont: (state, action: PayloadAction<Font>) => {
            console.log('ss')
            state.currentFont = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFonts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loadFonts.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload!
            })
            .addCase(loadFonts.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.fonts = action.payload;
                state.currentFont = action.payload[0]
            })
    }
})

export const { setFont } = fontsSlice.actions


export default fontsSlice.reducer