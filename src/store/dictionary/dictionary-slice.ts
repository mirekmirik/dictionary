import { createSlice } from "@reduxjs/toolkit";
import { ErrorT, Status, Word } from "../../types";
import { addFavouriteWord, addRecentWord, deleteRecentWord, getFavouriteWords, getRecentWords, loadWord } from "./dictionary-thunks";

interface DictionaryState {
    word: Word | null,
    favouriteWords: string[],
    recentWords: string[]
    status: Status,
    error: ErrorT | null
}

const initialState: DictionaryState = {
    word: null,
    favouriteWords: [], 
    recentWords: [],
    status: "idle",
    error: null
}

const dictionarySlice = createSlice({
    name: '@@dictionary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadWord.pending, (state) => {
                state.status = "loading"
                state.error = null
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
            .addCase(addFavouriteWord.pending, (state) => {
                state.error = null
            })
            .addCase(addFavouriteWord.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.error = null
            })
            .addCase(addFavouriteWord.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload!
            })
            .addCase(getFavouriteWords.pending, (state) => {
                state.error = null
            })
            .addCase(getFavouriteWords.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.error = null
                state.favouriteWords = action.payload
            })
            .addCase(getFavouriteWords.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload!
            })
            .addCase(addRecentWord.pending, (state) => {
                state.error = null
            })
            .addCase(addRecentWord.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.error = null
                state.recentWords.push(action.payload)
            })
            .addCase(addRecentWord.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload!
            })
            .addCase(getRecentWords.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(getRecentWords.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.error = null
                state.recentWords = action.payload
            })
            .addCase(getRecentWords.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload!
            })
            .addCase(deleteRecentWord.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteRecentWord.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.error = null
                state.recentWords = action.payload
            })
    }
})

export default dictionarySlice.reducer
