import {IDimensions} from './IDimensions';
import {RefObject} from 'react';
import {IHidden} from './IHidden';

export interface ICanvas<T, P> extends IDimensions {
  inputData?: T;
  outputData?: (data: P) => void;
}
