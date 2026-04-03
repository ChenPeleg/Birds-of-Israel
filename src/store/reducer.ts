import Bird from "../models/bird.model"
import getAllBirds from '../data/getBirdsData'
import { Language } from "../models/languageEnum";
import { LANG_HEB, LANG_EN, CLICK_BIRD, STARTED_PLAYING, STOP_SOUND, SOUND_STOPPED } from './actionTypes';

export type AppAction =
    | { type: typeof LANG_HEB }
    | { type: typeof LANG_EN }
    | { type: typeof CLICK_BIRD; id: number }
    | { type: typeof STARTED_PLAYING; filePlaying: string }
    | { type: typeof STOP_SOUND; id: number }
    | { type: typeof SOUND_STOPPED };

interface BirdStore {
    language: Language,
    langDir: 'ltr' | 'rtl',
    filePlaying: string | null,
    isPlaying: boolean,
    chosenBird: Bird | null,
    allBirds: Bird[],
    stopBirdId: number
}

const [...allBirds]: Bird[] = getAllBirds();

const initialState: BirdStore = {
    language: Language.he,
    langDir: 'rtl',
    filePlaying: null,
    isPlaying: false,
    chosenBird: null,
    allBirds: allBirds,
    stopBirdId: 0
}


const reducer = (state = initialState, action: AppAction) => {
    let newState = {
        ...state
    }
    switch (action.type) {

        case LANG_HEB:
            newState.langDir = 'rtl';
            newState.language = Language.he;
            break;
        case LANG_EN:
            newState.langDir = 'ltr';
            newState.language = Language.en;
            break;
        case CLICK_BIRD:
            newState.allBirds = newState.allBirds.map((bird: Bird) => {
                let copiedBird = { ...bird }
                if (action.id === copiedBird.id) {
                    copiedBird.isChosen = true;
                    newState.chosenBird = bird;
                } else {
                    copiedBird.isChosen = false
                }
                return copiedBird
            })
            break;
        case STARTED_PLAYING:
            newState.filePlaying = action.filePlaying;
            newState.isPlaying = true;
            break;
        case STOP_SOUND:
            newState.stopBirdId = action.id
            break;
        case SOUND_STOPPED:
            newState.stopBirdId = 0;
            newState.isPlaying = false;
            break;
        default:
            break;

    }

    return newState
}

export default reducer