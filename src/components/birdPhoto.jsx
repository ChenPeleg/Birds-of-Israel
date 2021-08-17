import React from "react";
import styles from './birdPhoto.module.scss';

const BirdPhoto = (props) => {

    const assets = require.context('../assets/images', true);
    const loadImage = imageName => (assets(`./${imageName}`).default);

    return (<img className={styles.birdphoto} src={loadImage("crow.jpg")} alt="crow" />)
}
export default BirdPhoto;