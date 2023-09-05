import { useAppDispatch, useAppSelector } from '../store/store'
import { selectTheme } from '../store/theme/theme-selectors'
import { ThemeState, setTheme } from '../store/theme/theme-slice'
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material'

interface ThemeHookResult {
    theme: ThemeState,
    toggleTheme: () => void,
    Creator: Theme
}

export const useTheme = (): ThemeHookResult => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectTheme)

    const Creator = createTheme({
        palette: {
            mode: theme,
        },
    });

    const toggleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
    }

    return { theme, toggleTheme, Creator }
}