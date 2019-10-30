import React, { useRef, useEffect, RefObject } from 'react';
import { ICanvas } from '../../../model/ICanvas';

export interface IPhoto extends ICanvas<ImageData, undefined> {
}

const Photo: React.FC<IPhoto> = ({width, height, inputData}) => {

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {

    const anhorElement = (anchorRef as RefObject<HTMLAnchorElement>).current as HTMLAnchorElement;
    const imageElement = (imageRef as RefObject<HTMLImageElement>).current as HTMLImageElement;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

    tempContext.putImageData(inputData!, 0, 0);

    const path = tempCanvas.toDataURL();

    anhorElement.href = path;
    imageElement.src = path;

  }, []);

  return (
    <div className={'Photo'}>
      <p>Photo</p>
      <a ref={anchorRef} title="click to download" download>
        <img ref={imageRef} width={width} height={height}/>
      </a>
    </div>
  );

};

export default Photo;
