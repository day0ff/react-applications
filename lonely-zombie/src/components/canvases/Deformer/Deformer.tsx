import React, {useRef, useEffect, RefObject} from 'react';
import './Deformer.css';
import {IDeformer} from '../../../model/canvases/IDeformer';

const deformer = window.fx.canvas();

const Deformer: React.FC<IDeformer> = ({width, height, inputData, outputData, positions, deformations}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputData && positions) {

      const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
      const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

      canvasContext.clearRect(0, 0, width, height);
      canvasContext.putImageData(inputData, 0, 0);

      deformations.forEach(deformation => {
        canvasContext.drawImage(deformation(deformer, canvasElement, positions), 0, 0, width, height);
      });

      const imageData = canvasContext.getImageData(0, 0, width, height);

      outputData && outputData(imageData);
    }
  }, [inputData]);

  return (
    <section className={'Deformer'}>
      <p>Deformer</p>
      <canvas ref={canvasRef} width={width} height={height}/>
    </section>
  );

};

export default Deformer;
