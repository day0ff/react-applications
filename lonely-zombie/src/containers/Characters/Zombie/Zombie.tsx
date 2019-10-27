import React, {useState, useRef, useEffect} from 'react';
import config from '../../../config.json';
import graveyard from '../../../images/graveyard.jpg';

import {IGLFX} from '../../../model/canvases/IGLFX';
import {IBackground} from '../../../model/canvases/IBackground';
import {IDeformer} from '../../../model/canvases/IDeformer';
import {IResult} from '../../../model/canvases/IResult';
import {IMask} from '../../../model/canvases/IMask';
import {IPosition, IVideo} from '../../../model/canvases/IVideo';
import {Color, default as ColorPicker, IColorPicker} from '../../../components/canvases/ColorPicker/ColorPicker';
import {IFaceCircuit} from '../../../model/canvases/IFaceCircuit';
import {eyePath} from '../../../services/areas/eye';
import Video from '../../../components/Video/Video';
import FaceCircuit from '../../../components/canvases/FaceCircuit/FaceCircuit';
import Mask from '../../../components/canvases/Mask';
import GLFX from '../../../components/canvases/GLFX';
import Deformer from '../../../components/canvases/Deformer/Deformer';
import Background from '../../../components/canvases/Background/Background';
import Result from '../../../components/canvases/Result';
import {zombieChin} from '../../../services/deformations/zombie/zombie-chin';
import {zombieEyes} from '../../../services/deformations/zombie/zombie-eyes';

const {width, height, autoPlay, color, tolerance} = config;

const Zombie: React.FC = () => {
  let _isMounted = true;

  const [videoData, setVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [backgroundData, setBackgroundData] = useState<ImageData>();
  const [glfxBackgroundData, setGlfxBackgroundData] = useState<ImageData>();

  const [faceCircuitData, setFaceCircuitData] = useState<ImageData>();
  const [colorData, setColorData] = useState<Color>(color);
  const [toleranceData, setToleranceData] = useState<number>(tolerance);
  const [deformerData, setDeformerData] = useState<ImageData>();

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

  const deformer: IDeformer = {
    inputData: faceCircuitData,
    outputData: (deformerData) => _isMounted && setDeformerData(deformerData),
    width,
    height,
    positions: positionsData!,
    deformations: [zombieEyes, zombieChin]
  };

  const result: IResult = {
    inputData: [glfxBackgroundData as ImageData, deformerData as ImageData],
    width,
    height
  };

  return (
    <>
      <p>Witch</p>
      <Video {...video}/>
      <ColorPicker {...colorPicker}/>
      <FaceCircuit {...faceCircuit}/>
      <Deformer {...deformer}/>
      <Background {...background}/>
      <GLFX {...glfxBackground}/>
      <Result {...result}/>
    </>
  );
};

export default Zombie;
