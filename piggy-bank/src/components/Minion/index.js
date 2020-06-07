import React from 'react';
import './Minion.css';
import Sprite from '../../components/Sprite';

function Minion(props) {
    return (
        <div className="Minion">
            <Sprite {...props}/>
            <span className={`minion-mark ${!props.isBlocked ? 'hidden' : ''}`}>?</span>
            <span className="minion-name">{props.isBlocked ? '?' : props.name}</span>
        </div>
    );
}

export default Minion;
