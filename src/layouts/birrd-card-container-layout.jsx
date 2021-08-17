import React from 'react'
import styles from './birdCardContainerLayout.module.scss';
import getAllBirds from '../hoc/getbirdsdata';
import BirdCard from '../components/bird-card';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const BirdCardContainerLayout = () => {
    //const bird1 = 'Bird 1';
    const classes = useStyles();
    const [...allBirds] = getAllBirds();
    console.log(allBirds)

    // const styleObj = {
    //     height: '100px'
    // }
    return (<div className={styles.birdcardlaout} >
        <div className={classes.root}>
            <Grid container spacing={3}>
                {allBirds.map((bird) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                        return (
                            <Grid item xs={3}>
                                <Paper className={classes.paper}>


                                    <BirdCard bird={bird} key={bird.id}></BirdCard>

                                </Paper>
                            </Grid>


                        )
                    }
                })}
            </Grid>
        </div>
        <Box flexDirection="row" >



        </Box>
    </div>)

}

export default BirdCardContainerLayout;
