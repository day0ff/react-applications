import {ICanvas} from '../ICanvas';
import {IPosition} from './IVideo';
import {Color} from '../../components/canvases/ColorPicker/ColorPicker';

export interface IPath {
  (points: IPosition[], context: CanvasRenderingContext2D): CanvasRenderingContext2D
}

export interface IArea {
  path: IPath,
  color: Color
}


export interface IMask extends ICanvas<ImageData, ImageData> {
  positions: IPosition[];
  mask: {
    background: Color,
    areas: IArea[]
  };
}
