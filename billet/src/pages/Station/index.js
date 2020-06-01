import React from 'react';
import './Station.css';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';

function Station() {
    let {name} = useParams();
    return (
        <div className="Station">
            <h1>Station: <b>{name}</b></h1>
            <Button path={`d`}>Go to Second station</Button>
            <Button path={`/list`}>Go stations List</Button>
        </div>
    );
}

export default Station;
