import { useState, useEffect } from 'react';

export interface IUseKey {
  key: string;
  keyDown?: () => void;
  keyUp?: () => void;
}

export const useKey = ({key, keyDown, keyUp}: IUseKey): boolean => {
  const [pressed, setPressed] = useState(false);

  const match = (ev: KeyboardEvent): boolean => key.toLowerCase() == ev.key.toLowerCase();

  const onDown = (ev: KeyboardEvent): any => {
    if (match(ev)) {
      !pressed && keyDown && keyDown();
      setPressed(true);
    }
  };

  const onUp = (event: KeyboardEvent): any => {
    if (match(event)) {
      pressed && keyUp && keyUp();
      setPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    }
  }, [key]);

  return pressed;
};
