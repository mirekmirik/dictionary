import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loadFonts } from './fonts-thunks'
import { ErrorT, Font, Status } from '../../types'


interface FontsState {
    status: Status,
    fonts: Font[],
    currentFont: Font | null,
    error: ErrorT | null,
}


const initialState: FontsState = {
    status: 'idle',
    error: null,
    fonts: [],
    currentFont: null
}

const fontsSlice = createSlice({
    name: '@@fonts',
    initialState,
    reducers: {
        setFont: (state, action: PayloadAction<Font>) => {
            state.currentFont = action.payload;
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