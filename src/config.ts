export const API_FONTS = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_KEY_FONTS}`
export const API_DICTIONARY = `https://api.dictionaryapi.dev/api/v2/entries/en`
export const SERVER = `https://dictionary-backend-layj.onrender.com`
export const ADD_MARKED_SERVER = 'api/dictionary/addMarked'
export const GET_MARKED_SERVER = 'api/dictionary/getMarked'
export const ADD_RECENTS_SERVER = 'api/dictionary/addRecents'
export const GET_RECENTS_SERVER = 'api/dictionary/getRecents'
export const DELETE_RECENTS_SERVER = 'api/dictionary/deleteRecents'



export const deleteUniques = (arr: any[]) => {
    return arr.filter((value, idx, arr) => arr.indexOf(value) === idx)
}



export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Smooth scrolling animation
    });
}
