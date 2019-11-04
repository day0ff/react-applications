import React, {ReactElement, useState, useEffect} from 'react';
import config from '../../config.json';
import picture from '../../images/magnus.png'

import './Article.css';
import Witch from '../Characters/Witch/Witch';
import Zombie from '../Characters/Zombie/Zombie';
import Joker from '../Characters/Joker/Joker';
import Character from '../../components/Character/Character';
import {IPosition, IVideo, IVideoData} from '../../model/canvases/IVideo';
import {Color, default as ColorPicker, IColorPicker} from '../../components/canvases/ColorPicker/ColorPicker';
import {IImage} from '../../model/canvases/IImage';
import Video from '../../components/Video/Video';
import {IBackground} from '../../model/canvases/IBackground';
import {IFaceCircuit} from '../../model/canvases/IFaceCircuit';
import FaceCircuit from '../../components/canvases/FaceCircuit/FaceCircuit';
import Result from '../../components/canvases/Result';
import {IResult} from '../../model/canvases/IResult';
import Background from '../../components/canvases/Background/Background';
import {IDimensions} from '../../model/IDimensions';
import Gallery, {IGallery} from '../Gallery/Gallery';
import Terminator from '../Characters/Terminator/Terminator';

export interface IArticle {
}

export interface ICharacter extends IDimensions {
  imgPath: (imgPath: string) => void;
  inputVideo: ImageData;
  inputBackground: ImageData;
  positions: IPosition[];
  outputData: (outputData: ImageData[]) => void;
}

const {width, height, autoPlay, color, tolerance, character: hero} = config;

const ZOMBIE = 'ZOMBIE', WITCH = 'WITCH', JOKER = 'JOKER', TERMINATOR = 'TERMINATOR', DEFAULT = 'DEFAULT';

const Article: React.FC<IArticle> = () => {
  const CHARACTERS = [ZOMBIE, WITCH, JOKER, TERMINATOR];

  const [isChromaKeyShown, setIsChromaKeyShown] = useState(false);
  const [isGridMaskShown, setIsGridMaskShown] = useState(false);

  const hideShowChromaKey = () => {
    setIsGridMaskShown(false);
    setIsChromaKeyShown(!isChromaKeyShown);
  };

  const hideShowGridMask = () => {
    setIsChromaKeyShown(false);
    setIsGridMaskShown(!isGridMaskShown);
  };

  const hideAll = () => {
    setIsChromaKeyShown(false);
    setIsGridMaskShown(false);
  };

  const [currentCharacter, setCurrentCharacter] = useState<string>(hero);

  const [videoData, setVideoData] = useState<ImageData>();
  const [positionsData, setPositionsData] = useState<IPosition[]>();

  const [faceCircuitData, setFaceCircuitData] = useState<ImageData>();

  const [colorData, setColorData] = useState<Color>(color);
  const [toleranceData, setToleranceData] = useState<number>(tolerance);

  const [backgroundData, setBackgroundData] = useState<ImageData>();
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const [characterData, setCharacterData] = useState<ImageData[]>();

  const [images, setImages] = useState<string[]>([]);

  const video: IVideo = {
    outputData: ({videoData, positions}) => {
      setVideoData(videoData);
      setPositionsData(positions);
    },
    width,
    height,
    autoPlay
  };

  const image: IImage = {
    outputData: ({videoData, positions}) => {
      setVideoData(videoData);
      setPositionsData(positions);
    },
    width,
    height,
    src: picture
  };

  const faceCircuit: IFaceCircuit = {
    inputData: videoData,
    outputData: (faceCircuitData) => setFaceCircuitData(faceCircuitData),
    positions: positionsData,
    width,
    height
  };

  const colorPicker: IColorPicker = {
    inputData: videoData,
    outputData: (data: Color | number) => typeof data == 'object' ? setColorData(data) : setToleranceData(+data),
    width,
    height,
    color,
    toleranceData
  };

  const background: IBackground = {
    img: backgroundImage!,
    inputData: videoData,
    outputData: (backgroundData) => setBackgroundData(backgroundData),
    width,
    height,
    color: colorData,
    tolerance: toleranceData
  };

  const result: IResult = {
    inputData: characterData || [backgroundData!],
    outputData: (imageData) => setImages(images => [...images, imageData]),
    width,
    height
  };

  const gallery: IGallery = {
    width,
    height,
    inputData: images,
    outputData: (path) => setImages(images => [...images.filter((image) => path !== image)])
  };

  const setCharacter = (name: string) => {
    setCurrentCharacter(name);
  };

  const character: ICharacter = {
    imgPath: (imgPath) => setBackgroundImage(imgPath),
    inputVideo: faceCircuitData!,
    inputBackground: backgroundData!,
    positions: positionsData!,
    outputData: (outputData) => setCharacterData(outputData),
    width,
    height
  };

  const literalSwitch: { [index: string]: (props: ICharacter) => ReactElement } = {
    [ZOMBIE]: (props) => (<Zombie {...props}/>),
    [WITCH]: (props) => (<Witch {...props}/>),
    [JOKER]: (props) => (<Joker {...props}/>),
    [TERMINATOR]: (props) => (<Terminator {...props}/>),
    [DEFAULT]: (props) => (<Terminator {...props}/>)
  };

  const getCharacter = () => (literalSwitch[currentCharacter] || literalSwitch['DEFAULT'])(character);

  return (
    <article className={'Article'}>
      {getCharacter()}
      <Result {...result}/>
      <section className={isGridMaskShown ? 'show' : 'hidden'}>
        <Video {...video}/>
      </section>
      {/*<Image {...image}/>*/}
      <FaceCircuit {...faceCircuit}/>
      <section className={isChromaKeyShown ? 'show' : 'hidden'}>
        <ColorPicker {...colorPicker}/>
      </section>
      <Background {...background}/>
      <section>
        <button onClick={hideShowGridMask}>Show 'Grid Mask'</button>
        <button onClick={hideShowChromaKey}>Show 'Chroma Key'</button>
        <button onClick={hideAll}>Hid All</button>
      </section>
      <section className={'Characters'}>
        {CHARACTERS.map(character => (<Character key={character} name={character} setCharacter={setCharacter}/>))}
      </section>
      <Gallery {...gallery}/>
    </article>
  );
};

export default Article;
