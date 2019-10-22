import React, {useState, useRef, useEffect} from 'react';
import Filters from '../Filters/Filters';
import Gallery from '../Gallery/Gallery';
import {config} from '../../config';

import graveyard from '../../images/abstr.jpg';
import Background from '../../components/canvases/Background';
import {IBackground} from '../../model/canvases/IBackground';
import Video from '../../components/canvases/Video';
import {IVideo, IPosition} from '../../model/canvases/IVideo';
import Result from '../../components/canvases/Result';
import {IResult} from '../../model/canvases/IResult';
import MaskFace from '../../components/canvases/MaskFace';
import {IMaskFace} from '../../model/canvases/IMaskFace';
import Image from '../../components/canvases/Image';
import {IImage} from '../../model/canvases/IImage';
import picture from '../../images/magnus.png'
import ColorPicker, {Color, IColorPicker} from '../ColorPicker/ColorPicker';

const {width, height, autoPlay, color, range} = config;

const App: React.FC = () => {

  const [videoData, setVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [backgroundData, setBackgroundData] = useState<ImageData>();
  const [maskFaceData, setMaskFaceData] = useState<ImageData>();
  const [colorData, setColorData] = useState<Color>(color);

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
    range
  };

  const maskFace: IMaskFace = {
    name: 'mask-face',
    inputData: videoData,
    outputData: (maskData) => setMaskFaceData(maskData),
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

  return (
    <>
      <header>
        Header
      </header>
      <section>
        <Video {...video}/>
        {/*<Image {...image}/>*/}
      </section>
      <section>
        <ColorPicker {...colorPicker}/>
      </section>
      <section>
        <Background {...background}/>
      </section>
      <section>
        <MaskFace {...maskFace}/>
      </section>
      <section>
        <Result {...result}/>
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
