import React, { useState } from "react";
import { Card, CardMedia } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { BirdPhoto } from "./birdPhoto";
import Bird from "../models/bird.model";
import { Language } from "../models/languageEnum";
import { AppAction } from "../store/reducer";
import { Dispatch } from "react";
import { CLICK_BIRD } from "../store/actionTypes";


export const BirdCard = (props: { bird: Bird }) => {
    const [raised, setRaised] = useState(false);
    const language = useSelector((state: { language: Language }) => state.language);

    const dispatch: Dispatch<AppAction> = useDispatch();

    const clickHandler = (bird: Bird) => {
        dispatch({ type: CLICK_BIRD, id: bird.id })
    }
    const mouseEnter = () => {
        setRaised(true)
    }
    const mouseLeave = () => {
        setRaised(false)
    }

    const birdNameInChosenLang = language === Language.en ? props.bird.Name : props.bird.HebrewName
    const birdDescriptionChosenLang = language === Language.en ? props.bird.description?.en : props.bird.description?.he
    return (<div>

        <Card raised={raised} sx={{ padding: "10px", cursor: "pointer", width: "90%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}

            onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={() => clickHandler(props.bird)} >
            <CardMedia><BirdPhoto imageSource={props.bird.img} /> </CardMedia>

            <b>{birdNameInChosenLang} </b>
            <div style={{ fontSize: "14px" }}> {props.bird.isChosen ? birdDescriptionChosenLang : null}
            </div>


        </Card>
    </div>)
}

