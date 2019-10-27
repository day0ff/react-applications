import {IPosition} from '../../../model/canvases/IVideo';

export function jokerEyes<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.moveTo(...points[23]);
  context.lineTo(...points[66]);
  context.lineTo(...points[26]);
  context.lineTo(...points[65]);
  context.lineTo(...points[25]);
  context.lineTo(...offset(points[26]));

  context.moveTo(...points[30]);
  context.lineTo(...points[69]);
  context.lineTo(...points[31]);
  context.lineTo(...points[70]);
  context.lineTo(...points[28]);
  context.lineTo(...offset(points[31]));
  context.fill();
  return context;
}

function offset(point: IPosition): IPosition {
  const top = 30;
  return [point[0], point[1] + top];
}
