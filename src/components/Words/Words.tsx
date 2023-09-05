import { Container, Grid, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react'
import WordsList from './WordsList'
import Favourite from '../Dictionary/Favourite'
import { Word } from '../../types'


interface WordsProps {
    words: string[],
    toggleFavouriteWord: (word: Word['word']) => void,
    acceptWord: (word: Word['word']) => void,
    favouriteWords: string[],
    isDelete?: boolean,
    onRemoveWord?: (word: Word['word']) => void 
}

const Words: React.FC<WordsProps> = ({ words, toggleFavouriteWord, acceptWord, favouriteWords, isDelete, onRemoveWord }) => {

    return (
        <Container>
            {words.map((word, idx) => (
                <Grid key={idx} container justifyContent={'space-between'} alignItems={'center'} boxShadow={2} padding={1} mb={2}>
                    <Grid>
                        <WordsList word={word} onAcceptWord={acceptWord} />
                    </Grid>
                    <Grid>
                        {isDelete && onRemoveWord ? (<IconButton type="button" onClick={() => onRemoveWord(word)} sx={{ p: '10px' }} aria-label="clear">
                            <ClearIcon />
                        </IconButton>) : null}
                        <Favourite word={word} favouriteWords={favouriteWords} onToggleWord={toggleFavouriteWord} />
                    </Grid>
                </Grid>
            ))}
        </Container>
    )
}

export default Words