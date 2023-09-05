import React, { useEffect } from 'react'
import Words from '../Words/Words'
import { useDictionary } from '../../hooks/use-dictionary'
import { Typography, Box } from '@mui/material'
import ErrorMessage from '../../UI/ErrorMessage'

const Recents = () => {
    const { recentWords, toggleFavouriteWord, acceptWord, favouriteWords, getRecentlyWords, removeRecentlyWord, error } = useDictionary()

    useEffect(() => {
        getRecentlyWords()
    }, [])

    return (
        <Box>
            <Typography textAlign={'center'} color={'secondary'} mb={1}>Recently words</Typography>
            {!recentWords.length ?
                (
                    <Typography textAlign={'center'} color={'secondary'} mb={1}>Recents words haven't been added yet...</Typography>
                )
                : error ?
                    <ErrorMessage>{error}</ErrorMessage>
                    : <Words words={recentWords} toggleFavouriteWord={toggleFavouriteWord} acceptWord={acceptWord} favouriteWords={favouriteWords} isDelete={true} onRemoveWord={removeRecentlyWord} />}

        </Box>
    )
}

export default Recents