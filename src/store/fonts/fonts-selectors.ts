import { RootState } from "../store";

export const selectFont = (state: RootState) => state.fonts.currentFont
export const selectFonts = (state: RootState) => state.fonts.fonts
export const selectFontError = (state: RootState) => state.fonts.error

