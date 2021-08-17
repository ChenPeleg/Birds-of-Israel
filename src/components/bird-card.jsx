import React from "react";
import Box from '@material-ui/core/Box';


import { Card } from '@material-ui/core';

const BirdCard = (props) => {
    return (<div>
        <Box height="30vh">
            {/* <Card color="primary"> */}
            <b>{props.bird.HebrewName} </b>
            {/* </Card> */}

        </Box>
    </div>)
}
export default BirdCard