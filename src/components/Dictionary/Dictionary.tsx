import { useDictionary } from '../../hooks/use-dictionary'
import { Box, Container, Grid, Divider } from '@mui/material'
import Word from './Word'
import Play from './Play'
import Transcription from './Transcription'
import PartOfSpeech from './PartOfSpeech'
import Meaning from './Meaning'
import Synonyms from './Synonyms'
import Source from './Source'
import Antonymys from './Antonymys'


const Dictionary = () => {

    const { word } = useDictionary()


    return (
        word && (
            <Container>
                <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Grid>
                        <Word value={word.word} />
                    </Grid>
                    <Grid>
                        <Play word={word} />
                    </Grid>
                </Grid>
                <Box sx={{ mb: 4 }}>
                    <Transcription value={word.phonetic} />
                </Box>
                {word.meanings.map((data, idx) => {
                    return (
                        <>
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 3, overflow: 'hidden' }} columnGap={3}>
                                <PartOfSpeech value={data.partOfSpeech} />
                                <Divider textAlign='left' sx={{ width: '100%', height: '1px' }} />
                            </Box>
                            {data.definitions.length > 0 && (
                                <Box sx={{ mb: 3 }} >
                                    <Meaning value={data.definitions} />
                                </Box>
                            )}
                            {data.synonyms.length > 0 && (
                                <Box sx={{ mb: 3 }} >
                                    <Synonyms value={data.synonyms} />
                                </Box>
                            )}
                            {data.antonyms.length > 0 && (
                                <Box sx={{ mb: 3 }} >
                                    <Antonymys value={data.antonyms} />
                                </Box>
                            )}
                        </>

                    )
                })}
                <Divider sx={{ mb: 3 }} />
                <Box>
                    <Source value={word.sourceUrls} />
                </Box>
            </Container>)
    )
}

export default Dictionary