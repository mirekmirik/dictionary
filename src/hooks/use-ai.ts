import { useAppDispatch, useAppSelector } from '../store/store'
import { selectAIConfirmWords, selectAIError, selectAIStatus, selectAISuggestWords, selectAIText, selectAITypeOfText, selectAiTypeOfWords } from '../store/ai/ai-selectors'
import { ErrorT, Status, TypeOfText, TypeOfWords } from '../types'
import { addConfirmWords, addSuggestWords, deleteText, setTypeOfWhichText, setTypeOfWhichWords } from '../store/ai/ai-slice'
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
    onAddSuggestWords: (data: string[]) => void,
    onConfirmWords: (data: string[]) => void,
    onGenerateText: (data: { words: string[], type: TypeOfText }) => void,
    onDeleteText: () => void,
    setTypeText: (type: TypeOfText) => void,
    setTypeWords: (type: TypeOfWords) => void,
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

    const onAddSuggestWords = (data: string[]) => {
        const deleteUniquesWords = deleteUniques(data)
        dispatch(addSuggestWords(deleteUniquesWords))
    }

    const onConfirmWords = (data: string[]) => {
        const deleteUniquesWords = deleteUniques(data)
        dispatch(addConfirmWords(deleteUniquesWords))
    }

    const onGenerateText = (data: { words: string[], type: TypeOfText }) => {
        console.log(data)
        dispatch(getAIText(data))
    }

    const onDeleteText = () => {
        dispatch(deleteText())
    }

    const setTypeText = (type: TypeOfText) => {
        dispatch(setTypeOfWhichText(type))
    }

    const setTypeWords = (type: TypeOfWords) => {
        dispatch(setTypeOfWhichWords(type))
    }


    return { suggestWords, confirmWords, error, status, text, typeOfText, typeOfWords, onAddSuggestWords, onConfirmWords, onGenerateText, onDeleteText, setTypeWords, setTypeText }

}

