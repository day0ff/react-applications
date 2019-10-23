import {ICanvas} from '../ICanvas';
import {Color} from '../../containers/ColorPicker/ColorPicker';

export interface IBackground extends ICanvas<ImageData, ImageData> {
  img: {
    path: string;
  },
  color: Color;
  tolerance:number;
}
