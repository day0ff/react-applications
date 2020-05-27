import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './List.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ERROR_MESSAGE = 'Please, enter station name.';

function List() {
    const [stations, setStations] = useState([
        {id: 1, value: '', label: 'First station name', error: ''},
        {id: 2, value: '', label: 'Second station name', error: ''}
    ]);

    const stationItems = stations.map(station =>
        (<Input key={station.id} id={station.id} label={station.label} name={station.id} value={station.value}
                error={station.error}
                outerHandler={handleChange}/>));


    let history = useHistory();

    function handleChange(id, value) {
        setStations(stations.map(station => station.id === id ? {...station, value, error:''} : station));
    }

    function handleClick() {
        const emptyFields = stations.reduce((acc, station) => station.value === '' ? [...acc, station.id] : acc, []);

        emptyFields.length && setStations(stations.map(station =>
            emptyFields.includes(station.id) ? {...station, error: ERROR_MESSAGE} : station));

        !emptyFields.length && history.push('station');
    }

    return (
        <div className="List">
            <h1>List</h1>
            <p>Please, come up with names for the Stations.</p>
            <div className="stations">
                {stationItems}
            </div>
            <Button label="Go" outerHandler={handleClick}/>
        </div>
    );
}

export default List;
