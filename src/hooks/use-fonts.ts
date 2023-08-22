import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { selectFont, selectFonts } from '../store/header/fonts/fonts-selectors'
import { loadFonts } from '../store/header/fonts/fonts-thunks'
import { Font } from '../types'
import { setFont } from '../store/header/fonts/fonts-slice'

export const useFonts = (): [Font[], Font, (value: string) => void] => {
    const dispatch = useAppDispatch()
    const fonts = useAppSelector(selectFonts)
    const currentFont = useAppSelector(selectFont)

    const getFonts = () => {
        dispatch(loadFonts())
    }


    useEffect(() => {
        getFonts()
    }, [])


    const setCurrFont = (value: string) => {
        if (value) {
            dispatch(setFont({
                family: value
            }))
        }
    }

    return [fonts, currentFont, setCurrFont]
}

