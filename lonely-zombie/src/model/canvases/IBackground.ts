import {ICanvas} from '../ICanvas';

export interface IBackground extends ICanvas<ImageData, ImageData> {
  name:'background';
  img: {
    path: string;
  }
}
