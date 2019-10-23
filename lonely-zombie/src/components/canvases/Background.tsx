import React, { forwardRef, useState, useEffect, RefObject, useRef } from 'react';
import { IBackground } from '../../model/canvases/IBackground';
import { chromokey } from '../../services/chromokey';

const Background: React.FC<IBackground> = ({width, height, img, name, inputData, outputData, color, tolerance}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefResult = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const imageElement = (imageRef as RefObject<HTMLImageElement>).current as HTMLImageElement;
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const canvasElementResult = (canvasRefResult as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContextResult = canvasElementResult.getContext('2d') as CanvasRenderingContext2D;

    canvasContextResult.drawImage(imageElement, 0, 0, width, height);

    if (inputData) {
      canvasContext.putImageData(chromokey(inputData, color, tolerance), 0, 0);
      canvasContextResult.drawImage(canvasElement, 0, 0, width, height)
    }

    const imageData = canvasContextResult.getImageData(0, 0, width, height);

    outputData && outputData(imageData);

  }, [inputData]);

  return (
    <>
      <p>Background</p>
      <img ref={imageRef} id={name + '-image'} src={img.path} width={width} height={height}/>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
      <canvas ref={canvasRefResult} id={name + '-result'} width={width} height={height}/>
    </>
  );
};

export default Background;
