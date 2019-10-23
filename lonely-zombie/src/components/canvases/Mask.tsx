import React, { forwardRef, useEffect, RefObject, useRef } from 'react';
import { IMask } from '../../model/canvases/IMask';
import { fillFace } from '../../services/helpers';

const Mask: React.FC<IMask> = ({width, height, name, inputData, outputData, positions}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    inputData && tempContext.putImageData(inputData, 0, 0);

    if (positions) {
      canvasContext.clearRect(0, 0, width, height);
      canvasContext.save();
      // canvasContext.globalAlpha = 0.7;
      fillFace(positions, canvasContext);
      canvasContext.drawImage(tempCanvas, 0, 0, width, height);
      canvasContext.restore();
    }

    const imageData = canvasContext.getImageData(0, 0, width, height);
    outputData && outputData(imageData);

  }, [inputData]);

  return (
    <>
      <p>MaskFace</p>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
    </>
  );
};

export default Mask;
