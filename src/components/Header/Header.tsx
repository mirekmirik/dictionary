import { useFonts } from '../../hooks/use-fonts';
import { useTheme } from '../../hooks/use-theme';
import Theme from './Theme';
import { Fonts } from './Fonts'
import { Font } from '../../types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';


export interface FontWithLabel extends Font {
    label: Font['family'];
};


const Header = () => {
    const [fonts, currentFont, setCurrentFont] = useFonts()
    const { theme, toggleTheme } = useTheme()



    const optionFonts: FontWithLabel[] = fonts.map((data) => ({ label: data.family, family: data.family }))
    const optionCurrFont: FontWithLabel | null = currentFont ? { ...currentFont, label: currentFont.family } : null



    return (
        <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                    <AutoStoriesOutlinedIcon sx={{ height: 40, width: 40, opacity: 0.7 }} />
                </Grid>
                <Grid container direction={'row'} justifyContent='flex-end' alignItems={'center'} columnGap={1} width={'auto'}>
                    <Grid item>
                        <Fonts fonts={optionFonts} optionCurrentFont={optionCurrFont} onSetCurrentFont={setCurrentFont} />
                    </Grid>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Grid item>
                        <Theme theme={theme} onToggleTheme={toggleTheme} />
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Header