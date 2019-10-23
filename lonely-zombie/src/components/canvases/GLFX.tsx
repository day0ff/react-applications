import React, { useRef, useEffect, RefObject } from 'react';
import { IGLFX } from '../../model/canvases/IGLFX';

declare global {
  interface Window {
    fx: any;
  }
}

const canvas = window.fx.canvas();

const GLFX: React.FC<IGLFX> = ({name, width, height, inputData, outputData}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputData) {
      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
      canvasContext.putImageData(inputData, 0, 0);

      const texture = canvas.texture(canvasElement);
      canvas.draw(texture)
        .denoise(50)
        .unsharpMask(20, 1)
        .hueSaturation(0.3, 0.5)
        .update();

      canvasContext.drawImage(canvas, 0, 0);

      const imageData = canvasContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData)
    }
  }, [inputData]);

  return <canvas ref={canvasRef} id={name} width={width} height={height}/>

};

export default GLFX;
