import React from 'react';
import './NewCoins.css';
import { useSelector } from 'react-redux';
import Sprite from '../Sprite';


function NewCoins() {
    const moneybox = useSelector(store => store.moneybox);
    const minions = useSelector(store => store.minions);

    return (
        <div className="NewCoins">
            <span className="coin">
                <Sprite {...minions.find(minion => minion.type==='coin')}/>
            </span>
            <span className="count"> x {moneybox.newCoins}</span>
        </div>
    );
}

export default NewCoins;
