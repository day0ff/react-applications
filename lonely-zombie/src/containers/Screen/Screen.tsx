import React, {useEffect, forwardRef, RefObject} from 'react';
import {IDimensions} from '../WorkArea/WorkArea';


export interface IScreen extends IDimensions {
    autoPlay: boolean;
    startVideo: (videoElement: HTMLVideoElement) => void;
}

const Screen = forwardRef<HTMLVideoElement, IScreen>(({width, height, autoPlay, startVideo}, ref) => {

    useEffect(() => {
        const videoElement = (ref as RefObject<HTMLVideoElement>).current as HTMLVideoElement;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                videoElement.srcObject = stream;
                videoElement.play()
                    .then(() => startVideo(videoElement))
                    .catch(err => console.log('Video Error: ' + err));
            });
        }
    }, []);

    return (
        <section>
            <p>Screen</p>
            <video ref={ref} id="video" width={width} height={height} autoPlay={autoPlay}/>
        </section>
    );
});

export default Screen;
