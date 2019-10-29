import React, { useState, useRef, useEffect, RefObject } from 'react';
import witch from '../../../images/witch2.jpg';

import { IFilter } from '../../../model/canvases/IGLFX';
import { IDeformer } from '../../../model/canvases/IDeformer';
import Deformer from '../../../components/canvases/Deformer/Deformer';
import { witchNose } from '../../../services/deformations/witch/witch-nose';
import { ICharacter } from '../../Article/Article';

const Witch: React.FC<ICharacter> = ({imgPath, backgroundFilter, width, height, inputData, positions, outputData}) => {
  const filter: IFilter = (canvas, tempCanvas) => {
    return canvas && canvas.draw(canvas.texture(tempCanvas))
      .denoise(50)
      .unsharpMask(20, 1)
      .hueSaturation(0.1, 0.5)
      .update();
  };

  useEffect(() => {
    imgPath(witch);
    backgroundFilter!(filter);
    return () => {
      console.log('Witch un mount.',);
    }
  }, []);

  const deformer: IDeformer = {
    inputData: inputData,
    outputData: (deformerData) => outputData(deformerData),
    width,
    height,
    positions: positions!,
    deformations: [witchNose]
  };

  return (
    <>
      <p>Witch</p>
      <Deformer {...deformer}/>
    </>
  );
};

export default Witch;
