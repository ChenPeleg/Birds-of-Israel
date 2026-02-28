import React, { FC } from "react";
import * as scss from "./birdPhoto.module.scss";

type AppProps = {
    imageSource: string;
};
const styles: any = scss

const imageModules = import.meta.glob('../assets/images/**/*', { eager: true, query: '?url', import: 'default' });

export const BirdPhoto: FC<AppProps> = (props: AppProps) => {
    const loadImage = (imageName: string): string => imageModules[`../assets/images/${imageName}`] as string;
    return (<img className={styles['birdphoto']} src={loadImage(props.imageSource)} alt="crow" />)
}
