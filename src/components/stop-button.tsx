import React, { Dispatch } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Bird from "../models/bird.model";
import { Stop } from '@mui/icons-material';
import { Language } from "../models/languageEnumb";

//import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const StopButton = (): JSX.Element => {
    const theme1 = useTheme();
    const language = useSelector((state: { language: Language }) => state.language);
    const isPlaying = useSelector((state: { isPlaying: Language }) => state.isPlaying);
    const choosenBird: Bird = useSelector((state: { choosenBird: Bird }) => state.choosenBird);
    const dispatch: Dispatch<any> = useDispatch();
    const onClickHandler = () => {
        const birdId = choosenBird?.id || 0;
        dispatch({ type: "STOP_SOUND", id: birdId })
    }
    const birdName: string = language === Language.en ? choosenBird?.Name : choosenBird?.HebrewName
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around">
        <Button color={'primary'} sx={{ opacity: isPlaying ? 1 : 0, background: theme1.palette.secondary.light }} onClick={() => onClickHandler()} variant="contained"> <Stop  ></Stop> {choosenBird ? birdName : null}</Button>
    </Box>)
}

export default StopButton
