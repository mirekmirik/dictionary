import { Typography, Box } from '@mui/material'
import React from 'react'


interface AntonymysProps {
  value: string[]
}

const Antonymys = ({ value }: AntonymysProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap' }}>
      <Typography sx={{ opacity: 0.7 }}>Antonymys</Typography>
      {value.map((data) => {
        return (
          <Typography color={'secondary'} fontWeight={600}>{data}</Typography>
        )
      })}
    </Box>
  )
}

export default Antonymys