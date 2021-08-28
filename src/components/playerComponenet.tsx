import React, { Dispatch } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Bird from '../models/bird.model'
import { useDispatch, useSelector } from 'react-redux';
import getAllBirds from '../hoc/getbirdsdata'

interface BirdAudio { birdId: number, audioElement: HTMLAudioElement }
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));


const createAllBirdAudio = (): BirdAudio[] => {
    const assets = require.context('../assets/sounds', true);
    const loadSound = (fileName: string) => (assets(`./${fileName}`).default);
    return getAllBirds().map((bird: Bird) => {
        const birdAudioElement: HTMLAudioElement = new Audio(loadSound(bird.mainSound));
        return {
            birdId: bird.id,
            audioElement: birdAudioElement
        }
    })
}
const allBirdsAudio: BirdAudio[] = createAllBirdAudio();
const PlayerComponent = () => {
    const choosenBird: Bird = useSelector((state: { choosenBird: Bird }) => state.choosenBird);
    // const previosAudioElement: HTMLAudioElement = useSelector((state: { audioElement: HTMLAudioElement }) => state.audioElement);
    const filePlaying = useSelector((state: { filePlaying: string }) => state.filePlaying);
    const dispatch: Dispatch<any> = useDispatch();

    const classes = useStyles();
    const onPlay = (audioElement: HTMLAudioElement, filePlaying: string) => {
        dispatch({ type: 'SET_CURRENT_AUDIO_REF', audioElement: audioElement, filePlaying: filePlaying });
    }

    // const onAbort = (seconds: any) => {
    //     dispatch({ type: 'CURRENT_AUDIO_STOPPED', seconds });
    // }


    if (choosenBird && filePlaying !== choosenBird.mainSound) {

        allBirdsAudio.forEach((birdAudio: BirdAudio) => {
            if (!birdAudio.audioElement.paused && birdAudio.birdId !== choosenBird.id) {
                birdAudio.audioElement.pause();
            }
        })
        const audioToPlay: BirdAudio | undefined = allBirdsAudio.find((birdAudio: BirdAudio) => birdAudio.birdId === choosenBird.id);
        if (audioToPlay?.audioElement) {
            audioToPlay.audioElement.play();
        }
    }





    return (<div className={classes.root}>


    </div>)


}

export default PlayerComponent;
