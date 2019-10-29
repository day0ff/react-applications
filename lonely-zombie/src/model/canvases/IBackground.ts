import { ICanvas } from '../ICanvas';
import { Color } from '../../components/canvases/ColorPicker/ColorPicker';

export interface IBackground extends ICanvas<ImageData, ImageData> {
  img: string,
  color: Color;
  tolerance: number;
}
