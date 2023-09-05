import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { addFavouriteWord, addRecentWord, deleteRecentWord, getFavouriteWords, getRecentWords, loadWord } from '../store/dictionary/dictionary-thunks'
import { selectDictionaryError, selectDictionaryFavouriteWords, selectDictionaryRecentWords, selectDictionaryStatus, selectDictionaryWord } from '../store/dictionary/dictionary-selectors'
import { ErrorT, Status, Word } from '../types'
import useAuth from './use-auth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import { unwrapResult } from '@reduxjs/toolkit'
interface DictionaryHookResult {
    inputRef: React.RefObject<HTMLInputElement>,
    handleWord: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void,
    word: Word | null,
    error: ErrorT | null,
    status: Status,
    acceptWord: (val: string) => void,
    favouriteWords: string[],
    toggleFavouriteWord: (word: Word['word']) => void,
    getFavouritesWords: () => void,
    addRecentlyWord: (word: Word['word']) => void;
    getRecentlyWords: () => void;
    removeRecentlyWord: (word: Word['word']) => void;
    recentWords: string[];
}

export const useDictionary = (): DictionaryHookResult => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)
    const word = useAppSelector(selectDictionaryWord)
    const error = useAppSelector(selectDictionaryError)
    const status = useAppSelector(selectDictionaryStatus)
    const favouriteWords = useAppSelector(selectDictionaryFavouriteWords)
    const recentWords = useAppSelector(selectDictionaryRecentWords)



    const handleWord = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (inputRef.current && inputRef.current.value) {
            try {
                unwrapResult(await dispatch(loadWord(inputRef.current.value)))
                addRecentlyWord(inputRef.current.value)
            } catch (err) {
                console.error(err)
            }
        }
    }

    const acceptWord = async (word: string) => {
        if (word) {
            try {
                unwrapResult(await dispatch(loadWord(word)))
                addRecentlyWord(word)
            } catch (err) {
                console.error(err)
            }
        }
    }

    const toggleFavouriteWord = async (word: Word['word']) => {
        if (word) {
            if (user) {
                dispatch(addFavouriteWord({ login: user.login, word }))
            } else {
                navigate(ROUTES.LOGIN)
            }
        }
    }

    const getFavouritesWords = async () => {
        if(!user) return;
        dispatch(getFavouriteWords(user.login))
    }

    const addRecentlyWord = (word: Word['word']) => {
        if (word) {
            if (!user) return;
            dispatch(addRecentWord({ login: user.login, word }))
        }
    }

    const getRecentlyWords = () => {
        if (!user) return;
        dispatch(getRecentWords(user.login))
    }

    const removeRecentlyWord = (word: Word['word']) => {
        if(word) {
            if(user) {
                dispatch(deleteRecentWord({login: user.login, word}))
            } else {
                navigate(ROUTES.LOGIN)
            }
        }
    }



    return { inputRef, handleWord, word, error, status, acceptWord, favouriteWords, toggleFavouriteWord, getFavouritesWords, addRecentlyWord, getRecentlyWords, removeRecentlyWord, recentWords }
}

