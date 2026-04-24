import React, { Dispatch, useEffect } from 'react'
import Bird from '../models/bird.model'
import { useDispatch, useSelector } from 'react-redux';
import getAllBirds from '../data/getBirdsData'
import { AppAction } from '../store/reducer';
import { STARTED_PLAYING, SOUND_STOPPED } from '../store/actionTypes';

interface BirdAudio { birdId: number, audioElement: HTMLAudioElement }


const soundModules = import.meta.glob('../assets/sounds/**/*', { eager: true, query: '?url', import: 'default' });
const createAllBirdAudio = (): BirdAudio[] => {
    const loadSound = (fileName: string): string => soundModules[`../assets/sounds/${fileName}`] as string;
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
    const chosenBird: Bird = useSelector((state: { chosenBird: Bird }) => state.chosenBird);
    const filePlaying = useSelector((state: { filePlaying: string }) => state.filePlaying);
    const stopBirdId = useSelector((state: { stopBirdId: number }) => state.stopBirdId);
    const dispatch: Dispatch<AppAction> = useDispatch();

    useEffect(() => {
        if (stopBirdId !== 0) {
            allBirdsAudio.forEach((birdAudio: BirdAudio) => {
                if (!birdAudio.audioElement.paused && birdAudio.birdId === stopBirdId) {
                    birdAudio.audioElement.pause();
                    dispatch({ type: SOUND_STOPPED })
                }
            })
        } else if (chosenBird && filePlaying !== chosenBird.mainSound) {
            allBirdsAudio.forEach((birdAudio: BirdAudio) => {
                if (!birdAudio.audioElement.paused && birdAudio.birdId !== chosenBird.id) {
                    birdAudio.audioElement.pause();
                }
            })
            const audioToPlay: BirdAudio | undefined = allBirdsAudio.find((birdAudio: BirdAudio) => birdAudio.birdId === chosenBird.id);
            if (audioToPlay?.audioElement) {
                audioToPlay.audioElement.play().then(() => {
                    dispatch({ type: STARTED_PLAYING, filePlaying: chosenBird.mainSound })
                });
            }
        }
    }, [chosenBird, filePlaying, stopBirdId, dispatch]);

    return (<div style={{ flexGrow: 1 }}>


    </div>)


}

export default PlayerComponent;
