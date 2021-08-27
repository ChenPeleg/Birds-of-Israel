import React, { Dispatch } from "react";
import { Box, Button, Icon, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Bird from "../models/bird.model";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
//import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const useStyles: any = makeStyles(
    (theme: Theme) => ({
        Button: {
            background: 'ccddaa#'
        },

    })
)


const StopButton = (): JSX.Element => {

    const lang = useSelector((state: { lang: string }) => state.lang);
    const choosenBird: Bird = useSelector((state: { choosenBird: Bird }) => state.choosenBird);
    const dispatch: Dispatch<any> = useDispatch();
    const classes = useStyles();
    return (<Box flexDirection="row" display="flex" alignItems="center" justifyContent="space-around">
        <Button color={'primary'} variant="contained" className={classes.Button}>{choosenBird ? choosenBird.HebrewName : null}<AccessAlarm  ></AccessAlarm></Button>
    </Box>)
}

export default StopButton
