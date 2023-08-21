import React from 'react'
import { Fonts } from './Fonts'
import { Theme } from './Theme'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction={'row'} justifyContent='flex-end' spacing={3}>
                <Grid item xs={2}>
                    <Fonts />
                </Grid>
                <Grid item xs={2}>
                    <Theme />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header