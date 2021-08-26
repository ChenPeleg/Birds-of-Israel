import React, { Dispatch } from 'react'
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


    const onPlay = (second: any) => {
        // Store song current time in the Store on each one second
        dispatch({ type: 'SET_CURRENT_SECOND', second });
    }

    const onAbort = (seconds: any) => {
        // Rewind song current time
        dispatch({ type: 'REWIND_CURRENT_SECOND', seconds });
    }

    const assets = require.context('../assets/sounds', true);
    const mp3Src = (fileName: string) => (assets(`./${fileName}`).default);



    return (<div className={classes.root}>
        {choosenBird ? <audio src={mp3Src(choosenBird.mainSound)} onPlay={onPlay} onAbort={onAbort} /> : null}
    </div>)


}

export default PlayerComponent;
