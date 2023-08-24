import { RootState } from "../store";

export const selectWord = (state: RootState) => state.dictionary.word
export const selectError = (state: RootState) => state.dictionary.error
export const selectStatus = (state: RootState) => state.dictionary.status
