import React, {useState, useRef, useEffect, RefObject} from 'react';
import witch from '../../../images/witch2.jpg';

import {IFilter, IGLFX} from '../../../model/canvases/IGLFX';
import {IDeformer} from '../../../model/canvases/IDeformer';
import Deformer from '../../../components/canvases/Deformer/Deformer';
import {witchNose} from '../../../services/deformations/witch/witch-nose';
import {ICharacter} from '../../Article/Article';
import GLFX from '../../../components/canvases/GLFX';

const Witch: React.FC<ICharacter> = ({imgPath, width, height, inputVideo, inputBackground, positions, outputData}) => {
  const [glfxBackgroundData, setGlfxBackgroundData] = useState(inputBackground);

  const filter: IFilter = (canvas, tempCanvas) => {
    return canvas && canvas.draw(canvas.texture(tempCanvas))
      .denoise(50)
      .unsharpMask(20, 1)
      .hueSaturation(0.1, 0.5)
      .update();
  };

  useEffect(() => {
    imgPath(witch);
    return () => {
      console.log('Witch un mount.',);
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
    deformations: [witchNose]
  };

  return (
    <>
      <p>Witch</p>
      <GLFX {...glfxBackground}/>
      <Deformer {...deformer}/>
    </>
  );
};

export default Witch;
