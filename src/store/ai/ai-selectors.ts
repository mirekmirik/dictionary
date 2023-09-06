import { RootState } from "../store";

export const selectAISuggestWords = (state: RootState) => state.ai.suggestWords
export const selectAIConfirmWords = (state: RootState) => state.ai.confirmWords
export const selectAIError = (state: RootState) => state.ai.error
export const selectAIStatus = (state: RootState) => state.ai.status
export const selectAIText = (state: RootState) => state.ai.text
export const selectAITypeOfText = (state: RootState) => state.ai.typeOfWhichText
export const selectAiTypeOfWords = (state: RootState) => state.ai.typeOfWhichWords
export const selectAiEnglishLvl = (state: RootState) => state.ai.englishLvl
