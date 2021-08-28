import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BirdCardContainerLayout from './birrd-card-container-layout';
import { AppCopyright } from '../components/app-copyright';


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
        <AppCopyright />

    </div>)

}


