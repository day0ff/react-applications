import React from 'react';
import './CoinsTotal.css';
import { useSelector } from 'react-redux';
import Sprite from '../Sprite';
import { Link } from 'react-router-dom';

function CoinsTotal() {
    const moneybox = useSelector(store => store.moneybox);
    const minions = useSelector(store => store.minions);

    return (
        <div className="CoinsTotal">
            <Link to="home" className="coin">
                <Sprite {...minions.find(minion => minion.picture==='coins-stack')}/>
            </Link>
            <span className="count">{moneybox.coins}</span>
        </div>
    );
}

export default CoinsTotal;
