import React, {useState, useEffect} from 'react';
import './App.css';
import Article from '../Article/Article';
import LeftMenu from '../Menus/LeftMenu/LeftMenu';
import RightMenu from '../Menus/RightMenu/RightMenu';

const App: React.FC = () => {

  return (
    <div className={'App'}>
      <LeftMenu/>
      <Article/>
      <RightMenu/>
    </div>
  );
};

export default App;
