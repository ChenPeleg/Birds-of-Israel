import React from 'react'

import Grid from '@mui/material/Grid';
import AppHeader from '../components/app-header';
import Bird from '../models/bird.model'
import PlayerComponent from '../components/playerComponenet';
import { useSelector } from 'react-redux';
import { BirdCard } from '../components/bird-card';


const BirdCardContainerLayout = () => {

    const langDir = useSelector((state: { langDir: string }) => state.langDir);
    const allBirds: Bird[] = useSelector((state: { allBirds: Bird[] }) => state.allBirds);

    return (
        <div dir={langDir} style={{ padding: "1rem" }}>
            <AppHeader />
            <PlayerComponent />
            <Grid container spacing={3} sx={(theme) => ({ flexGrow: 1, padding: "1rem", [theme.breakpoints.down('md')]: { padding: "0.3rem" } })}>
                {allBirds.map((bird: Bird) => {
                    return (<Grid key={bird.id} item md={2} sm={4} xs={5}>
                        <BirdCard bird={bird} key={bird.id}></BirdCard>
                    </Grid>
                    )
                })}
            </Grid>  </div>)

}

export default BirdCardContainerLayout;
