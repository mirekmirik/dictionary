import { useAppDispatch, useAppSelector } from '../store/store'
import { selectFontError, selectFont, selectFonts } from '../store/fonts/fonts-selectors'
import { loadFonts } from '../store/fonts/fonts-thunks'
import { ErrorT, Font } from '../types'
import { setFont } from '../store/fonts/fonts-slice'


type FontsHookResult = [Font[], Font | null, (value: string) => void, ErrorT | null, () => void]

export const useFonts = (): FontsHookResult => {
    const dispatch = useAppDispatch()
    const fonts = useAppSelector(selectFonts)
    const currentFont = useAppSelector(selectFont)
    const error = useAppSelector(selectFontError)

    const onLoadFonts = () => {
        dispatch(loadFonts())
    }


    const setCurrFont = (value: string) => {
        if (value) {
            dispatch(setFont({
                family: value
            }))
        }
    }

    return [fonts, currentFont, setCurrFont, error, onLoadFonts]
}

