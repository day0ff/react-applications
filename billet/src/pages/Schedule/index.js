import React from 'react';
import './List.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

function List() {
    return (
        <div className="List">
            <h1>List</h1>
            <p>Please, come up with names for the Stations.</p>
            <div className="stations">
                <Input label="First station name" name="station-01"/>
                <Input label="Second station name" name="station-02"/>
            </div>
            <Button label="Go" path="station"/>
        </div>
    );
}

export default List;
