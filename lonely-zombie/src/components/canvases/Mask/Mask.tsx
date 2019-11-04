import React, {useRef, useEffect, RefObject} from 'react';
import './Mask.css';
import {IMask} from '../../../model/canvases/IMask';
import {angle} from '../../../services/helpers';

const Mask: React.FC<IMask> = ({width, height, inputData, outputData, mask, positions}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputData && positions && mask.source) {
      const corner = angle(positions);

      const {areas, source, translate, destination} = mask;

      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

      canvasContext.clearRect(0, 0, width, height);

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;

      const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
      tempContext.beginPath();

      areas.forEach(area => {
        area.path(positions, tempContext);
        tempContext.stroke();
      });

      tempContext.closePath();
      tempContext.clip();
      tempContext.translate(...positions[translate]);

      tempContext.rotate(corner);

      const widthRect = Math.sqrt(Math.pow(positions[destination.left][0] - positions[destination.right][0], 2)
        + Math.pow(positions[destination.left][1] - positions[destination.right][1], 2));

      tempContext.drawImage(source, 0, 0 - widthRect / 2, widthRect, widthRect);

      tempContext.rotate(-corner);

      canvasContext.drawImage(tempCanvas, 0, 0, width, height);

      const imageData = canvasContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData);
    }
  }, [inputData]);

  return (
    <section className={'Mask'}>
      <p>Mask</p>
      <canvas ref={canvasRef} width={width} height={height}/>
    </section>
  );

};

export default Mask;
