import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import fontsReducer from './header/fonts/fonts-slice'
import themeReducer from './header/theme/theme-slice'
import dictionaryReducer from './dictionary/dictionary-slice'
// ...
const store = configureStore({
    reducer: {
        fonts: fontsReducer,
        theme: themeReducer,
        dictionary: dictionaryReducer
    },
})



export type AppDispatch = typeof store.dispatch


export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store