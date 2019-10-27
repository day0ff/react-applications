import React, {useRef, useEffect, RefObject} from 'react';
import {IMask} from '../../model/canvases/IMask';
import {rgba} from '../../services/helpers';

const Mask: React.FC<IMask> = ({width, height, inputData, outputData, mask, positions}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputData && positions) {
      const {background, areas} = mask;


      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

      canvasContext.clearRect(0, 0, width, height);
      canvasContext.putImageData(inputData, 0, 0);

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;

      const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

      tempContext.fillStyle = rgba(background);
      tempContext.fill();

      areas.forEach(area => {
        tempContext.save();
        tempContext.fillStyle = rgba(area.color);
        tempContext.beginPath();

        area.path(positions, tempContext);

        tempContext.closePath();
        tempContext.fill();

        tempContext.restore()
      });

      canvasContext.drawImage(tempCanvas, 0, 0, width, height);

      const imageData = canvasContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData);
    }
  }, [inputData]);

  return (
    <section>
      <p>Mask</p>
      <canvas ref={canvasRef} width={width} height={height}/>
    </section>
  );

};

export default Mask;
