import { useAppDispatch, useAppSelector } from '../store/store'
import { selectAIConfirmWords, selectAIError, selectAIStatus, selectAISuggestWords, selectAIText, selectAITypeOfText, selectAiEnglishLvl, selectAiIsRussian, selectAiTypeOfWords } from '../store/ai/ai-selectors'
import { EnglishLvl, ErrorT, IsRussian, Status, TypeOfText, TypeOfWords } from '../types'
import { addConfirmWords, addSuggestWords, deleteText, setEnglishLvl, setRussian, setTypeOfWhichText, setTypeOfWhichWords } from '../store/ai/ai-slice'
import { deleteUniques } from '../config'
import { getAIText } from '../store/ai/ai-thunks'

interface useAIHookResult {
    suggestWords: string[],
    confirmWords: string[]
    error: ErrorT | null,
    status: Status,
    text: string | null,
    typeOfText: TypeOfText,
    typeOfWords: TypeOfWords,
    englishLvl: EnglishLvl,
    isRussian: IsRussian
    onAddSuggestWords: (data: string[]) => void,
    onConfirmWords: (data: string[]) => void,
    onGenerateText: (data: { words: string[], type: TypeOfText, englishLvl: EnglishLvl, isRussian: IsRussian }) => void,
    onDeleteText: () => void,
    setTypeText: (type: TypeOfText) => void,
    setTypeWords: (type: TypeOfWords) => void,
    onSelectEnglishLvl: (lvl: EnglishLvl) => void,
    onSetRussian: (IsRussian: IsRussian) => void
}

export const useAI = (): useAIHookResult => {


    const dispatch = useAppDispatch()
    const suggestWords = useAppSelector(selectAISuggestWords)
    const confirmWords = useAppSelector(selectAIConfirmWords)
    const text = useAppSelector(selectAIText)
    const error = useAppSelector(selectAIError)
    const status = useAppSelector(selectAIStatus)
    const typeOfText = useAppSelector(selectAITypeOfText)
    const typeOfWords = useAppSelector(selectAiTypeOfWords)
    const englishLvl = useAppSelector(selectAiEnglishLvl)
    const isRussian = useAppSelector(selectAiIsRussian)

    const onAddSuggestWords = (data: string[]) => {
        const deleteUniquesWords = deleteUniques(data)
        dispatch(addSuggestWords(deleteUniquesWords))
    }

    const onConfirmWords = (data: string[]) => {
        const deleteUniquesWords = deleteUniques(data)
        dispatch(addConfirmWords(deleteUniquesWords))
    }

    const onGenerateText = (data: { words: string[], type: TypeOfText, englishLvl: EnglishLvl, isRussian: IsRussian }) => {
        dispatch(getAIText(data))
    }

    const onDeleteText = () => {
        dispatch(deleteText())
    }

    const onSelectEnglishLvl = (lvl: EnglishLvl) => {
        dispatch(setEnglishLvl(lvl))
    }

    const setTypeText = (type: TypeOfText) => {
        dispatch(setTypeOfWhichText(type))
    }

    const setTypeWords = (type: TypeOfWords) => {
        dispatch(setTypeOfWhichWords(type))
    }

    const onSetRussian = (isRussian: IsRussian) => {
        dispatch(setRussian(isRussian))
    }


    return { suggestWords, confirmWords, error, status, text, typeOfText, typeOfWords, englishLvl, isRussian, onAddSuggestWords, onConfirmWords, onGenerateText, onDeleteText, setTypeWords, setTypeText, onSelectEnglishLvl, onSetRussian }

}

