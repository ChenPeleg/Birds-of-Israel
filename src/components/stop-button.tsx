import React, { Dispatch } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Bird from "../models/bird.model";
import { Stop } from '@mui/icons-material';
import { Language } from "../models/languageEnum";
import { AppAction } from "../store/reducer";
import { STOP_SOUND } from "../store/actionTypes";

//import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const StopButton = (): JSX.Element => {
    const theme1 = useTheme();
    const language = useSelector((state: { language: Language }) => state.language);
    const isPlaying = useSelector((state: { isPlaying: Language }) => state.isPlaying);
    const chosenBird: Bird = useSelector((state: { chosenBird: Bird }) => state.chosenBird);
    const dispatch: Dispatch<AppAction> = useDispatch();
    const onClickHandler = () => {
        const birdId = chosenBird?.id || 0;
        dispatch({ type: STOP_SOUND, id: birdId })
    }
    const birdName: string = language === Language.en ? chosenBird?.Name : chosenBird?.HebrewName
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around">
        <Button color={'primary'} sx={{ opacity: isPlaying ? 1 : 0, background: theme1.palette.secondary.light }} onClick={() => onClickHandler()} variant="contained"> <Stop  ></Stop> {chosenBird ? birdName : null}</Button>
    </Box>)
}

export default StopButton
