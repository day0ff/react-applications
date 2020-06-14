import React from 'react';
import './Coin.css';
import Sprite from '../../components/Sprite';

function Coin(props) {
    return (
        <div className="Coin">
            <Sprite {...props}/>
        </div>
    );
}

export default Coin;
