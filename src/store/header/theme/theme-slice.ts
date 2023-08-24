import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeState = 'light' | 'dark'


const initialState = 'light' as ThemeState

export const ThemeSlice = createSlice({
  name: '@@theme',
  initialState,
  reducers: {
    setTheme: (_, action: PayloadAction<ThemeState>) => {
      return action.payload
    },
  },
})


export const { setTheme } = ThemeSlice.actions

export default ThemeSlice.reducer