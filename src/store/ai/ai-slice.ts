import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAIText } from "./ai-thunks";
import { ErrorT, Status, TypeOfText, TypeOfWords } from "../../types";
import { deleteUniques } from "../../config";

interface AIState {
    suggestWords: string[],
    confirmWords: string[],
    typeOfWhichWords: TypeOfWords,
    typeOfWhichText: TypeOfText,
    status: Status,
    error: ErrorT | null
    text: string | null
}

const initialState: AIState = {
    suggestWords: [],
    confirmWords: [],
    typeOfWhichWords: 'recently',
    typeOfWhichText: 'dialogue',
    status: 'idle',
    error: null,
    text: null
}

const AISlice = createSlice({
    name: '@@ai',
    initialState,
    reducers: {
        addSuggestWords: (state, action: PayloadAction<string[]>) => {
            state.suggestWords = deleteUniques(action.payload)
        },
        addConfirmWords: (state, action: PayloadAction<string[]>) => {
            state.confirmWords = action.payload
        },
        setTypeOfWhichWords: (state, action: PayloadAction<TypeOfWords>) => {
            state.typeOfWhichWords = action.payload
        },
        setTypeOfWhichText: (state, action: PayloadAction<TypeOfText>) => {
            state.typeOfWhichText = action.payload
        },
        deleteText: (state) => {
            state.text = null;
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAIText.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(getAIText.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.error = null
            if (action.payload) {
                state.text = action.payload
            }
        })
        builder.addCase(getAIText.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload!
        })
    }
})

export const { addSuggestWords, addConfirmWords, deleteText, setTypeOfWhichWords, setTypeOfWhichText } = AISlice.actions

export default AISlice.reducer
