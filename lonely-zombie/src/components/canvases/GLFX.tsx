import React, { useRef, useEffect, RefObject } from 'react';
import { IGLFX } from '../../model/canvases/IGLFX';

declare global {
  interface Window {
    fx: any;
  }
}

const canvas = window.fx.canvas();
const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
const texture = canvas.texture(canvasElement);

const GLFX: React.FC<IGLFX> = ({name, width, height, inputData, outputData}) => {
  useEffect(() => {
    if (inputData) {
      canvasContext.putImageData(inputData, 0, 0);

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

  return null;

};

export default GLFX;
