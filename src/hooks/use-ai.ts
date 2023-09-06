import { useAppDispatch, useAppSelector } from '../store/store'
import { selectAIConfirmWords, selectAIError, selectAIStatus, selectAISuggestWords, selectAIText, selectAITypeOfText, selectAiEnglishLvl, selectAiTypeOfWords } from '../store/ai/ai-selectors'
import { EnglishLvl, ErrorT, Status, TypeOfText, TypeOfWords } from '../types'
import { addConfirmWords, addSuggestWords, deleteText, setEnglishLvl, setTypeOfWhichText, setTypeOfWhichWords } from '../store/ai/ai-slice'
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
    onAddSuggestWords: (data: string[]) => void,
    onConfirmWords: (data: string[]) => void,
    onGenerateText: (data: { words: string[], type: TypeOfText, englishLvl: EnglishLvl }) => void,
    onDeleteText: () => void,
    setTypeText: (type: TypeOfText) => void,
    setTypeWords: (type: TypeOfWords) => void,
    onSelectEnglishLvl: (lvl: EnglishLvl) => void
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

    const onAddSuggestWords = (data: string[]) => {
        const deleteUniquesWords = deleteUniques(data)
        dispatch(addSuggestWords(deleteUniquesWords))
    }

    const onConfirmWords = (data: string[]) => {
        const deleteUniquesWords = deleteUniques(data)
        dispatch(addConfirmWords(deleteUniquesWords))
    }

    const onGenerateText = (data: { words: string[], type: TypeOfText, englishLvl: EnglishLvl }) => {
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


    return { suggestWords, confirmWords, error, status, text, typeOfText, typeOfWords, englishLvl, onAddSuggestWords, onConfirmWords, onGenerateText, onDeleteText, setTypeWords, setTypeText, onSelectEnglishLvl }

}

