import React, { useState } from "react";
import { Card, CardMedia, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { BirdPhoto } from "./birdPhoto";
import Bird from "../models/bird.model";



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




export const BirdCard = (props: { bird: Bird }) => {
    const [rais, setRaise] = useState(false);
    const lang = useSelector((state: { lang: any }) => state.lang);

    const dispatch = useDispatch();

    const clickHandler = (bird: Bird) => {
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
    const birdDescritionChoosenLang = lang === 'EN' ? props.bird.description?.en : props.bird.description?.he
    return (<div>

        <Card raised={rais} className={classes.cardBase}
            // height="30vh"
            onMouseEnter={mouseEneter} onMouseLeave={mouseLeave} onClick={() => clickHandler(props.bird)} >
            <CardMedia><BirdPhoto imageSource={props.bird.img} /> </CardMedia>

            <b>{birdNameInChoosenLang} </b> {props.bird.isChoosen ? birdDescritionChoosenLang : null}


        </Card>
    </div>)
}

