import React, { useRef, useEffect, RefObject } from 'react';
import { IDeformer } from '../../model/canvases/IDeformer';

const Deformer: React.FC<IDeformer> = ({name, width, height, inputData, outputData, positions}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputData) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;

      const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

      tempContext.putImageData(inputData, 0, 0);

      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

      // fd.init(canvasElement);
      // if (positions) {
      //   fd.load(tempCanvas, positions, window.pModel);
      //   fd.draw(positions);
      // }

      const imageData = canvasContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData);
    }
  }, [inputData]);

  return (
    <>
      <p>Deformer</p>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
    </>
  );

};

export default Deformer;
