import { useEffect } from 'react'
import { useDictionary } from '../../hooks/use-dictionary'
import { Box, Typography } from '@mui/material'
import Words from '../Words/Words'
import ErrorMessage from '../../UI/ErrorMessage'

const Marked = () => {
  const { toggleFavouriteWord, acceptWord, favouriteWords, getFavouritesWords, error } = useDictionary()

  useEffect(() => {
    getFavouritesWords()
  })

  return (
    <Box>
      <Typography textAlign={'center'} color={'secondary'} mb={1}>Marked words</Typography>

      {error ? <ErrorMessage>{error}</ErrorMessage> : !favouriteWords.length ?
        (
          <Typography textAlign={'center'} color={'secondary'} mb={1}>Favourite words haven't been added yet...</Typography>
        )

        : <Words words={favouriteWords} toggleFavouriteWord={toggleFavouriteWord} acceptWord={acceptWord} favouriteWords={favouriteWords} />}
    </Box >
  )
}

export default Marked