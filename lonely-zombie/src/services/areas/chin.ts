import {IPosition} from '../../model/canvases/IVideo';

export function chin<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.moveTo(...points[2]);
  context.lineTo(...points[3]);
  context.lineTo(...points[4]);
  context.lineTo(...points[5]);
  context.lineTo(...points[6]);
  context.lineTo(...points[7]);
  context.lineTo(...points[8]);
  context.lineTo(...points[9]);
  context.lineTo(...points[10]);
  context.lineTo(...points[11]);
  context.lineTo(...points[12]);
  context.lineTo(...points[46]);
  context.lineTo(...points[48]);
  return context;
}
