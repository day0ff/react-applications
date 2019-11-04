import React, {useState, useRef, useEffect, RefObject} from 'react';
import gotham from '../../../images/gotham.png'

import {IFilter, IGLFX} from '../../../model/canvases/IGLFX';
import {IMakeup} from '../../../model/canvases/IMakeup';
import Makeup from '../../../components/canvases/Makeup/Makeup';
import GLFX from '../../../components/canvases/GLFX';
import {jpkerNose} from '../../../services/areas/joker/joker-nose';
import {jokerEyebrowsTriangle} from '../../../services/areas/joker/joker-eyebrows-triangle';
import {jokerEyebrows} from '../../../services/areas/joker/joker-eybrows';
import {jokerEyes} from '../../../services/areas/joker/joker-eyes';
import {jokerLips} from '../../../services/areas/joker/joker-lips';
import {jokerCircuit} from '../../../services/areas/joker/joker-circuit';
import {ICharacter} from '../../Article/Article';

const Joker: React.FC<ICharacter> = ({imgPath, width, height, inputVideo, inputBackground, positions, outputData}) => {
  const [glfxBackgroundData, setGlfxBackgroundData] = useState(inputBackground);
  const [maskData, setMaskData] = useState<ImageData>();

  const filter: IFilter = (canvas, tempCanvas) => {
    return canvas && canvas.draw(canvas.texture(tempCanvas))
      .denoise(50)
      .unsharpMask(20, 1)
      .brightnessContrast(-0.07, 0.21)
      .update();
  };

  useEffect(() => {
    imgPath(gotham);
    return () => {
      console.log('Joker un mount. ');
    }
  }, []);

  const glfxBackground: IGLFX = {
    inputData: inputBackground,
    outputData: (glfxData) => setGlfxBackgroundData(glfxData),
    width,
    height,
    filter
  };


  const makeup: IMakeup = {
    inputData: inputVideo,
    outputData: (maskData) => setMaskData(maskData),
    width,
    height,
    mask: {
      background: {r: 255, g: 255, b: 255, a: 1},
      areas: [
        {
          path: jokerCircuit,
          color: {r: 255, g: 255, b: 255, a: 0.15}
        },
        {
          path: jpkerNose,
          color: {r: 255, g: 0, b: 0, a: 0.4}
        },
        {
          path: jokerEyebrowsTriangle,
          color: {r: 0, g: 0, b: 255, a: 0.4}
        },
        {
          path: jokerEyebrows,
          color: {r: 255, g: 0, b: 0, a: 0.4}
        },
        {
          path: jokerEyes,
          color: {r: 0, g: 0, b: 255, a: 0.4}
        },
        {
          path: jokerLips,
          color: {r: 255, g: 0, b: 0, a: 0.4}
        }
      ]
    },
    positions
  };

  const glfxMask: IGLFX = {
    inputData: maskData,
    outputData: (glfxMaskData) => outputData([glfxBackgroundData, glfxMaskData]),
    width,
    height,
    filter: (canvas, tempCanvas) => {
      return canvas.draw(canvas.texture(tempCanvas))
        .triangleBlur(5)
        .denoise(50)
        .unsharpMask(20, 1)
        .update();
    }
  };

  return (
    <>
      <p>Joker</p>
      <GLFX {...glfxBackground}/>
      <Makeup {...makeup}/>
      <GLFX {...glfxMask}/>
    </>
  );
};

export default Joker;
