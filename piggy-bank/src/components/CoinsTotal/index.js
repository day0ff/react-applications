import React from 'react';
import './CoinsTotal.css';
import { useSelector } from 'react-redux';
import Sprite from '../Sprite';
import { Link } from 'react-router-dom';

function CoinsTotal(props) {
    const minions = useSelector(store => store.minions);

    return (
        <div className="CoinsTotal">
            <Link to="home" className="coin">
                <Sprite {...minions.find(minion => minion.picture==='coins-stack')}/>
            </Link>
            <span className="count">{props.coinsTotal}</span>
        </div>
    );
}

export default CoinsTotal;
