import React from 'react'
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';


interface PlayProps {
    onPlay: () => void
}

const Play = ({ onPlay }: PlayProps) => {

    return (
        <>
            <IconButton aria-label="play/pause" onClick={onPlay}>
                <PlayCircleFilledWhiteOutlinedIcon color='secondary' sx={{ height: 52, width: 52 }} />
            </IconButton>

        </>
    )
}

export default Play