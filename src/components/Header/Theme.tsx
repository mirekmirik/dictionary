import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Box from '@mui/material/Box';
import { ThemeState } from '../../store/theme/theme-slice';
import { Typography } from '@mui/material';


interface ThemeProps {
    theme: ThemeState,
    onToggleTheme: () => void
}

const Theme: React.FC<ThemeProps> = ({ theme, onToggleTheme }) => {
    const refacTheme = theme.slice(0, 1).toUpperCase() + theme.slice(1)

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: "center" }}>
            <Typography>
                {refacTheme} theme
            </Typography>
            <IconButton onClick={onToggleTheme}>
                {theme === 'dark' ?  <Brightness4Icon color='secondary' /> : <WbSunnyIcon color='secondary' />}
            </IconButton>
        </Box>
    )
}

export default Theme
