import {IPosition} from '../../../model/canvases/IVideo';

export function jokerEyebrows<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.lineCap = 'round';
  context.lineWidth = 15;
  context.moveTo(...offset(points[17]));
  context.lineTo(...offset(points[18]));


  context.moveTo(...offset(points[21]));
  context.lineTo(...offset(points[22]));

  context.stroke();
  return context;
}

function offset(point: IPosition): IPosition {
  const top = -50;
  return [point[0], point[1] + top];
}
