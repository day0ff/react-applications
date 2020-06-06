import React from 'react';
import './Minions.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sprite from '../../components/Sprite';

function Minions() {
    const minions = useSelector(state => state.minions);

    return (
        <div className="Minions">
            <h1>Minions.</h1>
            <div className="minions-list">
                {minions.map(minion=>(<Sprite key={minion.id} {...minion}/>))}
            </div>
            <p><Link to="home">Go Home</Link></p>
        </div>
    );
}

export default Minions;
