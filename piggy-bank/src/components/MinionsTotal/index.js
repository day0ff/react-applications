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
                <Sprite {...minions.filter(minion => minion.type === 'minion' && minion.isBlocked === false)
                    .sort((a, b) => a.id - b.id).pop()}/>
            </Link>
            <span className="count">{moneybox.minions}</span>
        </div>
    );
}

export default MinionsTotal;
