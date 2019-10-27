import React, {useState, useEffect} from 'react';
import './Character.css';

export interface ICharacter {
  name: string;
  setCharacter: (name: string) => void;
}

const Character: React.FC<ICharacter> = ({name, setCharacter}) => {

  const onClick = () => {
    setCharacter(name);
  };

  return (
    <button className={'Character'} onClick={onClick}>
      {name}
    </button>
  );
};

export default Character;
