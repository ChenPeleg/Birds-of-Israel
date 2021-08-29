import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import BirdCardContainerLayout from './birrd-card-container-layout';
import { AppCopyright } from '../components/app-copyright';
import { theme1 } from '../hoc/themes';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },

}));
export const AppLayout = () => {

    return (
        <ThemeProvider theme={theme1}>
            <div>
                <div className="app-background">
                    <BirdCardContainerLayout />
                </div>
                <AppCopyright /></div>
        </ThemeProvider>

    )

}


