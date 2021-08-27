import Bird from "../models/bird.model"
import getAllBirds from '../hoc/getbirdsdata.js'
import { Language } from "../models/languageEnumb";
interface BirdStore {
    Language: Language,
    lang: 'עב' | 'EN',
    filePlaying: string | null,
    isPlaying: boolean,
    choosenBird: Bird | null,
    allBirds: Bird[],
    audioElement: HTMLAudioElement | null
}

const [...allBirds]: Bird[] = getAllBirds();

const initialState: BirdStore = {
    Language: Language.he,
    lang: 'עב',
    filePlaying: null,
    isPlaying: false,
    choosenBird: null,
    allBirds: allBirds,
    audioElement: null
}


const reducer = (state = initialState, action: any) => {
    let newState = {
        ...state
    }
    //console.log(state, action)
    switch (action.type) {

        case "LANG_HEB":
            newState.lang = 'עב';
            break;
        case "LANG_EN":
            newState.lang = 'EN';
            break;
        case "CLICK_BIRD":
            newState.allBirds = newState.allBirds.map((bird: Bird) => {
                let copiedBird = { ...bird }
                if (action.id === copiedBird.id) {
                    copiedBird.isChoosen = true;
                    newState.choosenBird = bird
                } else {
                    copiedBird.isChoosen = false
                }
                return copiedBird
            })
            break;
        case "SET_CURRENT_AUDIO_REF":
            newState.audioElement = action.audioElement
            break;
        default:
            break;

    }
    console.log(newState)
    return newState
}

export default reducer