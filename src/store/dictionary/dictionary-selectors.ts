import { RootState } from "../store";

export const selectWord = (state: RootState) => state.dictionary.word
