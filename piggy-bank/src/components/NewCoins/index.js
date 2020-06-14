import React from 'react';
import './NewCoins.css';
import { useSelector } from 'react-redux';
import Sprite from '../Sprite';
import { Link } from 'react-router-dom';

function NewCoins(props) {
    const minions = useSelector(store => store.minions);

    return (
        <div className="NewCoins">
            <Link to="login" className="coin">
                <Sprite {...minions.find(minion => minion.type==='coin')}/>
            </Link>
            <span className="count">{props.newCoins}</span>
        </div>
    );
}

export default NewCoins;
