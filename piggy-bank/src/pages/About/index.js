import React from 'react';
import './About.css';

import { Link } from 'react-router-dom';

function About() {

    return (
        <div className="About">
            <h1>About</h1>
            <p><Link to="home">Go Home</Link></p>
        </div>
    );
}

export default About;
