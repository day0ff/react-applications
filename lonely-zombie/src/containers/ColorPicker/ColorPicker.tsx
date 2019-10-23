import React, {RefObject, useState, useEffect, useRef, MouseEvent} from 'react';
import {ICanvas} from '../../model/ICanvas';

const ColorPickerWidth = 30;
const ColorPickerHeight = 30;

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IColorPicker extends ICanvas<ImageData, Color> {
  color: Color;
}

const ColorPicker: React.FC<IColorPicker> = ({width, height, name, inputData, outputData, color}) => {
  const [pixelColor, setPixelColor] = useState(color);

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
    outputData && outputData(pixelColor);
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
    <>
      <p>ColorPicker</p>
      <canvas ref={canvasRef} id={name} width={width} height={height} onClick={sendPixelColor}
              onMouseMove={handleMouseMove}/>
      <canvas ref={canvasColorPixelRef} id={name + '-color'} width={ColorPickerWidth} height={ColorPickerHeight}/>
    </>
  );
};

export default ColorPicker;
