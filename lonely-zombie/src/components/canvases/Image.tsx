import React, { useRef, useEffect, RefObject } from 'react';
import { IPosition } from '../../model/canvases/IVideo';
import { pathFace } from '../../services/helpers';
import { IImage } from '../../model/canvases/IImage';

const Image: React.FC<IImage> = ({width, height, name, outputData, src}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loop = (imageElement: HTMLImageElement, faceDetection: any, canvasElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D) => {
    canvasContext.drawImage(imageElement, 0, 0, width, height);

    const imageData = canvasContext.getImageData(0, 0, width, height);
    const positions = faceDetection.getCurrentPosition() as IPosition[];

    if (positions) {
      outputData && outputData({imageData, positions});
      pathFace(positions, canvasContext);
    } else {
      outputData && outputData({imageData});
    }

    setTimeout(() => {
      loop(imageElement, faceDetection, canvasElement, canvasContext);
    }, 300);
  };

  useEffect(() => {
    const imageElement = (imageRef as RefObject<HTMLImageElement>).current as HTMLImageElement;

    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const faceDetection = new window.clm.tracker({stopOnConvergence : true});

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
