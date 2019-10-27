import React, {useRef, useEffect, RefObject} from 'react';
import {IGLFX} from '../../model/canvases/IGLFX';

const canvas = window.fx.canvas();

const GLFX: React.FC<IGLFX> = ({width, height, inputData, outputData, filter}) => {

  useEffect(() => {
    return () => {
      canvas.remove();
      console.log('GLFX will unmount.');
    }
  }, []);

  useEffect(() => {
    if (inputData) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

      tempContext.putImageData(inputData, 0, 0);

      tempContext.drawImage(filter(canvas, tempCanvas), 0, 0);

      const imageData = tempContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData)
    }
  }, [inputData]);

  return null;

};

export default GLFX;
