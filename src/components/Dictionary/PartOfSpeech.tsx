import React from 'react'
import { Typography } from '@mui/material'

interface PartOfSpeechProps {
    value: string
}

const PartOfSpeech = ({ value }: PartOfSpeechProps) => {
    return (
        <Typography fontWeight={600} fontStyle={'italic'}>{value}</Typography>
    )
}

export default PartOfSpeech