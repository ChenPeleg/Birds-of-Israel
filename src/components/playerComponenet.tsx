import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Bird from '../models/bird.model'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));
const PlayerComponent = () => {
    const classes = useStyles();
    return (
        <div dir={"rtl"} className={classes.root}>
        </div>)

}

export default PlayerComponent;
