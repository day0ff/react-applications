import React from 'react';
import './NotFound.css';
import Button from '../../components/Button';

function NotFound() {
    return (
        <div className="NotFound">
            <h1>Page Not Found.</h1>
            <Button label="Go Home!" path="/"/>
        </div>
    );
}

export default NotFound;
