import React, { useState, useRef, useEffect } from 'react';
import Photo from '../../components/canvases/Photo/Photo';
import { ICanvas } from '../../model/ICanvas';
import './Gallery.css';

export interface IGallery extends ICanvas<string[], string> {
}

const Gallery: React.FC<IGallery> = ({inputData, width, height, outputData}) => {

  return (
    <section className={'Gallery'}>
      {inputData && inputData!.map((imageData) =>
        <Photo key={imageData} inputData={imageData} width={width} height={height}
               outputData={outputData}/>)}
    </section>
  );
};

export default Gallery;
