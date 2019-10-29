import React, { useState, useRef, useEffect, RefObject } from 'react';
import zombie from '../../../images/graveyard.jpg';

import { IDeformer } from '../../../model/canvases/IDeformer';
import Deformer from '../../../components/canvases/Deformer/Deformer';
import { zombieChin } from '../../../services/deformations/zombie/zombie-chin';
import { zombieEyes } from '../../../services/deformations/zombie/zombie-eyes';
import { ICharacter } from '../../Article/Article';
import { IFilter } from '../../../model/canvases/IGLFX';

const filter: IFilter = (canvas, tempCanvas) => {
  console.log(canvas);
  return canvas && canvas.draw(canvas.texture(tempCanvas))
    .denoise(50)
    .unsharpMask(20, 1)
    .hueSaturation(0.1, 0.5)
    .update();
};

const Zombie: React.FC<ICharacter> = ({imgPath, backgroundFilter, width, height, inputData, positions, outputData}) => {

  useEffect(() => {
    imgPath(zombie);
    backgroundFilter!(filter);
    return () => {
      console.log('Zombie un mount.');
    }
  }, []);

  const deformer: IDeformer = {
    inputData: inputData,
    outputData: (deformerData) => outputData(deformerData),
    width,
    height,
    positions: positions!,
    deformations: [zombieEyes, zombieChin]
  };

  return (
    <>
      <p>Zombie</p>
      <Deformer {...deformer}/>
    </>
  );
};

export default Zombie;
