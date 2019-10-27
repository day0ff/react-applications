import React, {useRef, useEffect, RefObject} from 'react';
import {IDeformer} from '../../model/canvases/IDeformer';

const deformer = window.fx.canvas();

const Deformer: React.FC<IDeformer> = ({name, width, height, inputData, outputData, positions}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasResultRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputData) {

      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

      canvasContext.putImageData(inputData, 0, 0);

      const canvasResultElement = (canvasResultRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasResultContext = canvasResultElement.getContext('2d') as CanvasRenderingContext2D;

      const {before, after} = positions;
      if (before) {
        canvasResultContext.clearRect(0, 0, width, height);
        canvasResultContext.drawImage(canvasElement, 0, 0, width, height);

        deformer.draw(deformer.texture(canvasElement))
          .bulgePinch(before[6][0], before[6][1], 20, 0.5)
          .bulgePinch(before[7][0], before[7][1], 20, 0.5)
          .bulgePinch(before[8][0], before[8][1], 20, 0.5)
          .bulgePinch(before[27][0], before[27][1], 18, 0.5)
          .bulgePinch(before[32][0], before[32][1], 18, 0.5)
          .bulgePinch(before[62][0], before[62][1], 18, 0.5)
          .update();

        canvasResultContext.drawImage(deformer, 0, 0, width, height);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;

        const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

        tempContext.clearRect(0, 0, width, height);
        tempContext.save();
        tempContext.beginPath();

        tempContext.moveTo(...before[2]);
        tempContext.lineTo(...before[3]);
        tempContext.lineTo(...before[4]);
        tempContext.lineTo(...before[5]);
        tempContext.lineTo(...before[6]);
        tempContext.lineTo(...before[7]);
        tempContext.lineTo(...before[8]);
        tempContext.lineTo(...before[9]);
        tempContext.lineTo(...before[10]);
        tempContext.lineTo(...before[11]);
        tempContext.lineTo(...before[12]);
        tempContext.lineTo(...before[46]);
        tempContext.lineTo(...before[48]);

        tempContext.closePath();
        tempContext.clip();

        tempContext.drawImage(canvasElement, 0, 0, width, height);
        tempContext.restore();

        const b = [...before[2], ...before[12], ...before[6], ...before[8]];
        const a = [...b];
        a[4] = a[4] - 10;
        a[6] = a[6] + 10;

        deformer.draw(deformer.texture(tempCanvas))
          .perspective(b, a)
          .update();

        canvasResultContext.drawImage(deformer, 0, 0, width, height);

      }


      const imageData = canvasResultContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData);
    }
  }, [inputData]);

  return (
    <>
      <p>Deformer</p>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
      <canvas ref={canvasResultRef} id={name + '-result'} width={width} height={height}/>
    </>
  );

};

export default Deformer;
