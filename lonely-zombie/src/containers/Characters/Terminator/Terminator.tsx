import React, {useState, useRef, useEffect, RefObject} from 'react';
import terminator from '../../../images/terminator.png'
import eye from '../../../images/terminator-eye.png'

import {IFilter, IGLFX} from '../../../model/canvases/IGLFX';
import GLFX from '../../../components/canvases/GLFX';
import {ICharacter} from '../../Article/Article';
import {terminatorEye} from '../../../services/areas/terminator/terminator-eye';
import {IMask} from '../../../model/canvases/IMask';
import Mask from '../../../components/canvases/Mask/Mask';

const Terminator: React.FC<ICharacter> = ({imgPath, width, height, inputVideo, inputBackground, positions, outputData}) => {
  const imgRef = useRef<HTMLImageElement>(null);

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
    imgPath(terminator);
    return () => {
      console.log('Terminator un mount. ');
    }
  }, []);

  const glfxBackground: IGLFX = {
    inputData: inputBackground,
    outputData: (glfxData) => setGlfxBackgroundData(glfxData),
    width,
    height,
    filter
  };


  const mask: IMask = {
    inputData: inputVideo,
    outputData: (maskData) => setMaskData(maskData),
    width,
    height,
    mask: {
      source: imgRef.current!,
      translate: 23,
      destination: {left: 23, right: 25},
      areas: [
        {
          path: terminatorEye,
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
      <p>Terminator</p>
      <img src={eye} ref={imgRef} width={190} height={190} style={{display: 'none'}}/>
      <GLFX {...glfxBackground}/>
      <Mask {...mask}/>
      <GLFX {...glfxMask}/>
    </>
  );
};

export default Terminator;
