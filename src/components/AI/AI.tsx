import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Container, FormControl, FormControlLabel, Switch, RadioGroup, Typography, Chip, Button, Box, FormLabel, Radio, InputLabel, Select, MenuItem, FormGroup, Checkbox } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useAI } from '../../hooks/use-ai';
import { useDictionary } from '../../hooks/use-dictionary';
import AIText from './AIText';
import Spinner from '../../UI/Spinner';
import ErrorMessage from '../../UI/ErrorMessage';
import { EnglishLvl, IsRussian, TypeOfText, TypeOfWords } from '../../types';
import { deleteUniques, scrollToTop } from '../../config';


export default function AI() {

    const { favouriteWords, recentWords } = useDictionary()
    const allWords = [...favouriteWords, ...recentWords]
    const { suggestWords, error, status, text, typeOfText, confirmWords, englishLvl, typeOfWords, isRussian, setTypeText, setTypeWords, onSetRussian, onAddSuggestWords, onConfirmWords, onGenerateText, onDeleteText, onSelectEnglishLvl } = useAI()

    const [showControllers, setShowControllers] = useState(!!text)


    const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeOfWords === event.target.value) {
            setTypeWords('')
            return;
        }
        setTypeWords(event.target.value as TypeOfWords)
    }

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeText(event.target.value as TypeOfText)
    }
    const deleteOption = (words: string[], word: string) => {
        const newWords = words.filter((w) => w !== word)
        onAddSuggestWords(newWords)
        onConfirmWords(newWords)
    }


    useEffect(() => {
        if (typeOfWords === '') {
            if (text) return;
            onAddSuggestWords([])
            onConfirmWords([])
        }
        if (typeOfWords === 'all') {
            const joinedWords = deleteUniques([...favouriteWords, ...recentWords])
            onAddSuggestWords(joinedWords)
            onConfirmWords(joinedWords)
        }
        if (typeOfWords === 'favourite') {
            onAddSuggestWords(favouriteWords)
            onConfirmWords(favouriteWords)
        }
        if (typeOfWords === 'recently') {
            onAddSuggestWords(recentWords)
            onConfirmWords(recentWords)
        }
    }, [typeOfWords])



    useEffect(() => {
        text ? setShowControllers(false) : setShowControllers(true)
    }, [text])



    return (
        <Container>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {status === 'loading' && <Box sx={{ mb: 2 }}><Spinner /></Box>}
            {text && (
                <Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }} onClick={onDeleteText} >
                        <CloseIcon color='secondary' />
                    </Box>
                    <AIText confirmWords={confirmWords} text={text} />
                    <Button fullWidth variant='contained' color='secondary' sx={{ mb: 2 }} onClick={() => setShowControllers((prevState) => !prevState)}>{showControllers ? 'Hide controllers' : 'Show controllers'}</Button>
                </Box>
            )}
            {showControllers && (
                <>
                    <FormControl component="fieldset" variant="standard" fullWidth sx={{ display: "flex", flexDirection: "column", rowGap: 1, mb: 2 }}>
                        <Typography textAlign={'center'} width={'100%'}>Pick words for generate AI text</Typography>
                        <RadioGroup>
                            <FormControlLabel
                                control={
                                    <Switch checked={typeOfWords === 'favourite'} value={'favourite'} color='secondary' onChange={handleChangeOption} name="favourite" />
                                }
                                label="Favourite"
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={typeOfWords === 'recently'} value={'recently'} color='secondary' onChange={handleChangeOption} name="recently" />
                                }
                                label="Recently"
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={typeOfWords === 'all'} value={'all'} color='secondary' onChange={handleChangeOption} name="all" />
                                }
                                label="All"
                            />
                        </RadioGroup>

                        <FormLabel id="demo-controlled-radio-buttons-group" color='secondary'>Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={typeOfText}
                            onChange={handleChangeRadio}
                        >
                            <FormControlLabel color='secondary' value="dialogue" control={<Radio color='secondary' />} label="Dialogue" />
                            <FormControlLabel color='secondary' value="text" control={<Radio color='secondary' />} label="Text" />
                            <FormControlLabel color='secondary' value="story" control={<Radio color='secondary' />} label="Story" />
                        </RadioGroup>

                        <RadioGroup>
                            <FormControlLabel
                                control={
                                    <Switch checked={isRussian} value={isRussian ?? ""} color='secondary' onChange={(event) => onSetRussian(!isRussian)} name="isRussian" />
                                }
                                label="Russian"
                            />
                        </RadioGroup>
                    </FormControl>


                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="demo-simple-select-label">English Level</InputLabel>
                        <Select
                            color='secondary'
                            labelId="englishLvl"
                            id="englishLvl"
                            value={englishLvl}
                            label="English level"
                            defaultValue={englishLvl}
                            onChange={(event) => onSelectEnglishLvl(event.target.value as EnglishLvl)}
                        >
                            <MenuItem value={'A1'}>A1</MenuItem>
                            <MenuItem value={'A2'}>A2</MenuItem>
                            <MenuItem value={'B1'}>B1</MenuItem>
                            <MenuItem value={'B2'}>B2</MenuItem>
                            <MenuItem value={'C1'}>C1</MenuItem>
                            <MenuItem value={'C2'}>C2</MenuItem>
                        </Select>
                    </FormControl>

                    <Autocomplete
                        sx={{ mb: 2 }}
                        multiple
                        id="multiple-limit-tags"
                        options={typeOfWords === '' ? allWords : suggestWords}
                        disableCloseOnSelect={true}
                        value={suggestWords}
                        onChange={(_, newValue) => {
                            onConfirmWords(newValue);
                            onAddSuggestWords(newValue)
                        }}
                        loading={status === 'loading'}
                        clearOnEscape={true}
                        freeSolo
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
            <Button fullWidth variant='contained' disabled={!!!confirmWords.length} color='secondary' onClick={() => {
                scrollToTop()
                onGenerateText({ words: confirmWords, type: typeOfText, englishLvl: englishLvl, isRussian })
            }}>
                generate
            </Button>
        </Container>
    );
}
