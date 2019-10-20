import {IDimensions} from './IDimensions';
import {RefObject} from 'react';

export interface ICanvas<T, P> extends IDimensions {
  name: string;
  inputData?: T ;
  outputData?: (data: P) => void;
}
