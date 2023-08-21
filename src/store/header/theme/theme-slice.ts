import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeState = 'light' | 'dark'


const initialState = 'dark' as ThemeState

export const ThemeSlice = createSlice({
  name: '@@theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      return action.payload
    },
  },
})


export const { setTheme } = ThemeSlice.actions

export default ThemeSlice.reducer