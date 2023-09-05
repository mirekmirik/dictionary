import { RootState } from "../store";

export const selectDictionaryWord = (state: RootState) => state.dictionary.word
export const selectDictionaryError = (state: RootState) => state.dictionary.error
export const selectDictionaryStatus = (state: RootState) => state.dictionary.status
export const selectDictionaryFavouriteWords = (state: RootState) => state.dictionary.favouriteWords
export const selectDictionaryRecentWords = (state:RootState) => state.dictionary.recentWords