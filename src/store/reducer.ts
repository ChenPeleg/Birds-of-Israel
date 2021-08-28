import Bird from "../models/bird.model"
import getAllBirds from '../hoc/getbirdsdata'
import { Language } from "../models/languageEnumb";
interface BirdStore {
    language: Language,
    lang: 'עב' | 'EN',
    langDir: 'ltr' | 'rtl',
    filePlaying: string | null,
    isPlaying: boolean,
    choosenBird: Bird | null,
    allBirds: Bird[],
    audioElement: HTMLAudioElement | null,
    stopBirdId: number
}

const [...allBirds]: Bird[] = getAllBirds();

const initialState: BirdStore = {
    language: Language.he,
    lang: 'עב',
    langDir: 'rtl',
    filePlaying: null,
    isPlaying: false,
    choosenBird: null,
    allBirds: allBirds,
    audioElement: null,
    stopBirdId: 0
}


const reducer = (state = initialState, action: any) => {
    let newState = {
        ...state
    }
    //console.log(state, action)
    switch (action.type) {

        case "LANG_HEB":
            newState.lang = 'עב';
            newState.langDir = 'rtl';
            newState.language = Language.he;
            break;
        case "LANG_EN":
            newState.lang = 'EN';
            newState.langDir = 'ltr';
            newState.language = Language.en;
            break;
        case "CLICK_BIRD":
            newState.allBirds = newState.allBirds.map((bird: Bird) => {
                let copiedBird = { ...bird }
                if (action.id === copiedBird.id) {
                    copiedBird.isChoosen = true;
                    newState.choosenBird = bird;
                } else {
                    copiedBird.isChoosen = false
                }
                return copiedBird
            })
            break;
        case "STARTED_PLAYING":
            newState.filePlaying = action.filePlaying;
            newState.isPlaying = true;
            break;
        case "STOP_SOUND":
            newState.stopBirdId = action.id
            break;
        case "SOUND_STOPED":
            newState.stopBirdId = 0;
            newState.isPlaying = false;

            break;
        default:
            break;

    }

    return newState
}

export default reducer