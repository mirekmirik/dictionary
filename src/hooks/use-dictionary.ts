import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { loadWord } from '../store/dictionary/dictionary-thunks'
import { selectWord } from '../store/dictionary/dictionary-selectors'
import { Word } from '../types'

export const useDictionary = (): {inputRef: React.RefObject<HTMLInputElement>, handleWord: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void, word: Word | null} => {
    const dispatch = useAppDispatch()
    const word = useAppSelector(selectWord)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleWord = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (inputRef.current && inputRef.current.value) {
            dispatch(loadWord(inputRef.current.value))
        }
    }


    return {inputRef, handleWord, word}
}

