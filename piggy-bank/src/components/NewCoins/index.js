import React from 'react';
import './NewCoins.css';
import { useSelector } from 'react-redux';
import Sprite from '../Sprite';
import { Link } from 'react-router-dom';

function NewCoins() {
    const moneybox = useSelector(store => store.moneybox);
    const minions = useSelector(store => store.minions);

    return (
        <div className="NewCoins">
            <Link to="login" className="coin">
                <Sprite {...minions.find(minion => minion.type==='coin')}/>
            </Link>
            <span className="count">{moneybox.newCoins}</span>
        </div>
    );
}

export default NewCoins;
