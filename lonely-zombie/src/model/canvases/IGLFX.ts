import {ICanvas} from '../ICanvas';

export interface IGLFX extends ICanvas<ImageData, ImageData> {
  filter: (tempCanvas:HTMLCanvasElement) => HTMLCanvasElement;
}

