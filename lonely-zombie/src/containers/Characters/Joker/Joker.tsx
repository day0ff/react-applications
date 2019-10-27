import React, {useState, useRef, useEffect, RefObject} from 'react';
import config from '../../../config.json';
import graveyard from '../../../images/graveyard.jpg';

import {IGLFX} from '../../../model/canvases/IGLFX';
import {IBackground} from '../../../model/canvases/IBackground';
import {IResult} from '../../../model/canvases/IResult';
import {IMask} from '../../../model/canvases/IMask';
import {IPosition, IVideo} from '../../../model/canvases/IVideo';
import {Color, default as ColorPicker, IColorPicker} from '../../../components/canvases/ColorPicker/ColorPicker';
import {IFaceCircuit} from '../../../model/canvases/IFaceCircuit';
import Video from '../../../components/Video/Video';
import FaceCircuit from '../../../components/canvases/FaceCircuit/FaceCircuit';
import Mask from '../../../components/canvases/Mask/Mask';
import GLFX from '../../../components/canvases/GLFX';
import Background from '../../../components/canvases/Background/Background';
import Result from '../../../components/canvases/Result';
import {jpkerNose} from '../../../services/areas/joker/joker-nose';
import {jokerEyebrowsTriangle} from '../../../services/areas/joker/joker-eyebrows-triangle';
import {jokerEyebrows} from '../../../services/areas/joker/joker-eybrows';
import {jokerEyes} from '../../../services/areas/joker/joker-eyes';
import {jokerLips} from '../../../services/areas/joker/joker-lips';
import {jokerCircuit} from '../../../services/areas/joker/joker-circuit';

const {width, height, autoPlay, color, tolerance} = config;

const Joker: React.FC = () => {
  let _isMounted = true;

  const [videoData, setVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [backgroundData, setBackgroundData] = useState<ImageData>();
  const [glfxBackgroundData, setGlfxBackgroundData] = useState<ImageData>();

  const [faceCircuitData, setFaceCircuitData] = useState<ImageData>();
  const [colorData, setColorData] = useState<Color>(color);
  const [toleranceData, setToleranceData] = useState<number>(tolerance);

  const [maskData, setMaskData] = useState<ImageData>();
  const [glfxMaskData, setGlfxMaskData] = useState<ImageData>();

  useEffect(() => {
    return () => {
      _isMounted = false;
      console.log('Witch unmount. ', _isMounted);
    }
  }, []);

  const video: IVideo = {
    outputData: ({videoData, positions}) => {
      _isMounted && setVideoData(videoData);
      _isMounted && setPositionsData(positions);
    },
    width,
    height,
    autoPlay
  };

  const colorPicker: IColorPicker = {
    inputData: videoData,
    outputData: (color: Color) => _isMounted && setColorData(color),
    width,
    height,
    color
  };

  const background: IBackground = {
    img: {path: graveyard},
    inputData: videoData,
    outputData: (backgroundData) => _isMounted && setBackgroundData(backgroundData),
    width,
    height,
    color: colorData,
    tolerance: toleranceData
  };

  const glfxBackground: IGLFX = {
    inputData: backgroundData,
    outputData: (glfxData) => _isMounted && setGlfxBackgroundData(glfxData),
    width,
    height,
    filter: (canvas, tempCanvas) => {
      return canvas.draw(canvas.texture(tempCanvas))
        .denoise(50)
        .unsharpMask(20, 1)
        .update();
    }
  };

  const faceCircuit: IFaceCircuit = {
    inputData: videoData,
    outputData: (faceCircuitData) => _isMounted && setFaceCircuitData(faceCircuitData),
    positions: positionsData,
    width,
    height
  };

  const mask: IMask = {
    inputData: faceCircuitData,
    outputData: (maskData) => _isMounted && setMaskData(maskData),
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
    positions: positionsData!
  };

  const glfxMask: IGLFX = {
    inputData: maskData,
    outputData: (glfxMaskData) => _isMounted && setGlfxMaskData(glfxMaskData),
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

  const result: IResult = {
    inputData: [glfxBackgroundData!, glfxMaskData!],
    width,
    height
  };

  return (
    <>
      <p>Joker</p>
      <Video {...video}/>
      <ColorPicker {...colorPicker}/>
      <FaceCircuit {...faceCircuit}/>
      <Mask {...mask}/>
      <GLFX {...glfxMask}/>
      <Background {...background}/>
      <GLFX {...glfxBackground}/>
      <Result {...result}/>
    </>
  );
};

export default Joker;
