import React from "react";
import Box from '@material-ui/core/Box';


import { Card, CardMedia } from '@material-ui/core';
import BirdPhoto from "./birdPhoto";

const BirdCard = (props) => {
    return (<div>
        <Card height="30vh">
            <CardMedia><BirdPhoto imageSource={props.bird.image} /> </CardMedia>

            {/* <Card color="primary"> */}
            <b>{props.bird.HebrewName} </b>
            {/* </Card> */}

        </Card>
    </div>)
}
export default BirdCard