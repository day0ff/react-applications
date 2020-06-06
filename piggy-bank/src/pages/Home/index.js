import React from 'react';
import './Home.css';

import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
            <h1>Home</h1>
            <p><Link to="about">Go About</Link></p>
            <p><Link to="minions">Go Minions</Link></p>
        </div>
    );
}

export default Home;
