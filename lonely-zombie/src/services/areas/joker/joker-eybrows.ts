import {IPosition} from '../../../model/canvases/IVideo';
import {angle} from '../../helpers';

export function jokerEyebrows<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  const corner = angle(points);
  context.lineCap = 'round';
  context.lineWidth = 15;
  context.moveTo(...offset(points[17], corner));
  context.lineTo(...offset(points[18], corner));


  context.moveTo(...offset(points[21], corner));
  context.lineTo(...offset(points[22], corner));

  context.stroke();
  return context;
}

function offset(point: IPosition, angle: number): IPosition {
  const indent = -40;

  return [
    point[0] - indent * Math.sin(angle),
    point[1] + indent * Math.cos(angle)
  ];
}
