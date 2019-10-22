import React, { useState, useRef, useEffect } from 'react';
import Filters from '../Filters/Filters';
import Gallery from '../Gallery/Gallery';
import { config } from '../../config';

import graveyard from '../../images/graveyard.jpg';
import Background from '../../components/canvases/Background';
import { IBackground } from '../../model/canvases/IBackground';
import Video from '../../components/canvases/Video';
import { IVideo, IPosition } from '../../model/canvases/IVideo';
import Result from '../../components/canvases/Result';
import { IResult } from '../../model/canvases/IResult';
import MaskFace from '../../components/canvases/MaskFace';
import { IMaskFace } from '../../model/canvases/IMaskFace';
import Image from '../../components/canvases/Image';
import { IImage } from '../../model/canvases/IImage';
import picture from '../../images/magnus.png'
import ColorPicker, { Color, IColorPicker } from '../ColorPicker/ColorPicker';

const {width, height, autoPlay, color, range} = config;

const App: React.FC = () => {

  const [imageVideoData, setImageVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [imageBackgroundData, setBackgroundData] = useState<ImageData>();
  const [maskFaceData, setMaskFaceData] = useState<ImageData>();
  const [colorData, setColorData] = useState<Color>(color);

  const video: IVideo = {
    name: 'video',
    outputData: ({imageData, positions}) => {
      setImageVideoData(imageData);
      setPositionsData(positions);
    },
    width,
    height,
    autoPlay
  };

  const image: IImage = {
    name: 'image',
    outputData: ({imageData, positions}) => {
      setImageVideoData(imageData);
      setPositionsData(positions);
    },
    width,
    height,
    src: picture
  };

  const background: IBackground = {
    name: 'background',
    img: {path: graveyard},
    inputData: imageVideoData,
    outputData: (data) => setBackgroundData(data),
    width,
    height,
    color: colorData,
    range
  };

  const maskFace: IMaskFace = {
    name: 'mask-face',
    inputData: imageVideoData,
    outputData: (data) => setMaskFaceData(data),
    positions: positionsData,
    width,
    height
  };

  const result: IResult = {
    name: 'result',
    inputData: maskFaceData,
    width,
    height
  };

  const colorPicker: IColorPicker = {
    name: 'color-picker',
    inputData: imageVideoData,
    outputData: (color: Color) => setColorData(color),
    width,
    height,
    color
  };

  return (
    <>
      <header>
        Header
      </header>
      <section>
        {/*<Video {...video}/>*/}
        <Image {...image}/>
      </section>
      {/*<section>*/}
      <Background {...background}/>
      {/*</section>*/}
      {/*<section>*/}
      {/*<MaskFace {...maskFace}/>*/}
      {/*</section>*/}
      <section>
        {/*<Result {...result}/>*/}
        <ColorPicker {...colorPicker}/>
      </section>
      <Filters/>
      <Gallery/>
      <footer>
        Footer
      </footer>
    </>
  );
};

export default App;
