import {IPosition} from '../../../model/canvases/IVideo';

export function terminatorMouse<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {

  context.moveTo(...points[44]);
  context.lineTo(...points[56]);
  context.lineTo(...points[57]);
  context.lineTo(...points[58]);
  context.lineTo(...points[50]);
  context.lineTo(...points[59]);
  context.lineTo(...points[60]);
  context.lineTo(...points[61]);
  context.lineTo(...points[44]);

  return context;
}
