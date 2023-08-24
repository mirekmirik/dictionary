import { Typography } from '@mui/material';


interface WordProps {
    value: string
}

const Word = ({ value }: WordProps) => {
    return (
        <Typography variant='h3' fontWeight={600}>{value}</Typography>
    )
}

export default Word