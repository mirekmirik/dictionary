import React from 'react'
import { Modal, Button,  Typography, Box, TextField, Grid } from '@mui/material'
import { SignProps } from './Auth'
import useAuth from '../../../hooks/use-auth'
import { registerUser } from '../../../store/auth/auth-thunks'
import { Link } from 'react-router-dom'
import Spinner from '../../../UI/Spinner'
import ErrorMessage from '../../../UI/ErrorMessage'


const SignUp: React.FC<SignProps> = ({ onHandleClose, style }) => {

    const { login, password, submitHandler, error, status, ResetError } = useAuth(registerUser)

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
                    Sign Up
                </Typography>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={submitHandler}>
                    {status === 'loading' && <Spinner />}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        color='secondary'
                        autoComplete="email"
                        inputRef={login}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        color='secondary'
                        label="Password"
                        type="password"
                        id="password"
                        inputRef={password}
                        autoComplete="current-password"
                    />
                    <Grid container>
                        <Grid item>
                            <Link to="/auth/login">
                                {"Have you already registered? Sign in"}
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
                        SIGN UP
                    </Button>
                </Box>
            </Box>
        </Modal>

    )
}

export default SignUp