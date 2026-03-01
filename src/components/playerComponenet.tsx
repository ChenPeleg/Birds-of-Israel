import React, { Dispatch } from 'react'
import Bird from '../models/bird.model'
import { useDispatch, useSelector } from 'react-redux';
import getAllBirds from '../hoc/getbirdsdata'

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
    const choosenBird: Bird = useSelector((state: { choosenBird: Bird }) => state.choosenBird);
    // const previosAudioElement: HTMLAudioElement = useSelector((state: { audioElement: HTMLAudioElement }) => state.audioElement);
    const filePlaying = useSelector((state: { filePlaying: string }) => state.filePlaying);

    const stopBirdId = useSelector((state: { stopBirdId: number }) => state.stopBirdId);

    const dispatch: Dispatch<any> = useDispatch();


    // const onAbort = (seconds: any) => {
    //     dispatch({ type: 'CURRENT_AUDIO_STOPPED', seconds });
    // }
    if (stopBirdId !== 0) {
        allBirdsAudio.forEach((birdAudio: BirdAudio) => {
            if (!birdAudio.audioElement.paused && birdAudio.birdId === stopBirdId) {
                birdAudio.audioElement.pause();
                dispatch({ type: "SOUND_STOPED" })
            }
        })
    } else if (choosenBird && filePlaying !== choosenBird.mainSound) {

        allBirdsAudio.forEach((birdAudio: BirdAudio) => {
            if (!birdAudio.audioElement.paused && birdAudio.birdId !== choosenBird.id) {
                birdAudio.audioElement.pause();
            }
        })
        const audioToPlay: BirdAudio | undefined = allBirdsAudio.find((birdAudio: BirdAudio) => birdAudio.birdId === choosenBird.id);
        if (audioToPlay?.audioElement) {
            audioToPlay.audioElement.play().then(_ => {
                dispatch({ type: "STARTED_PLAYING", filePlaying: choosenBird.mainSound })
            });
        }
    }






    return (<div style={{ flexGrow: 1 }}>


    </div>)


}

export default PlayerComponent;
