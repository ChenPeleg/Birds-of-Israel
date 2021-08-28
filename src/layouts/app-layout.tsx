import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BirdCardContainerLayout from './birrd-card-container-layout';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },

}));
export const AppLayout = () => {

    return (<div>
        <div className="app-background">
            <BirdCardContainerLayout />
        </div>
        <div id="copyrights" className="no-overflow">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &copy;
            כל הזכויות שמורות לחן פלג 2021
            &nbsp;&nbsp;&nbsp;
        </div>
    </div>)

}


