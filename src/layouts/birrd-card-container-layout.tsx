import React from 'react'
import getAllBirds from '../hoc/getbirdsdata';
import BirdCard from '../components/bird-card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppHeader from '../components/app-header';
import Bird from '../models/bird.model'
import PlayerComponent from '../components/playerComponenet';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    choosenCard: {
        background: "red"
    },
    gridclass: {
        flexGrow: 1,
        padding: "1rem",
        [theme.breakpoints.down('md')]: {
            padding: "0.3rem"
        }
    },
    mainContainer: {
        padding: "1rem",
        [theme.breakpoints.down('md')]: {
            padding: "0.8rem"
        }
    }
}));
const BirdCardContainerLayout = () => {

    //    const [lang, setLang] = useState('he');
    const classes = useStyles();
    const [...allBirds]: Bird[] = getAllBirds();

    return (
        <div dir={"rtl"} className={classes.mainContainer}>
            <AppHeader />
            <PlayerComponent />
            <Grid container spacing={3} className={classes.gridclass}>
                {allBirds.map((bird) => {
                    return (<Grid key={bird.id} item md={2} sm={4} xs={5}>
                        <BirdCard bird={bird} key={bird.id}></BirdCard>
                    </Grid>
                    )

                })}
            </Grid>  </div>)

}

export default BirdCardContainerLayout;
