import {Color,} from '../containers/ColorPicker/ColorPicker';

export function chromokey(imageData: ImageData, color: Color, tolerance: number) {
  let l = imageData.data.length / 4;

  for (let i = 0; i < l; i++) {
    let r = imageData.data[i * 4];
    let g = imageData.data[i * 4 + 1];
    let b = imageData.data[i * 4 + 2];
    const diff = Math.abs(r - color.r) + Math.abs(g - color.g) + Math.abs(b - color.b);
    if (diff < tolerance) imageData.data[i * 4 + 3] = 0;
  }

  return imageData;
}
