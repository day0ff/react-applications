import React, {useState} from 'react';
import './App.css';
import Article, {IArticle} from '../Article/Article';

const App: React.FC = () => {
  const [isChromaKeyShown, setIsChromaKeyShown] = useState(false);
  const [isGridMaskShown, setIsGridMaskShown] = useState(true);

  const hideShowChromaKey = () => setIsChromaKeyShown(!isChromaKeyShown)

  const hideShowGridMask = () => setIsGridMaskShown(!isGridMaskShown);

  const getSnapShot = () => {
  };

  const article: IArticle = {
    isChromaKeyShown,
    isGridMaskShown
  };

  return (
    <div className={'App'}>
      <section>
        <button onClick={hideShowGridMask}>Show 'Grid Mask'</button>
        <button onClick={hideShowChromaKey}>Show 'Chroma Key'</button>
      </section>
      <Article {...article}/>
      <section>
        <button onClick={getSnapShot}>Get Snap Shot</button>
      </section>
    </div>
  );
};

export default App;
