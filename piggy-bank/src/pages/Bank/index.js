import React from 'react';
import './Bank.css';

import { Link } from 'react-router-dom';

function Bank() {

    return (
        <div className="Bank">
            <h1>Bank</h1>
            <p><Link to="login">Go Login</Link></p>
        </div>
    );
}

export default Bank;
