import React, { useState, useRef, useEffect } from 'react';
import config from '../../config.json';

import graveyard from '../../images/graveyard.jpg';
import Background from '../../components/canvases/Background';
import { IBackground } from '../../model/canvases/IBackground';
import { IVideo, IPosition } from '../../model/canvases/IVideo';
import Result from '../../components/canvases/Result';
import { IResult } from '../../model/canvases/IResult';
import MaskFace from '../../components/canvases/Mask';
import { IMask } from '../../model/canvases/IMask';
import Image from '../../components/canvases/Image';
import { IImage } from '../../model/canvases/IImage';
import picture from '../../images/magnus.png'
import ColorPicker, { Color, IColorPicker } from '../ColorPicker/ColorPicker';
import GLFX from '../../components/canvases/GLFX';
import { IGLFX } from '../../model/canvases/IGLFX';
import Video from '../../components/canvases/Video';
import Deformer from '../../components/canvases/Deformer';
import { IDeformer } from '../../model/canvases/IDeformer';

const {width, height, autoPlay, color, tolerance} = config;

const canvas = window.fx.canvas();

const App: React.FC = () => {

  const [videoData, setVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [backgroundData, setBackgroundData] = useState<ImageData>();
  const [glfxBackgroundData, setGlfxBackgroundData] = useState<ImageData>();

  const [maskFaceData, setMaskFaceData] = useState<ImageData>();
  const [glfxMaskData, setGlfxMaskData] = useState<ImageData>();
  const [colorData, setColorData] = useState<Color>(color);
  const [toleranceData, setToleranceData] = useState<number>(tolerance);
  const [deformerData, setDeformerData] = useState<ImageData>();

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
    filter: (tempCanvas: HTMLCanvasElement) => {
      return canvas.draw(canvas.texture(tempCanvas))
        .denoise(50)
        .unsharpMask(20, 1)
        // .hueSaturation(0.5, 0.3)
        .update();
    }
  };

  const mask: IMask = {
    name: 'mask-face',
    inputData: videoData,
    outputData: (maskData) => setMaskFaceData(maskData),
    positions: positionsData,
    width,
    height
  };

  const glfxMask: IGLFX = {
    name: 'glfx',
    inputData: maskFaceData,
    outputData: (glfxData) => setGlfxMaskData(glfxData),
    width,
    height,
    filter: (tempCanvas: HTMLCanvasElement) => {
      return canvas.draw(canvas.texture(tempCanvas))
        .denoise(50)
        .unsharpMask(20, 1)
        .hueSaturation(0.5, 0.3)
        .update();
    }
  };

  const deformer: IDeformer = {
    name: 'deformer',
    inputData: videoData,
    outputData: (deformerData) => setDeformerData(deformerData),
    width,
    height,
    positions: positionsData
  };

  const result: IResult = {
    name: 'result',
    inputData: [glfxBackgroundData as ImageData, glfxMaskData as ImageData],
    width,
    height
  };

  return (
    <>
      <section>
        {/*<Video {...video}/>*/}
        <Image {...image}/>
      </section>
      <section>
        <Result {...result}/>
      </section>
      <section>
        <ColorPicker {...colorPicker}/>
      </section>
      <section>
        <Background {...background}/>
        <GLFX {...glfxBackground}/>
      </section>
      <section>
        <MaskFace {...mask}/>
        <GLFX {...glfxMask}/>
      </section>
      <section>
        <Deformer {...deformer}/>
      </section>
    </>
  );
};

export default App;
