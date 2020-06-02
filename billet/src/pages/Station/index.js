import React from 'react';
import './Station.css';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

function Station() {
    const stations = useSelector(state => state.stations);
    let {id} = useParams();
    return (
        <div className="Station">
            <h1>Station: <b>{stations.find(station => station.id === +id).name}</b></h1>
            <Button path={stations.find(station => station.id !== +id).id.toString()}>Go to Next station</Button>
            <Button path={`/list`}>Go stations List</Button>
        </div>
    );
}

export default Station;
