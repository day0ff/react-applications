import React, {useState, useEffect} from 'react';
import './Characters.css';
import Character from '../../components/Character/Character';

interface ICharacter {
  setCharacter: (name: string) => void
}

const Characters: React.FC<ICharacter> = ({setCharacter}) => {

  return (
    <section className={'Characters'}>
      <Character name={'witch'} setCharacter={setCharacter}/>
      <Character name={'zombie'} setCharacter={setCharacter}/>
    </section>
  );
};

export default Characters;
