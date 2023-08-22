import Box from '@mui/material/Box';
import { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Fonts } from './Fonts'
import { useFonts } from '../../hooks/use-fonts';
import { useTheme } from '../../hooks/use-theme';
import { Font } from '../../types';
import Theme from './Theme';

export interface FontWithLabel extends Font {
    label: string;
};

const Header = () => {
    const [fonts, currentFont, setCurrentFont] = useFonts()
    const [theme, toggleTheme] = useTheme()



    const optionFonts: FontWithLabel[] = fonts.map((data) => ({ label: data.family, family: data.family }))
    const optionCurrFont: FontWithLabel = { ...currentFont, label: currentFont.family }



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction={'row'} justifyContent='flex-end' spacing={3}>
                <Grid item xs={2}>
                    <Fonts fonts={optionFonts} optionCurrentFont={optionCurrFont} onSetCurrentFont={setCurrentFont} />
                </Grid>
                <Grid item xs={2}>
                    <Theme theme={theme} onToggleTheme={toggleTheme} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header