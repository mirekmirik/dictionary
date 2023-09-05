import { Container } from '@mui/material'
import { ReactNode } from 'react';


interface ContainerProps {
    children: ReactNode
}

const Wrapper:React.FC<ContainerProps> = ({ children }) => {
    return (
        <Container maxWidth={'md'} sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '75px' }}>
            {children}
        </Container >
    )
}

export default Wrapper