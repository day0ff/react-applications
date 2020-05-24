import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './List.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

function List() {
    const [state, setState] = useState({
        stationFirst: {
            value: '',
            error: ''
        },
        stationSecond: {
            value: '',
            error: ''
        }
    });

    let history = useHistory();

    function handleChange(name, value) {
        setState({
            ...state, [name]: {
                value,
                error: ''
            }
        });
    }

    function handleClick() {
        const newStateFirst = !state.stationFirst.value && { stationFirst:{
            value: state.stationFirst.value,
            error: 'Please, enter station name.'
        }};
        const newStateSecond = !state.stationSecond.value && {stationSecond:{
            value: state.stationSecond.value,
            error: 'Please, enter station name.'
        }};
        (newStateFirst || newStateSecond) && setState({...state, ...newStateFirst,...newStateSecond});
        state.stationFirst.value && state.stationSecond.value && history.push('station');
    }

    return (
        <div className="List">
            <h1>List</h1>
            <p>Please, come up with names for the Stations.</p>
            <div className="stations">
                <Input label="First station name" name="stationFirst" value={state.stationFirst.value}
                       error={state.stationFirst.error} outerHandler={handleChange}/>
                <Input label="Second station name" name="stationSecond" value={state.stationSecond.value}
                       error={state.stationSecond.error} outerHandler={handleChange}/>
            </div>
            <Button label="Go" outerHandler={handleClick}/>
        </div>
    );
}

export default List;
