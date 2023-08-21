import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface fontsState {
    currentFont: string | null
}


const initialState: fontsState = {
    currentFont: null,
}

export const counterSlice = createSlice({
    name: '@@fonts',
    initialState,
    reducers: {
        changeFont: (state, action: PayloadAction<string>) => {
            state.currentFont = action.payload;
        },
    },
})

export const { changeFont } = counterSlice.actions


export default counterSlice.reducer