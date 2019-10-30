import React, { useState, useRef, useEffect, RefObject } from 'react';
import { IResult } from '../../model/canvases/IResult';
import { useKey } from '../../services/hooks/useKey'

const Result: React.FC<IResult> = ({width, height, inputData, outputData}) => {
  const space = useKey({
    key: ' ', keyDown: () => {
      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
      const imageData = canvasContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData);
      console.log(imageData);
    }
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    inputData && inputData.forEach(data => {
        if (data) {
          tempContext.putImageData(data, 0, 0);
          canvasContext.drawImage(tempCanvas, 0, 0);
        }
      }
    );
  }, [inputData]);

  return (
    <section className={'Result'}>
      <canvas ref={canvasRef} id={'result'} width={width} height={height}/>
    </section>
  );
};

export default Result;
