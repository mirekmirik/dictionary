import { Typography } from '@mui/material'

interface TranscriptionProps {
    value: string
}

const Transcription = ({ value }: TranscriptionProps) => {
    return (
        <Typography color={'secondary'} fontSize={24}>{value}</Typography>
    )
}

export default Transcription