import React, {useRef, useState, useEffect, RefObject} from 'react';
import './Video.css';
import {IPosition, IVideo} from '../../model/canvases/IVideo';

declare global {
  interface Window {
    clm: any;
  }
}

const Video: React.FC<IVideo> = ({width, height, outputData, autoPlay}) => {
  let _isMounted = true;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startVideo = (videoElement: HTMLVideoElement, faceDetection: any,) => {
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    faceDetection.init();
    faceDetection.start(videoElement);

    const loop = () => {
      canvasContext.drawImage(videoElement, 0, 0, width, height);

      const videoData = canvasContext.getImageData(0, 0, width, height);
      const positions = faceDetection.getCurrentPosition() as IPosition[];

      if (positions) {
        outputData!({videoData, positions});
        faceDetection.fillStyle = 'black';
        faceDetection.draw(canvasElement);
      } else {
        outputData!({videoData});
      }

      if (_isMounted) {
        setTimeout(loop, 0);
      } else {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
        videoElement.remove();
        console.log('video loop remove');
        faceDetection.stop();
        console.log('face detection loop remove');
      }
    };

    loop();
  };


  useEffect(() => {
    const videoElement = (videoRef as RefObject<HTMLVideoElement>).current as HTMLVideoElement;
    const faceDetection = new window.clm.tracker();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
        videoElement.srcObject = stream;
        videoElement.play()
          .then(() => startVideo(videoElement, faceDetection))
          .catch(err => console.log('Video Error: ' + err));
      });
    }
    return () => {
      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.load();
      videoElement.remove();
      _isMounted = false;
      console.log('video remove');
      faceDetection.stop();
      console.log('face detection remove');
    }
  }, []);

  return (
    <div className={'Video'}>
      <p>Grid Mask</p>
      <video ref={videoRef} width={width} height={height} autoPlay={autoPlay}/>
      <canvas ref={canvasRef} width={width} height={height}/>
    </div>
  );
};

export default Video;
