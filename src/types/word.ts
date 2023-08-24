export type Phonetic = {
    text: string,
    audio: string,
    sourceUrl: string,
    license: {
        name: string,
        url: string
    }
}

export type Definition = {
    definition: string,
    synonyms: string[],
    antonyms: string[],
    example?: string
}

export type Meaning = {
    partOfSpeech: string,
    definitions: Definition[],
    antonyms: string[],
    synonyms: string[]
}

export type License = {
    name: string,
    url: string
}


export type Word = {
    "word": string,
    "phonetic": string,
    "phonetics": Phonetic[],
    "meanings": Meaning[],
    "license": License,
    "sourceUrls": string[]
}
