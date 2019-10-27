import {IPosition} from '../../model/canvases/IVideo';

export function nose<IDeformation>(canvas: any, canvasElement: HTMLCanvasElement, positions: IPosition[]) {
  canvas.draw(canvas.texture(canvasElement))
    .bulgePinch(positions[27][0], positions[27][1], 18, 0.5)
    .bulgePinch(positions[32][0], positions[32][1], 18, 0.5)
    .bulgePinch(positions[62][0], positions[62][1], 18, 0.5)
    .update();

  return canvas;
}
