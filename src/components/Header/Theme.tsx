import React from 'react'
import useTheme from '../../hooks/use-theme'

export const Theme = () => {
    const [, toggleTheme] = useTheme()


    return (
        <div onClick={toggleTheme}>Theme</div>
    )
}
