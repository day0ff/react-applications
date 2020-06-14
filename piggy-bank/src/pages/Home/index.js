import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import NewCoins from '../../components/NewCoins';

function Home() {
    return (
        <div className="Home">
            <header>
                <NewCoins/>
               <h1>Home</h1>
            </header>
            <article>
                <p><Link to="about">Go About</Link></p>
                <p><Link to="minions">Go Minions</Link></p>
            </article>
        </div>
    );
}

export default Home;
