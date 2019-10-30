import React, { useState } from 'react';
import './App.css';
import Article, { IArticle } from '../Article/Article';

const App: React.FC = () => {
  const article: IArticle = {};

  return (
    <div className={'App'}>
      <Article {...article}/>
    </div>
  );
};

export default App;
