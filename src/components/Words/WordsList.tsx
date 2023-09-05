import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


interface WordListProps {
    word: string,
    onAcceptWord: (val: string) => void
}

const WordsList: React.FC<WordListProps> = ({ word, onAcceptWord }) => {
    const navigate = useNavigate()
    
    const onClick = () => {
        onAcceptWord(word)
        navigate('/')
    }

    return (
        <Box onClick={onClick}>
            {word}
        </Box>
    )
}

export default WordsList