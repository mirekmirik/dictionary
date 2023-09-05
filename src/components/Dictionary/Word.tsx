import { Typography } from '@mui/material';


interface WordProps {
    value: string
}

const Word:React.FC<WordProps> = ({ value }) => {
    return (
        <Typography variant='h3' fontWeight={600}>{value}</Typography>
    )
}

export default Word