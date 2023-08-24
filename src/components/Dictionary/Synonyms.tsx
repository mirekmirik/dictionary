import { Typography, Box } from '@mui/material'


interface SynonymsProps {
    value: string[]
}

const Synonyms = ({ value }: SynonymsProps) => {


    return (
        <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap' }}>
            <Typography sx={{ opacity: 0.7 }}>Synonyms</Typography>
            {value.map((data, idx) => {
                return (
                    <Typography key={idx} color={'secondary'} fontWeight={600}>{data}</Typography>
                )
            })}
        </Box>
    )
}

export default Synonyms