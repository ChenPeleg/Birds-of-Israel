import React, { FC } from "react";
import * as scss from "./birdPhoto.module.scss";

type AppProps = {
    imageSource: string;
};
const styles: any = scss

export const BirdPhoto: FC<AppProps> = (props: AppProps) => {
    const assets = require.context('../assets/images', true);
    const loadImage = (imageName: string) =>
        (assets(`./${imageName}`).default);
    return (<img className={styles['birdphoto']} src={loadImage(props.imageSource)} alt="crow" />)
}
