import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type ErrorMessageProps = {
    children: ReactNode
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
    return (
        <Typography color="red" textAlign={'center'}>{children}</Typography>
    )
}

export default ErrorMessage