import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { loadWord } from '../store/dictionary/dictionary-thunks'
import { selectError, selectStatus, selectWord } from '../store/dictionary/dictionary-selectors'
import { ErrorT, Status, Word } from '../types'

export const useDictionary = (): { inputRef: React.RefObject<HTMLInputElement>, handleWord: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void, word: Word | null, error: ErrorT | null, status: Status, acceptWord: (val: string) => void } => {
    const dispatch = useAppDispatch()
    const word = useAppSelector(selectWord)
    const error = useAppSelector(selectError)
    const status = useAppSelector(selectStatus)
    

    const inputRef = useRef<HTMLInputElement>(null)

    const handleWord = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (inputRef.current && inputRef.current.value) {
            dispatch(loadWord(inputRef.current.value))
        }
    }

    const acceptWord = (word: string) => {
        if(word) {
            dispatch(loadWord(word))
        }
    }


    return { inputRef, handleWord, word, error, status, acceptWord }
}

