import { Box, CircularProgress } from '@mui/material'

const Spinner = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
        </Box>
    )
}

export default Spinner