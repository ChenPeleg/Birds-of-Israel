import React from 'react'
import styles from './birdCardContainerLayout.module.scss';
import getAllBirds from '../hoc/getbirdsdata';
import BirdCard from '../components/bird-card';

const BirdCardContainerLayout = () => {
    //const bird1 = 'Bird 1';
    const [...allBirds] = getAllBirds();
    console.log(allBirds)

    // const styleObj = {
    //     height: '100px'
    // }
    return (<div className={styles.birdcardlaout} >
        {allBirds.map((bird) => {
            // eslint-disable-next-line no-lone-blocks
            { return <BirdCard bird={bird}></BirdCard> }
        })}

    </div>)

}

export default BirdCardContainerLayout;
