import { Typography, Box, Link } from '@mui/material'

interface SourceProps {
    value: string[]
}

const Source = ({ value }: SourceProps) => {
    return (
        <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap' }}>
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