import { React, useState } from "react";
import { Card, CardMedia, makeStyles } from '@material-ui/core';
import BirdPhoto from "./birdPhoto";



const useStyles = makeStyles((theme) => ({
    cardBase: {
        padding: "10px",
        cursor: "pointer",

        // "&:hover, &:focus": {
        //     boxShadow: "mat"
        // }
    }
}))

const BirdCard = (props) => {
    const [rais, setRaise] = useState(false);

    const mouseEneter = () => {
        setRaise(true)
    }
    const mouseLeave = () => {
        setRaise(false)
    }
    const classes = useStyles();
    return (<div>
        <Card raised={rais} className={classes.cardBase} height="30vh" onMouseEnter={mouseEneter} onMouseLeave={mouseLeave} >
            <CardMedia><BirdPhoto imageSource={props.bird.img} /> </CardMedia>

            {/* <Card color="primary"> */}
            <b>{props.bird.HebrewName} </b>
            {/* </Card> */}

        </Card>
    </div>)
}
export default BirdCard