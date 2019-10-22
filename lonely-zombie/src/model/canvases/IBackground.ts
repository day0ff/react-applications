import { ICanvas } from '../ICanvas';
import { Color, ColorRange } from '../../containers/ColorPicker/ColorPicker';

export interface IBackground extends ICanvas<ImageData, ImageData> {
  img: {
    path: string;
  },
  color:Color
  range:ColorRange
}
