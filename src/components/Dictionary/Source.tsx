import { Typography, Box, Link } from '@mui/material'

interface SourceProps {
    value: string[]
}

const Source:React.FC<SourceProps> = ({ value }) => {
    return (
        <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap', overflow: 'hidden' }}>
            <Typography sx={{ opacity: 0.7 }} fontSize={14}>Source</Typography>
            {value.map((data, idx) => {
                return (
                    <Link key={idx} sx={{ textDecoration: "underline", color: 'inherit' }} href={data}>{data}</Link>
                )
            })}
        </Box>

    )
}

export default Source