import React, { Dispatch, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Bird from '../models/bird.model'
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));
const PlayerComponent = () => {
    const choosenBird: Bird = useSelector((state: { choosenBird: Bird }) => state.choosenBird);
    const dispatch: Dispatch<any> = useDispatch();

    const classes = useStyles();


    const onPlay = (audioElement: HTMLAudioElement) => {

        dispatch({ type: 'SET_CURRENT_AUDIO_REF', audioElement: audioElement });
    }

    const onAbort = (seconds: any) => {

        dispatch({ type: 'CURRENT_AUDIO_STOPPED', seconds });
    }


    if (choosenBird) {
        const assets = require.context('../assets/sounds', true);
        const loadSound = (fileName: string) => (assets(`./${fileName}`).default);
        const BirdSound: HTMLAudioElement = new Audio(loadSound(choosenBird.mainSound));
        BirdSound.play().then(_ => {
            onPlay(BirdSound)
        });
    }





    return (<div className={classes.root}>

        {/* {choosenBird ? <audio controls autoPlay onPlay={onPlay} onAbort={onAbort} ><source src={birdSoundSrc} ref={audioRef} /> </audio> : null} */}

        {choosenBird ? choosenBird.HebrewName : null}
    </div>)


}

export default PlayerComponent;
