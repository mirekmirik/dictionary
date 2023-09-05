import { RootState } from "../store";


export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthError = (state: RootState) => state.auth.error
export const selectAuthStatus = (state: RootState) => state.auth.status


