import {IPosition} from '../../model/canvases/IVideo';

export function lipsAroundPath<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  const top = [...points[37]] as IPosition;
  top[1] += 5;
  const down = [...points[7]] as IPosition;
  down[1] -= 5;
  const left = [...points[3]] as IPosition;
  left[0] += 5;
  const right = [...points[11]] as IPosition;
  right[0] -= 5;
  context.moveTo(...left);
  context.lineTo(...top);
  context.lineTo(...right);
  context.lineTo(...down);
  return context;
}
