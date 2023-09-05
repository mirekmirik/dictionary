import { useDictionary } from '../../hooks/use-dictionary'
import { Box, Container, Grid, Divider, Typography } from '@mui/material'
import Word from './Word'
import Play from './Play'
import Transcription from './Transcription'
import Meaning from './Meaning'
import Synonyms from './Synonyms'
import Source from './Source'
import Antonymys from './Antonymys'
import Spinner from '../../UI/Spinner'
import Favourite from './Favourite'


const Dictionary = () => {

    const { word, error, status, toggleFavouriteWord, favouriteWords } = useDictionary()




    return (
        status !== 'loading' && status !== 'rejected' && word ? (
            <Container>
                <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Grid>
                        <Word value={word.word} />
                    </Grid>
                    <Grid>
                        <Play word={word} />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                    <Favourite onToggleWord={toggleFavouriteWord} word={word.word} favouriteWords={favouriteWords} />
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Transcription value={word.phonetic} />
                </Box>
                {word.meanings.map((data, idx) => {
                        return (
                            <Box key={idx} sx={{ margin: 0 }}>
                                {data.definitions.length > 0 && (
                                    <Meaning value={data.definitions} />
                                )}
                                {data.synonyms.length > 0 && (
                                    <Synonyms value={data.synonyms} />
                                )}
                                {data.antonyms.length > 0 && (
                                    <Antonymys value={data.antonyms} />
                                )}
                            </Box>
                        )
                    })}
                <Divider sx={{ mb: 3 }} />
                <Box>
                    <Source value={word.sourceUrls} />
                </Box>

            </Container>)
            :
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                {status === 'loading' ? <Spinner /> : <Typography color={'error'}>{error}</Typography>}
            </Box>

    )
}

export default Dictionary