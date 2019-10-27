import {IPosition} from '../../model/canvases/IVideo';

export function lipsPath<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.moveTo(...points[44]);
  context.lineTo(...points[45]);
  context.lineTo(...points[46]);
  context.lineTo(...points[47]);
  context.lineTo(...points[48]);
  context.lineTo(...points[49]);
  context.lineTo(...points[50]);
  context.lineTo(...points[51]);
  context.lineTo(...points[52]);
  context.lineTo(...points[53]);
  context.lineTo(...points[54]);
  context.lineTo(...points[55]);
  return context;
}
