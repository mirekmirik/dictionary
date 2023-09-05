import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useCallback } from 'react';
import { Word } from '../../types';
import usePlay from '../../hooks/use-play';


interface PlayProps {
    word: Word
}

const Play:React.FC<PlayProps> = ({ word }) => {

    const getLink = useCallback(() => {
        const link = word.phonetics.length ? word.phonetics.filter((data) => data.audio) : null
        if (link && link.length) {
            const phoneticLink = link[0];
            return phoneticLink.audio
        }
    }, [word])

    const [isPlaying, toggleAudio] = usePlay(getLink());


    return (
        <>
            <IconButton aria-label="play/pause" onClick={toggleAudio}>
                {isPlaying ? <PauseCircleIcon color='secondary' sx={{ height: 52, width: 52 }} /> : <PlayCircleIcon color='secondary' sx={{ height: 52, width: 52 }} />}
            </IconButton>

        </>
    )
}

export default Play