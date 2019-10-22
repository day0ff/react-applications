import React, { forwardRef, useEffect, RefObject, useRef } from 'react';
import { IBackground } from '../../model/canvases/IBackground';
import { config } from '../../config';

const {spread} = config;

const Background: React.FC<IBackground> = ({width, height, img, name, inputData, outputData, color}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefResult = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const imageElement = (imageRef as RefObject<HTMLImageElement>).current as HTMLImageElement;
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const canvasElementResult = (canvasRefResult as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContextResult = canvasElementResult.getContext('2d') as CanvasRenderingContext2D;

    canvasContextResult.drawImage(imageElement, 0, 0, width, height);

    if (inputData) {
      let frame = inputData;
      let l = frame.data.length / 4;

      for (let i = 0; i<l; i++) {
        let r = frame.data[i * 4];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if ((color.r + spread)>=r && r>=(color.r - spread))
          if ((color.g + spread)>=g && g>=(color.g - spread))
            if ((color.b + spread)>=b && b>=(color.b - spread))
              frame.data[i * 4 + 3] = 0;
      }
      canvasContext.putImageData(frame, 0, 0);
      canvasContextResult.drawImage(canvasElement, 0, 0, width, height)
    }

    const imageData = canvasContextResult.getImageData(0, 0, width, height);

    outputData && outputData(imageData);

  }, [inputData]);

  return (
    <>
      <p>Background</p>
      <img ref={imageRef} id={name + '-image'} src={img.path} width={width} height={height}/>
      <canvas ref={canvasRef} id={name} width={width} height={height}/>
      <canvas ref={canvasRefResult} id={name + '-result'} width={width} height={height}/>
    </>
  );
};

export default Background;
