import React from 'react'
import { Modal, Button, Typography, Box, TextField, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { SignProps } from './Auth'
import useAuth from '../../../hooks/use-auth'
import { loginUser } from '../../../store/auth/auth-thunks'
import Spinner from '../../../UI/Spinner'
import ErrorMessage from '../../../UI/ErrorMessage'


const SignIn: React.FC<SignProps> = ({ onHandleClose, style }) => {


    const { login, password, submitHandler, error, status, ResetError } = useAuth(loginUser)

    ResetError()

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={onHandleClose}
            closeAfterTransition
        >
            <Box
                sx={style}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {status === 'loading' && <Spinner />}
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        color='secondary'
                        inputRef={login}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        inputRef={password}
                        name="password"
                        label="Password"
                        color='secondary'
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Grid container>
                        <Grid>
                            <Link to="/auth/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='secondary'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SIGN IN
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default SignIn