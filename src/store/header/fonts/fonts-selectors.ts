import { RootState } from "../../store";

export const selectFont = (state: RootState) => state.fonts.currentFont
export const selectFonts = (state: RootState) => state.fonts.fonts
