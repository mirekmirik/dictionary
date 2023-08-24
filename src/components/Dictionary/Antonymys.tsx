import { Typography, Box } from '@mui/material'


interface AntonymysProps {
  value: string[]
}

const Antonymys = ({ value }: AntonymysProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap' }}>
      <Typography sx={{ opacity: 0.7 }}>Antonymys</Typography>
      {value.map((data, idx) => {
        return (
          <Typography key={idx} color={'secondary'} fontWeight={600}>{data}</Typography>
        )
      })}
    </Box>
  )
}

export default Antonymys