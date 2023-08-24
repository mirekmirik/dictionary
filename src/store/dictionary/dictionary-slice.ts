import { createSlice } from "@reduxjs/toolkit";
import { ErrorT, Status, Word } from "../../types";
import { loadWord } from "./dictionary-thunks";


interface DictionaryState {
    word: Word | null,
    status: Status,
    error: ErrorT | null
}

const initialState: DictionaryState = {
    word: null,
    status: "idle",
    error: null
}

const dictionarySlice = createSlice({
    name: '@@dictionary',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWord.pending, (state) => {
                state.status = "loading"
                state.error = "null"
            })
            .addCase(loadWord.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.error = null
                state.word = action.payload
            })
            .addCase(loadWord.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload!
            })
    }
})

export default dictionarySlice.reducer
