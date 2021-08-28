import { Language } from '../models/languageEnumb';
import appData from './appData.json'



const getlanguageStrings = (): any => {
    return { ...appData.languageStrings };
}
const languageStrings = getlanguageStrings();

export const translate = (lang: Language, text: "header" | "Copyright") => {
    let textObj: { "he": string, "en": string } = languageStrings[text];
    switch (lang) {
        case Language.he:
            return textObj['he']
        case Language.en:
            return textObj['en']
    }

}


