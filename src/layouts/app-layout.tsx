import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import BirdCardContainerLayout from './bird-card-container-layout';
import { AppCopyright } from '../components/app-copyright';
import { theme1 } from '../styles/themes';


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


