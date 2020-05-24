import React, {RefObject, useState, useEffect, useRef, MouseEvent} from 'react';
import './ColorPicker.css';
import {ICanvas} from '../../../model/ICanvas';

const ColorPickerWidth = 30;
const ColorPickerHeight = 30;

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IColorPicker extends ICanvas<ImageData, Color | number> {
  color: Color;
  toleranceData: number;
}

const ColorPicker: React.FC<IColorPicker> = ({width, height, inputData, outputData, color, toleranceData}) => {
  const [pixelColor, setPixelColor] = useState(color);
  const [tolerance, setTolerance] = useState(toleranceData);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasColorPixelRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasColorPixelElement = (canvasColorPixelRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasColorPixelContext = canvasColorPixelElement.getContext('2d') as CanvasRenderingContext2D;
    canvasColorPixelContext.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    canvasColorPixelContext.fillRect(0, 0, ColorPickerWidth, ColorPickerHeight);
  }, []);

  useEffect(() => {
    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    inputData && canvasContext.putImageData(inputData, 0, 0);
  }, [inputData]);

  const sendPixelColor = () => {
    outputData!(pixelColor);
  };

  const toleranceChange = (event: any) => {
    event.preventDefault();
    event.persist();
    setTolerance(+event.target.value);
    outputData!(+event.target.value);
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    event.persist();

    const canvasElement = (canvasRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const pixelColorData = canvasContext.getImageData(event.pageX - canvasElement.offsetLeft, event.pageY - canvasElement.offsetTop, 1, 1);
    const canvasColorPixelElement = (canvasColorPixelRef as RefObject<HTMLCanvasElement>).current as HTMLCanvasElement;
    const canvasColorPixelContext = canvasColorPixelElement.getContext('2d') as CanvasRenderingContext2D;

    canvasColorPixelContext.fillStyle = `rgba(${pixelColorData.data.join(',')})`;
    canvasColorPixelContext.fillRect(0, 0, ColorPickerWidth, ColorPickerHeight);

    setPixelColor({
      r: pixelColorData.data[0],
      g: pixelColorData.data[1],
      b: pixelColorData.data[2],
      a: pixelColorData.data[3]
    })
  };

  return (
    <div className={'ColorPicker'}>
      <p>Chroma Key</p>
      <canvas ref={canvasRef} id={'color-picker'} width={width} height={height} onClick={sendPixelColor}
              onMouseMove={handleMouseMove}/>
      <canvas ref={canvasColorPixelRef} id={'color'} width={ColorPickerWidth} height={ColorPickerHeight}/>
      <input type="range" min="100" max="250" value={tolerance} onChange={toleranceChange}/>
    </div>
  );
};

export default ColorPicker;
