import React, { Dispatch } from "react";
import { Box, Button, Icon, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Bird from "../models/bird.model";
import { AccessAlarm, Stop } from '@material-ui/icons';
import { Language } from "../models/languageEnumb";
import { translate } from "../hoc/translateService";
//import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const useStyles: any = makeStyles(
    (theme: Theme) => ({
        Button: {
            background: 'ccddaa#',
            transition: "opacity 200ms ease-in-out"
        },

    })
)


const StopButton = (): JSX.Element => {

    const language = useSelector((state: { language: Language }) => state.language);
    const isPlaying = useSelector((state: { isPlaying: Language }) => state.isPlaying);
    const choosenBird: Bird = useSelector((state: { choosenBird: Bird }) => state.choosenBird);
    const dispatch: Dispatch<any> = useDispatch();
    const onClickHandler = () => {
        const birdId = choosenBird?.id || 0;
        dispatch({ type: "STOP_SOUND", id: birdId })
    }
    const birdName: string = language === Language.en ? choosenBird?.Name : choosenBird?.HebrewName
    const classes = useStyles();
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around">
        <Button color={'primary'} style={{ "opacity": isPlaying ? 1 : 0 }} onClick={() => onClickHandler()} variant="contained" className={classes.Button}> <Stop  ></Stop> {choosenBird ? birdName : null}</Button>
    </Box>)
}

export default StopButton
