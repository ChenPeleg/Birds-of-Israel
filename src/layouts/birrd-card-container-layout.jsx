import React from 'react'
import styles from './birdCardContainerLayout.module.scss';

const BirdCardContainerLayout = () => {
    const bird1 = 'Bird 1';
    // const styleObj = {
    //     height: '100px'
    // }
    return (<div className={styles.birdcardlaout} >
        {bird1}
    </div>)

}

export default BirdCardContainerLayout;
