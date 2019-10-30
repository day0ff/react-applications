import React, { useRef, useEffect, RefObject } from 'react';
import { ICanvas } from '../../../model/ICanvas';

export interface IPhoto extends ICanvas<string, string> {
}

const Photo: React.FC<IPhoto> = ({width, height, inputData, outputData}) => {

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const anhorElement = (anchorRef as RefObject<HTMLAnchorElement>).current as HTMLAnchorElement;
    const imageElement = (imageRef as RefObject<HTMLImageElement>).current as HTMLImageElement;
    anhorElement.href = inputData!;
    imageElement.src = inputData!;
  }, []);

  const removePhoto = () => {
    outputData!(inputData!);
  };

  return (
    <div className={'Photo'}>
      <h1><a ref={anchorRef} title="click to download" download>Click to Download</a></h1>
      <img ref={imageRef} title="click to remove photo" width={width} height={height} onClick={removePhoto}/>
    </div>
  );

};

export default Photo;
