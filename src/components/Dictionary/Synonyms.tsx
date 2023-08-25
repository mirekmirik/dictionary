import { Typography, Box } from '@mui/material'
import { useDictionary } from '../../hooks/use-dictionary'


interface SynonymsProps {
    value: string[]
}

const Synonyms = ({ value }: SynonymsProps) => {

    const { acceptWord } = useDictionary()

    return (
        <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap' }}>
            <Typography sx={{ opacity: 0.7 }}>Synonyms</Typography>
            {value.map((data, idx) => {
                return (
                    <Box onClick={() => acceptWord(data)}>
                        <Typography key={idx} color={'secondary'} fontWeight={600}>{data}</Typography>
                    </Box>
                )
            })}
        </Box >
    )
}

export default Synonyms