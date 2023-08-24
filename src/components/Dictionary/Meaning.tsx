import { List, ListItem, ListItemText, Typography } from '@mui/material'
import LensIcon from '@mui/icons-material/Lens';
import { Definition } from '../../types';


interface MeaningProps {
    value: Definition[]
}

const Meaning = ({ value }: MeaningProps) => {
    return (
        <>
            <Typography sx={{ opacity: 0.7 }}>Meaning</Typography>
            <List>
                {value.map((data, idx) => {
                    return (
                        <>
                            <ListItem key={idx} sx={{ display: 'flex', columnGap: 2,  }} >
                                <LensIcon color='secondary' sx={{ height: 10, width: 10 }} />
                                <ListItemText sx={{ 'listStyleType': "disc" }} primary={data.definition}></ListItemText>
                            </ListItem>
                        </>
                    )
                })}
            </List>
        </>
    )
}

export default Meaning