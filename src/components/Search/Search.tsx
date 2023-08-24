import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDictionary } from '../../hooks/use-dictionary';
import ClearIcon from '@mui/icons-material/Clear';

const Search = () => {
    const { inputRef, handleWord } = useDictionary()


    const clearWord = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <Paper
            component="form"
            onSubmit={handleWord}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '95%', alignSelf: 'center', mb: 5 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, height: 50 }}
                autoFocus
                inputRef={inputRef}
                placeholder="Search word"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={clearWord}>
                <ClearIcon />
            </IconButton>
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleWord}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default Search