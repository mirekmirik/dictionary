import { Typography } from '@mui/material'

interface PartOfSpeechProps {
    value: string
}

const PartOfSpeech: React.FC<PartOfSpeechProps> = ({ value }) => {
    return (
        <Typography fontWeight={600} fontStyle={'italic'}>{value}</Typography>
    )
}

export default PartOfSpeech