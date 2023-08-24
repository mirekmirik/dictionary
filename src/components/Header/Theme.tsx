import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Box from '@mui/material/Box';
import { ThemeState } from '../../store/header/theme/theme-slice';
import { Typography } from '@mui/material';


interface ThemeProps {
    theme: ThemeState,
    onToggleTheme: () => void
}

const Theme = ({ theme, onToggleTheme }: ThemeProps) => {
    const refacTheme = theme.slice(0, 1).toUpperCase() + theme.slice(1)

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center',  alignItems: "center" }}>
            <Typography>
                {refacTheme} theme
            </Typography>
            <IconButton onClick={onToggleTheme}>
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    )
}

export default Theme
