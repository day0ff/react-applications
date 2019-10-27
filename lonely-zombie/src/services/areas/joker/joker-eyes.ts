import {IPosition} from '../../../model/canvases/IVideo';
import {angle} from '../../helpers';

export function jokerEyes<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  const corner = angle(points);
  context.moveTo(...points[23]);
  context.lineTo(...points[66]);
  context.lineTo(...points[26]);
  context.lineTo(...points[65]);
  context.lineTo(...points[25]);
  context.lineTo(...offset(points[26], corner));

  context.moveTo(...points[30]);
  context.lineTo(...points[69]);
  context.lineTo(...points[31]);
  context.lineTo(...points[70]);
  context.lineTo(...points[28]);
  context.lineTo(...offset(points[31], corner));
  context.fill();
  return context;
}

function offset(point: IPosition, angle: number): IPosition {
  const indent = 30;

  return [
    point[0] - indent * Math.sin(angle),
    point[1] + indent * Math.cos(angle)
  ];
}
