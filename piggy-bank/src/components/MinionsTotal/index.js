import React from 'react';
import './MinionsTotal.css';
import Sprite from '../Sprite';
import { Link } from 'react-router-dom';

function MinionsTotal(props) {

    return (
        <div className="MinionsTotal">
            <Link to="minions" className="minion-current">
                <Sprite {...props.minion}/>
            </Link>
            <span className="count">{props.minionsTotal}</span>
        </div>
    );
}

export default MinionsTotal;
