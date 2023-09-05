import { useFonts } from '../../hooks/use-fonts';
import { useTheme } from '../../hooks/use-theme';
import Theme from './Theme';
import { Fonts } from './Fonts'
import { Font } from '../../types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Divider } from '@mui/material'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/use-auth';
import { ROUTES } from '../../utils/routes';
import { useEffect } from 'react';


export interface FontWithLabel extends Font {
    label: Font['family'];
};


const Header = () => {
    const [fonts, currentFont, setCurrentFont, error, onLoadFonts] = useFonts()
    const { user, logOut } = useAuth()
    const { theme, toggleTheme } = useTheme()


    useEffect(() => {
        onLoadFonts()
    }, [user])

    const optionFonts: FontWithLabel[] = fonts.map((data) => ({ label: data.family, family: data.family }))
    const optionCurrFont: FontWithLabel | null = currentFont ? { ...currentFont, label: currentFont.family } : null



    return (
        <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
            <Grid item container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item container justifyContent={'space-between'} columnGap={1} width={'auto'} xs={12} md={12} mb={'10px'} marginBottom={'10px'}>
                    <Grid item xs={9} md={9}>
                        <AutoStoriesOutlinedIcon sx={{ height: 40, width: 40, opacity: 0.7 }} />
                    </Grid>
                    <Grid item display={'flex'} alignItems={'center'} justifyContent={'flex-end'} xs={2} md={2}>
                        {user ?
                            <Link to={ROUTES.HOME} onClick={logOut}>
                                <Button variant="contained" color='secondary'>logout</Button>
                            </Link>
                            :
                            <Link to={ROUTES.LOGIN}>
                                <Button variant="contained" color='secondary'>login</Button>
                            </Link>
                        }
                    </Grid>
                </Grid>
                <Grid item container direction={'row'} alignItems={'center'} justifyContent={'space-between'} margin={'0 auto'} columnGap={1} xs={12}>
                    <Grid item xs={5}>
                        <Fonts fonts={optionFonts} optionCurrentFont={optionCurrFont} onSetCurrentFont={setCurrentFont} error={error} />
                    </Grid>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Grid item xs={3}>
                        <Theme theme={theme} onToggleTheme={toggleTheme} />
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Header