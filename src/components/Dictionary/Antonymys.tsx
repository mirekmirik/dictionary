import { Typography, Box } from '@mui/material'
import { useDictionary } from '../../hooks/use-dictionary'


interface AntonymysProps {
  value: string[]
}

const Antonymys:React.FC<AntonymysProps> = ({ value }) => {

  const { acceptWord } = useDictionary()


  return (
    <Box sx={{ display: 'flex', columnGap: 3, flexWrap: 'wrap' }} mb={3}>
      <Typography sx={{ opacity: 0.7 }}>Antonymys</Typography>
      {value.map((data, idx) => {
        return (
          <Box onClick={() => acceptWord(data)}>
            <Typography key={idx} color={'secondary'} fontWeight={600}>{data}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default Antonymys