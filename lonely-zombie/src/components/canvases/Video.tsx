import React, { useRef, useEffect, RefObject } from 'react';
import { IPosition, IVideo } from '../../model/canvases/IVideo';
import { circuit } from '../../services/circuit';

declare global {
  interface Window {
    clm: any;
  }
}

const Video: React.FC<IVideo> = ({width, height, name, outputData, autoPlay}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startVideo = (videoElement: HTMLVideoElement) => {
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const faceDetection = new window.clm.tracker();
    faceDetection.init();
    faceDetection.start(videoElement);

    loop(videoElement, faceDetection, canvasElement, canvasContext);
  };

  const loop = (videoElement: HTMLVideoElement, faceDetection: any, canvasElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D) => {
    canvasContext.drawImage(videoElement, 0, 0, width, height);

    const videoData = canvasContext.getImageData(0, 0, width, height);
    const positions = faceDetection.getCurrentPosition() as IPosition[];

    if (positions) {
      outputData && outputData({videoData, positions});
      // circuit(positions, canvasContext);
      faceDetection.draw(canvasElement);
    } else {
      outputData && outputData({videoData});
    }

    setTimeout(() => {
      loop(videoElement, faceDetection, canvasElement, canvasContext);
    }, 30);
  };

  useEffect(() => {
    const videoElement = (videoRef as RefObject<HTMLVideoElement>).current as HTMLVideoElement;

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
    <>
      <p>Video</p>
      <video ref={videoRef} id={name + '-video'} width={width} height={height} autoPlay={autoPlay}/>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
    </>
  );
};

export default Video;
