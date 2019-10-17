import React, {useEffect, useRef} from 'react';
import {IDimensions} from '../WorkArea/WorkArea';

export interface IScreen extends IDimensions {
    autoPlay: boolean;
}

const Screen: React.FC<IScreen> = ({width, height, autoPlay}) => {
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // const video = document.getElementById('video') as HTMLVideoElement;
        const videoElement = video.current as HTMLVideoElement;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                // (video.current as HTMLVideoElement).srcObject = stream;
                // (video.current as HTMLVideoElement).play();
                videoElement.srcObject = stream;
                videoElement.play();
            });
        }
    }, []);

    return (
        <section>
            <p>Screen</p>
            <video ref={video} id="video" width={width} height={height} autoPlay={autoPlay}/>
            {/*<video id="video" width="640" height="480" autoPlay/>*/}
        </section>
    );
};

export default Screen;
