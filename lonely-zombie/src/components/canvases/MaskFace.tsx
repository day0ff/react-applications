import React, {forwardRef, useEffect, RefObject, useRef} from 'react';
import {IMaskFace} from '../../model/canvases/IMaskFace';
import {fillFace, pathFace} from '../../services/helpers';

const MaskFace: React.FC<IMaskFace> = ({width, height, name, inputData, outputData, positions}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefResult = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const canvasElementResult = (canvasRefResult as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContextResult = canvasElementResult.getContext('2d') as CanvasRenderingContext2D;

    inputData && canvasContext.putImageData(inputData, 0, 0);

    if (positions) {
      canvasContextResult.clearRect(0, 0, width, height);
      canvasContextResult.save();
      canvasContextResult.globalAlpha = 0.7;
      fillFace(positions, canvasContextResult);
      canvasContextResult.drawImage(canvasElement, 0, 0, width, height);
      canvasContextResult.restore();
    }

    const imageData = canvasContextResult.getImageData(0, 0, width, height);

    outputData && outputData(imageData);

  }, [inputData]);

  return (
    <>
      <p>MaskFace</p>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
      <canvas ref={canvasRefResult} id={name + '-result'} width={width} height={height}/>
    </>
  );
};

export default MaskFace;
