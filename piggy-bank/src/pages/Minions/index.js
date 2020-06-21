import React from 'react';
import './Minions.css';
import { useSelector } from 'react-redux';
import Minion from '../../components/Minion';
import Header from '../../components/Header';

function Minions() {
    const minions = useSelector(state => state.minions);

    return (
        <div className="Minions">
            <Header/>
            <article>
                <div className="minions-list">
                    {minions.filter(minion => minion.type === 'minion')
                        .map(minion => (
                            <div key={minion.id} className="minion-item">
                                <Minion {...minion}/>
                            </div>
                        ))}
                </div>
            </article>
        </div>
    );
}

export default Minions;
