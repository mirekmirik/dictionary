import { Container } from '@mui/material'
import { ReactNode } from 'react';


interface ContainerProps {
    children: ReactNode
}

const Wrapper = ({ children }: ContainerProps) => {
    return (
        <Container maxWidth="sm">
            {children}
        </Container>

    )
}

export default Wrapper