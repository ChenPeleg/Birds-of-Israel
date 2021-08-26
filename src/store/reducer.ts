import Bird from "../models/bird.model"

interface BirdStore {
    Language: 'en' | 'he',
    lang: 'עב' | 'EN',
    filePlaying: string | null,
    isPlaying: boolean,
    choosenBird: Bird | null
}


const initialState: BirdStore = {
    Language: 'he',
    lang: 'עב',
    filePlaying: null,
    isPlaying: false,
    choosenBird: null
}

const reducer = (state = initialState, action: any) => {
    let newState = {
        ...state
    }
    console.log(state, action)
    switch (action.type) {

        case "LANG_HEB":
            newState.lang = 'עב';
            break;
        case "LANG_EN":
            newState.lang = 'EN';
            break;
        default:
            break;

    }
    return newState
}

export default reducer