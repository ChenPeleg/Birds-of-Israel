import { React, useState } from "react";
import { Card, CardMedia, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import BirdPhoto from "./birdPhoto";



const useStyles = makeStyles((theme) => ({
    cardBase: {
        padding: "10px",
        cursor: "pointer",
        width: "90%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

        // "&:hover, &:focus": {
        //     boxShadow: "mat"
        // }
    }
}))




const BirdCard = (props) => {
    const [rais, setRaise] = useState(false);
    const lang = useSelector(state => state.lang);

    const dispatch = useDispatch();

    const clickHandler = (bird) => {
        dispatch({ type: "CLICK_BIRD", id: bird.id })
    }
    const mouseEneter = () => {
        setRaise(true)
    }
    const mouseLeave = () => {
        setRaise(false)
    }
    const classes = useStyles();

    const birdNameInChoosenLang = lang === 'EN' ? props.bird.Name : props.bird.HebrewName
    return (<div>

        <Card raised={rais} className={classes.cardBase} height="30vh" onMouseEnter={mouseEneter} onMouseLeave={mouseLeave} onClick={() => clickHandler(props.bird)} >
            <CardMedia><BirdPhoto imageSource={props.bird.img} /> </CardMedia>

            <b>{birdNameInChoosenLang} </b> {props.bird.isChoosen ? 'Choosen' : null}


        </Card>
    </div>)
}
export default BirdCard