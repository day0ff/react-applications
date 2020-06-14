import React from 'react';
import './Minions.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Minion from '../../components/Minion';

function Minions() {
    const minions = useSelector(state => state.minions);

    return (
        <div className="Minions">
            <h1>Minions.</h1>
            <div className="minions-list">
                {minions.filter(minion => minion.type === 'minion')
                    .map(minion => (
                    <div key={minion.id} className="minion-item">
                        <Minion {...minion}/>
                    </div>
                ))}
            </div>
            <p><Link to="home">Go Home</Link></p>
        </div>
    );
}

export default Minions;
