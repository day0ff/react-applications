import React from 'react';
import './MinionsTotal.css';
import { useSelector } from 'react-redux';
import Sprite from '../Sprite';
import { Link } from 'react-router-dom';

function MinionsTotal() {
    const moneybox = useSelector(store => store.moneybox);
    const minions = useSelector(store => store.minions);

    return (
        <div className="MinionsTotal">
            <Link to="minions" className="minion-current">
                <Sprite {...minions.find(minion => minion.id === 100 + moneybox.minions)}/>
            </Link>
            <span className="count">{moneybox.minions}</span>
        </div>
    );
}

export default MinionsTotal;
