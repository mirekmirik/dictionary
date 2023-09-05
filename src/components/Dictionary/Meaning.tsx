import { List, ListItem, ListItemText, Typography } from '@mui/material'
import LensIcon from '@mui/icons-material/Lens';
import { Definition } from '../../types';

import { Box } from '@mui/material'
interface MeaningProps {
    value: Definition[]
}

const Meaning: React.FC<MeaningProps> = ({ value }) => {
    return (
        <Box mb={3}>
            <Typography sx={{ opacity: 0.7 }}>Meaning</Typography>
            <List>
                {value.map((data, idx) => {
                    return (
                        <Box key={idx}>
                            <ListItem sx={{ display: 'flex', columnGap: 2, }} >
                                <LensIcon color='secondary' sx={{ height: 10, width: 10 }} />
                                <ListItemText sx={{ 'listStyleType': "disc" }} primary={data.definition}></ListItemText>
                            </ListItem>
                            {data.example && (
                                <>
                                    <ListItem sx={{ display: 'flex', columnGap: 2, }} >
                                        <Typography sx={{ opacity: 0.7 }}>Example</Typography>
                                        {/* <LensIcon color='secondary' sx={{ height: 10, width: 10 }} /> */}
                                        <ListItemText sx={{ 'listStyleType': "disc" }} primary={data.example}></ListItemText>
                                    </ListItem>
                                </>)
                            }
                        </Box>
                    )
                })}
            </List >
        </Box>
    )
}
export default Meaning