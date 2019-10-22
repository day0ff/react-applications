import React, {useRef, useEffect, RefObject} from 'react';
import {IResult} from '../../model/canvases/IResult';

declare global {
  interface Window {
    fx: any;
  }
}

const Result: React.FC<IResult> = ({width, height, name, inputData}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    inputData && canvasContext.putImageData(inputData, 0, 0);


    // const canvas = window.fx.canvas();
    // const texture = canvas.texture(canvasElement);
    // canvas.draw(texture)
    //   .denoise(50)
    //   .unsharpMask(20, 1)
    //   .hueSaturation(0.3, 0.5)
    //   .update();

  }, [inputData]);

  return (
    <>
      <p>Result</p>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
    </>
  );
};

export default Result;
