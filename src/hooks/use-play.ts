import { useEffect, useState } from 'react'


type PlayHookResult = [boolean, () => void]


const usePlay = (link: string | undefined): PlayHookResult => {

    const [audioInstance, setAudioInstance] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (link) {
            const audio = new Audio(link);
            audio.addEventListener('ended', () => {
                setIsPlaying(false);
            });
            setAudioInstance(audio)
        }
    }, [link]);


    const toggleAudio = () => {
        if (audioInstance) {
            if (isPlaying) {
                audioInstance.pause();
            } else {
                audioInstance.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    return [isPlaying, toggleAudio]

}

export default usePlay