import {ICanvas} from '../ICanvas';
import {IPosition} from './IVideo';
import {IPath} from './IMakeup';

export interface IMaskArea {
  path: IPath;
}

export interface IMask extends ICanvas<ImageData, ImageData> {
  positions: IPosition[];
  mask: {
    source: CanvasImageSource;
    translate: number;
    destination: { left: number, right: number };
    areas: IMaskArea[];
  };
}
