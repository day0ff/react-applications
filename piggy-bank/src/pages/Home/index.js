import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import CoinsTotal from '../../components/CoinsTotal';
import NewCoins from '../../components/NewCoins';
import MinionsTotal from '../../components/MinionsTotal';

function Home() {
    return (
        <div className="Home">
            <header>
                <CoinsTotal/>
                <NewCoins/>
                <MinionsTotal/>
            </header>
            <article>
                <p><Link to="about">Go About</Link></p>
                <p><Link to="minions">Go Minions</Link></p>
            </article>
        </div>
    );
}

export default Home;
