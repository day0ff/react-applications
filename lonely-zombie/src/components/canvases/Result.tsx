import React, { useState, useRef, useEffect, RefObject } from 'react';
import { IResult } from '../../model/canvases/IResult';

const Result: React.FC<IResult> = ({width, height, name, inputData}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefResult = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const canvasElementResult = (canvasRefResult as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContextResult = canvasElementResult.getContext('2d') as CanvasRenderingContext2D;
    inputData && inputData.forEach(data => {
        if (data) {
          canvasContext.putImageData(data, 0, 0);
          canvasContextResult.drawImage(canvasElement, 0, 0);
        }
      }
    );
  }, [inputData]);

  return (
    <>
      <p>Result</p>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
      <canvas ref={canvasRefResult} id={name + '-result'} width={width} height={height}/>
    </>
  );
};

export default Result;
