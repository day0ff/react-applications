import React, {useRef, useEffect, RefObject} from 'react';
import {IGLFX} from '../../model/canvases/IGLFX';

declare global {
  interface Window {
    fx: any;
  }
}

const canvas = window.fx.canvas();


const GLFX: React.FC<IGLFX> = ({name, width, height, inputData, outputData}) => {
  useEffect(() => {
    if (inputData) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

      tempContext.putImageData(inputData, 0, 0);

      const texture = canvas.texture(tempCanvas);

      canvas.draw(texture)
        .denoise(50)
        .unsharpMask(20, 1)
        .hueSaturation(0.3, 0.5)
        .update();

      tempContext.drawImage(canvas, 0, 0);

      const imageData = tempContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData)
    }
  }, [inputData]);

  return null;

};

export default GLFX;
