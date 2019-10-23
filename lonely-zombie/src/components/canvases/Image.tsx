import React, { useRef, useEffect, RefObject } from 'react';
import { IPosition } from '../../model/canvases/IVideo';
import { circuit } from '../../services/circuit';
import { IImage } from '../../model/canvases/IImage';

const Image: React.FC<IImage> = ({width, height, name, outputData, src}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loop = (imageElement: HTMLImageElement, faceDetection: any, canvasElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D) => {
    canvasContext.drawImage(imageElement, 0, 0, width, height);

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
      loop(imageElement, faceDetection, canvasElement, canvasContext);
    }, 30);
  };

  useEffect(() => {
    const imageElement = (imageRef as RefObject<HTMLImageElement>).current as HTMLImageElement;

    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const faceDetection = new window.clm.tracker();

    faceDetection.init();
    faceDetection.start(canvasElement);

    loop(imageElement, faceDetection, canvasElement, canvasContext);

  }, []);

  return (
    <>
      <p>Image</p>
      <img ref={imageRef} id={name + '-image'} src={src} width={width} height={height}/>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
    </>
  );
};

export default Image;
