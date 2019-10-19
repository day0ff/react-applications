import React, {Fragment, useRef} from 'react';
import Screen from '../Screen/Screen';
import Filters from '../Filters/Filters';
import Gallery from '../Gallery/Gallery';
import WorkArea from '../WorkArea/WorkArea';
import {config} from '../../config';
import {startFaceTracking} from "../../services/face-detection";

const {width, height, autoPlay} = config;

const App: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startVideo = (videoElement: HTMLVideoElement) => {
        const canvasElement = canvasRef.current as HTMLCanvasElement;

        startFaceTracking(videoElement, canvasElement);
    };

    const video = {width, height, autoPlay, ref: videoRef, startVideo};
    const canvas = {width, height, ref: canvasRef};

    return (
        <Fragment>
            <header>
                Header
            </header>
            <Screen {...video}/>
            <WorkArea {...canvas}/>
            <Filters/>
            <Gallery/>
            <footer>
                Footer
            </footer>
        </Fragment>
    );
};

export default App;
