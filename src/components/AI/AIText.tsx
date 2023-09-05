import React, { useMemo } from 'react';
import parse from 'html-react-parser';


interface AITextProps {
    text: string,
    confirmWords: string[]
}

const AIText: React.FC<AITextProps> = ({ text, confirmWords }) => {

    function refactorText(text: string, confirmWords: string[]) {
        const refactoredText = text.replace(
            new RegExp(`\\b(${confirmWords.join('|')})\\b`, 'gi'),
            '<span class=bold>$1</span>'
        );

        return refactoredText;
    }


    const refactoredText = useMemo(() => refactorText(text, confirmWords), [text, confirmWords]) ;
    



    return (
        <>
            {parse(`<p>${refactoredText}</p>`)}
        </>
    )
}

export default AIText

