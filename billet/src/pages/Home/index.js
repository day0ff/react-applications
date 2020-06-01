import React from 'react';
import './Home.css';

import Button from '../../components/Button';

function Home() {
    return (
        <div className="Home">
            <h1>This is the react billet application</h1>
            <ul>It used:
                <li>react-router-dome;</li>
                <li>react-router-transition;</li>
                <li>formik;</li>
                <li>yup;</li>
            </ul>
            <Button path={`/list`}>Go to Stations List</Button>
        </div>
    );
}

export default Home;
