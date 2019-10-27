import {IPosition} from '../../../model/canvases/IVideo';
import {average} from '../../helpers';

export function jokerLips<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {

  context.moveTo(...offset(points[2], points[44]));
  context.lineTo(...points[46]);
  context.lineTo(...points[47]);
  context.lineTo(...points[48]);
  context.lineTo(...offset(points[50], points[12]));
  context.lineTo(...points[52]);
  context.lineTo(...points[53]);
  context.lineTo(...points[54]);
  context.lineTo(...offset(points[2], points[44]));
  context.closePath();
  context.fill();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.fillStyle = 'blue';
  context.moveTo(...points[44]);
  context.lineTo(...points[61]);
  context.lineTo(...points[60]);
  context.lineTo(...points[59]);
  context.lineTo(...points[50]);
  context.lineTo(...points[58]);
  context.lineTo(...points[57]);
  context.lineTo(...points[56]);
  context.lineTo(...points[44]);
  context.fill();
  return context;
}

function offset(pointA: IPosition, pointB: IPosition): IPosition {
  const X = average(pointA[0], pointB[0]);
  const Y = average(pointA[1], pointB[1]);
  return [X, Y];
}
