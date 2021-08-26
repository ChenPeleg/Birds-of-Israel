const initialState = {
    Language: 'he',
    lang: 'עב',
    filePlaying : null,
    isPlaying : false,
    playingBirdId : null
}

const reducer = (state = initialState, action) => {
    let newState = {
        ...state
    }
    console.log (state,action)
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