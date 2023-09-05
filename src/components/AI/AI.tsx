import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Container, FormControl, FormControlLabel, Switch, RadioGroup, Typography, Chip, Button, Box, FormLabel, Radio } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useAI } from '../../hooks/use-ai';
import { useDictionary } from '../../hooks/use-dictionary';
import AIText from './AIText';
import Spinner from '../../UI/Spinner';
import ErrorMessage from '../../UI/ErrorMessage';
import { TypeOfText, TypeOfWords } from '../../types';


export default function AI() {

    const { favouriteWords, recentWords } = useDictionary()
    const { suggestWords, error, status, text, typeOfText, typeOfWords, setTypeText, setTypeWords, onAddSuggestWords, onConfirmWords, onGenerateText, onDeleteText } = useAI()

    const [words, setWords] = useState(suggestWords)
    const [showControllers, setShowControllers] = useState(!!text)

    const [switchOption, setSwitchOption] = useState<TypeOfWords | ''>(typeOfWords);
    const [switchRadio, setSwitchRadio] = useState<TypeOfText>(typeOfText)

    const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        switchOption === event.target.value ? setSwitchOption('') : setSwitchOption((event.target as HTMLInputElement).value as TypeOfWords)
        setTypeWords(event.target.value as TypeOfWords)
    }

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSwitchRadio((event.target as HTMLInputElement).value as TypeOfText)
        setTypeText(event.target.value as TypeOfText)
    }
    const deleteOption = (words: string[], word: string) => {
        const newWords = words.filter((w) => w !== word)
        setWords(newWords)
        onConfirmWords(newWords)
    }


    useEffect(() => {
        if (!switchOption) {
            onAddSuggestWords([])
            setWords([])
            onConfirmWords([])
        }
        if (switchOption === 'all') {
            const joinedWords = [...favouriteWords, ...recentWords]
            onAddSuggestWords(joinedWords)
            setWords(joinedWords)
            onConfirmWords(joinedWords)
        }
        if (switchOption === 'favourite') {
            onAddSuggestWords(favouriteWords)
            setWords(favouriteWords)
            onConfirmWords(favouriteWords)
        }
        if (switchOption === 'recently') {
            onAddSuggestWords(recentWords)
            setWords(recentWords)
            onConfirmWords(recentWords)
        }
    }, [switchOption])


    useEffect(() => {
        text ? setShowControllers(false) : setShowControllers(true)
    }, [text])



    return (
        <Container>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {status === 'loading' && <Spinner />}
            {text && (
                <Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }} onClick={onDeleteText} >
                        <CloseIcon color='secondary' />
                    </Box>
                    <AIText confirmWords={words} text={text} />
                    <Button fullWidth variant='contained' color='secondary' sx={{ mb: 2 }} onClick={() => setShowControllers((prevState) => !prevState)}>{showControllers ? 'Hide controllers' : 'Show controllers'}</Button>
                </Box>
            )}
            {showControllers && (
                <>
                    <FormControl component="fieldset" variant="standard" fullWidth sx={{ display: "flex", flexDirection: "column", rowGap: '15px', mb: '20px' }}>
                        <Typography color='secondary' textAlign={'center'} width={'100%'}>Pick words for generate AI text</Typography>
                        <RadioGroup>
                            <FormControlLabel
                                control={
                                    <Switch checked={switchOption === 'favourite'} value={'favourite'} color='secondary' onChange={handleChangeOption} name="favourite" />
                                }
                                label="Favourite"
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={switchOption === 'recently'} value={'recently'} color='secondary' onChange={handleChangeOption} name="recently" />
                                }
                                label="Recently"
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={switchOption === 'all'} value={'all'} color='secondary' onChange={handleChangeOption} name="all" />
                                }
                                label="All"
                            />
                        </RadioGroup>

                        <FormLabel id="demo-controlled-radio-buttons-group" color='secondary'>Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={switchRadio}
                            onChange={handleChangeRadio}
                        >
                            <FormControlLabel color='secondary' value="dialogue" control={<Radio color='secondary' />} label="Dialogue" />
                            <FormControlLabel color='secondary' value="text" control={<Radio color='secondary' />} label="Text" />
                            <FormControlLabel color='secondary' value="story" control={<Radio color='secondary' />} label="Story" />
                        </RadioGroup>

                    </FormControl>

                    <Autocomplete
                        sx={{ mb: 2 }}
                        multiple
                        id="multiple-limit-tags"
                        options={suggestWords}
                        disableCloseOnSelect={true}
                        value={words}
                        onChange={(_, newValue) => {
                            onConfirmWords(newValue);
                            setWords(newValue);
                        }}
                        loading={status === 'loading'}
                        clearOnEscape={true}
                        renderTags={(value) => (
                            value.map((option, idx, arr) => (
                                <Chip sx={{ mb: 1, mr: 1 }} key={idx} color='secondary' label={option} onDelete={() => deleteOption(arr, option)} />
                            ))
                        )}
                        renderInput={(params) => (
                            <TextField {...params} color='secondary' label="Words" placeholder="Pick" />
                        )}
                    />
                </>
            )}
            <Button fullWidth variant='contained' disabled={!!!words.length} color='secondary' onClick={() => onGenerateText({ words, type: switchRadio })}>
                generate
            </Button>
        </Container>
    );
}
