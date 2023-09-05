import { Typography } from '@mui/material'

interface TranscriptionProps {
    value: string
}

const Transcription:React.FC<TranscriptionProps> = ({ value }) => {
    return (
        <Typography color={'secondary'} fontSize={24}>{value}</Typography>
    )
}

export default Transcription