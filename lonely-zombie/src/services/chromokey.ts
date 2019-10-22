import {ColorRange} from '../containers/ColorPicker/ColorPicker';

export function chromokey(imageData:ImageData, colorRange:ColorRange){
  let l = imageData.data.length / 4;

  for (let i = 0; i < l; i++) {
    let r = imageData.data[i * 4];
    let g = imageData.data[i * 4 + 1];
    let b = imageData.data[i * 4 + 2];
    if (colorRange.r[0] <= r && r <= colorRange.r[1])
      if (colorRange.g[0] <= g && g <= colorRange.g[1])
        if (colorRange.b[0] <= b && b <= colorRange.b[1])
          imageData.data[i * 4 + 3] = 0;
  }

  return imageData;
}
