import React, {useState, useEffect} from 'react';
import './Article.css';
import Characters from '../Characters/Characters';
import Witch from '../Characters/Witch/Witch';
import Zombie from '../Characters/Zombie/Zombie';
import Joker from '../Characters/Joker/Joker';

const Article: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState<string>('zombie');

  const setCharacter = (name: string) => {
    setCurrentCharacter(name);
  };

  return (
    <article>
      {currentCharacter === 'witch' && <Witch/>}
      {currentCharacter === 'zombie' && <Zombie/>}
      {currentCharacter === 'joker' && <Joker/>}
      <Characters setCharacter={setCharacter}/>
    </article>
  );
};

export default Article;
