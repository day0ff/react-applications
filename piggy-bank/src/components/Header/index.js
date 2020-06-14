import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <header className="Header">
            <Link to="login">Go Login</Link>
            <h1>{props.title}</h1>
            <Link to="login">Go Login</Link>
        </header>
    );
}

export default Header;
