import React from 'react';
import './NotFound.css';

import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <div className="NotFound">
            <h1>Page Not Found.</h1>
            <p><Link to="home">Go Home</Link></p>
        </div>
    );
}

export default NotFound;
