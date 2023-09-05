import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import IconButton from '@mui/material/IconButton/IconButton'
import { Word } from '../../types';


interface FavouriteProps {
    onToggleWord: (word: Word['word']) => void;
    word: Word['word'],
    favouriteWords: string[]
}

const Favourite: React.FC<FavouriteProps> = ({ onToggleWord, word, favouriteWords }) => {

    const isFavourite = favouriteWords.find((w) => w === word)

   
    const onClick = () => {
        onToggleWord(word)
    }


    return (
        <IconButton onClick={onClick}>
            {isFavourite ? <FavoriteSharpIcon color='secondary' /> : <FavoriteBorderIcon
                color="secondary" />}
        </IconButton>
    )
}

export default Favourite