import React, { useState, useRef, useEffect } from 'react';
import Photo from '../../components/canvases/Photo/Photo';
import { ICanvas } from '../../model/ICanvas';

export interface IGallery extends ICanvas<ImageData[], undefined> {
}

const Gallery: React.FC<IGallery> = ({inputData, width, height}) => {
  useEffect(() => {
    console.log('Gallery ', inputData);
  }, [inputData]);

  return (
    <section className={'Gallery'}>
      {inputData && inputData!.map((imageData, index) => <Photo key={index} inputData={imageData} width={width}
                                                                height={height}/>)}
    </section>
  );
};

export default Gallery;
