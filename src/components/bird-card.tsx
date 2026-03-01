import React, { useState } from "react";
import { Card, CardMedia } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { BirdPhoto } from "./birdPhoto";
import Bird from "../models/bird.model";
import { Language } from "../models/languageEnumb";


export const BirdCard = (props: { bird: Bird }) => {
    const [rais, setRaise] = useState(false);
    const language = useSelector((state: { language: Language }) => state.language);

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

    const birdNameInChoosenLang = language === Language.en ? props.bird.Name : props.bird.HebrewName
    const birdDescritionChoosenLang = language === Language.en ? props.bird.description?.en : props.bird.description?.he
    return (<div>

        <Card raised={rais} sx={{ padding: "10px", cursor: "pointer", width: "90%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}

            onMouseEnter={mouseEneter} onMouseLeave={mouseLeave} onClick={() => clickHandler(props.bird)} >
            <CardMedia><BirdPhoto imageSource={props.bird.img} /> </CardMedia>

            <b>{birdNameInChoosenLang} </b>
            <div style={{ fontSize: "14px" }}> {props.bird.isChoosen ? birdDescritionChoosenLang : null}
            </div>


        </Card>
    </div>)
}

