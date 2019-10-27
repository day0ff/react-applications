import React, {useState, useRef, useEffect} from 'react';
import config from '../../config.json';

import graveyard from '../../images/graveyard.jpg';
import Background from '../../components/canvases/Background';
import {IBackground} from '../../model/canvases/IBackground';
import {IVideo, IPosition} from '../../model/canvases/IVideo';
import Result from '../../components/canvases/Result';
import {IResult} from '../../model/canvases/IResult';
import FaceCircuit from '../../components/canvases/FaceCircuit';
import {IFaceCircuit} from '../../model/canvases/IFaceCircuit';
import Image from '../../components/canvases/Image';
import {IImage} from '../../model/canvases/IImage';
import picture from '../../images/magnus.png'
import ColorPicker, {Color, IColorPicker} from '../ColorPicker/ColorPicker';
import GLFX from '../../components/canvases/GLFX';
import {IGLFX} from '../../model/canvases/IGLFX';
import Video from '../../components/canvases/Video';
import Deformer from '../../components/canvases/Deformer';
import {IDeformer} from '../../model/canvases/IDeformer';
import Mask from '../../components/canvases/Mask';
import {IMask} from '../../model/canvases/IMask';
import {eyePath} from '../../services/areas/eye';
import {nose} from '../../services/deformations/nose';
import {chin} from '../../services/deformations/chin';

const {width, height, autoPlay, color, tolerance} = config;

const App: React.FC = () => {

  const [videoData, setVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [backgroundData, setBackgroundData] = useState<ImageData>();
  const [glfxBackgroundData, setGlfxBackgroundData] = useState<ImageData>();

  const [faceCircuitData, setFaceCircuitData] = useState<ImageData>();
  const [colorData, setColorData] = useState<Color>(color);
  const [toleranceData, setToleranceData] = useState<number>(tolerance);
  const [deformerData, setDeformerData] = useState<ImageData>();
  const [maskData, setMaskData] = useState<ImageData>();
  const [glfxMaskData, setGlfxMaskData] = useState<ImageData>();

  const video: IVideo = {
    name: 'video',
    outputData: ({videoData, positions}) => {
      setVideoData(videoData);
      setPositionsData(positions);
    },
    width,
    height,
    autoPlay
  };

  const image: IImage = {
    name: 'image',
    outputData: ({videoData, positions}) => {
      setVideoData(videoData);
      setPositionsData(positions);
    },
    width,
    height,
    src: picture
  };

  const colorPicker: IColorPicker = {
    name: 'color-picker',
    inputData: videoData,
    outputData: (color: Color) => setColorData(color),
    width,
    height,
    color
  };

  const background: IBackground = {
    name: 'background',
    img: {path: graveyard},
    inputData: videoData,
    outputData: (backgroundData) => setBackgroundData(backgroundData),
    width,
    height,
    color: colorData,
    tolerance: toleranceData
  };

  const glfxBackground: IGLFX = {
    name: 'glfxBackground',
    inputData: backgroundData,
    outputData: (glfxData) => setGlfxBackgroundData(glfxData),
    width,
    height,
    filter: (canvas, tempCanvas) => {
      return canvas.draw(canvas.texture(tempCanvas))
        .denoise(50)
        .unsharpMask(20, 1)
        // .hueSaturation(0.5, 0.3)
        .update();
    }
  };

  const faceCircuit: IFaceCircuit = {
    name: 'face-circuit',
    inputData: videoData,
    outputData: (faceCircuitData) => setFaceCircuitData(faceCircuitData),
    positions: positionsData,
    width,
    height
  };

  const mask: IMask = {
    name: 'mask',
    inputData: faceCircuitData,
    outputData: (maskData) => setMaskData(maskData),
    width,
    height,
    mask: {
      background: {r: 100, g: 100, b: 100, a: 1},
      areas: [
        {
          path: eyePath,
          color: {r: 255, g: 0, b: 0, a: 0.7}
        }
      ]
    },
    positions: positionsData!
  };

  const glfxMask: IGLFX = {
    name: 'glfx-mask',
    inputData: maskData,
    outputData: (glfxMaskData) => setGlfxMaskData(glfxMaskData),
    width,
    height,
    filter: (canvas, tempCanvas) => {
      return canvas.draw(canvas.texture(tempCanvas))
        .denoise(50)
        .unsharpMask(20, 1)
        .hueSaturation(0.5, 0.3)
        .update();
    }
  };

  const deformer: IDeformer = {
    name: 'deformer',
    inputData: glfxMaskData,
    outputData: (deformerData) => setDeformerData(deformerData),
    width,
    height,
    positions: positionsData!,
    deformations: [nose, chin]
  };

  const result: IResult = {
    name: 'result',
    inputData: [glfxBackgroundData as ImageData, deformerData as ImageData],
    width,
    height
  };

  return (
    <>
      <section>
        <Video {...video}/>
        {/*<Image {...image}/>*/}
      </section>
      <section>
        <ColorPicker {...colorPicker}/>
      </section>
      <section>
        <FaceCircuit {...faceCircuit}/>
      </section>
      <section>
        <Mask {...mask}/>
        <GLFX {...glfxMask}/>
      </section>
      <section>
        <Deformer {...deformer}/>
      </section>
      <section>
        <Background {...background}/>
        <GLFX {...glfxBackground}/>
      </section>
      <section>
        <Result {...result}/>
      </section>

    </>
  );
};

export default App;
