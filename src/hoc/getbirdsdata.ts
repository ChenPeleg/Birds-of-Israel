import appData from './appData.json'

const getAllBirds = (): any[] => {
    return [...appData.allBirds];
}

export default getAllBirds;




