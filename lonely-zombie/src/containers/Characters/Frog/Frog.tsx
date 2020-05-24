import React, {useState, useRef, useEffect, RefObject} from 'react';
import zombie from '../../../images/graveyard.jpg';

import {IDeformer} from '../../../model/canvases/IDeformer';
import Deformer from '../../../components/canvases/Deformer/Deformer';
import {zombieChin} from '../../../services/deformations/zombie/zombie-chin';
import {zombieEyes} from '../../../services/deformations/zombie/zombie-eyes';
import {ICharacter} from '../../Article/Article';
import {IFilter, IGLFX} from '../../../model/canvases/IGLFX';
import GLFX from '../../../components/canvases/GLFX';

const Frog: React.FC<ICharacter> = ({imgPath, width, height, inputVideo, inputBackground, positions, outputData}) => {
  const [glfxBackgroundData, setGlfxBackgroundData] = useState(inputBackground);

  const filter: IFilter = (canvas, tempCanvas) => {
    return canvas && canvas.draw(canvas.texture(tempCanvas))
      .denoise(50)
      .unsharpMask(20, 1)
      .hueSaturation(0.4, -0.3)
      .update();
  };

  useEffect(() => {
    imgPath(zombie);
    return () => {
      console.log('Zombie un mount.');
    }
  }, []);

  const glfxBackground: IGLFX = {
    inputData: inputBackground,
    outputData: (glfxData) => setGlfxBackgroundData(glfxData),
    width,
    height,
    filter
  };

  const deformer: IDeformer = {
    inputData: inputVideo,
    outputData: (deformerData) => outputData([glfxBackgroundData, deformerData]),
    width,
    height,
    positions: positions!,
    deformations: [zombieEyes, zombieChin]
  };

  return (
    <>
      <p>Zombie</p>
      <GLFX {...glfxBackground}/>
      <Deformer {...deformer}/>
    </>
  );
};

export default Frog;
