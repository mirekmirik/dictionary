import type { TypedUseSelectorHook } from 'react-redux'
import { Action, combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import fontsReducer from './fonts/fonts-slice'
import themeReducer from './theme/theme-slice'
import dictionaryReducer from './dictionary/dictionary-slice'
import AuthReducer from './auth/auth-slice'
import AIReducer from './ai/ai-slice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage
}

const appReducer = combineReducers({
    fonts: fontsReducer,
    theme: themeReducer,
    dictionary: dictionaryReducer,
    auth: AuthReducer,
    ai: AIReducer
});

const rootReducer = (state: any, action: Action) => {
    if (action.type === 'RESET') {
        state = undefined
    }

    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    devTools: true,
})

export const persistor = persistStore(store);



export type AppDispatch = typeof store.dispatch


export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export default store