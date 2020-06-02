import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './List.css';
import { ACTION_TYPES } from '../../store/actions/action-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

const {STATION_ACTION_TYPES: {SET_STATION_NAME}} = ACTION_TYPES;

function List() {
    const stations = useSelector(state => state.stations);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {...stations.reduce((acc, {id, name}) => ({...acc, [id]: name}), {})},
        validationSchema: Yup.object().shape({
            ...stations.reduce((acc, {id}) => ({
                ...acc,
                [id]: Yup.string().required('Please, enter station name.')
            }), {})
        }),
        onSubmit: values => {
            const stations = Object.entries(values);
            stations.forEach(([id,name])=>dispatch({type: SET_STATION_NAME, id: +id, name}));
            history.push(`station/${stations[0][0]}`);
        }
    });


    let history = useHistory();


    return (
        <div className="List">
            <h1>List</h1>
            <p>Please, come up with names for the Stations.</p>
            <form className="stationsForm" onSubmit={formik.handleSubmit}>
                <div className="stations">
                    {
                        stations.map(({id}) =>
                            <Input id={id}
                                   key={id}
                                   name={id}
                                   type="text"
                                   onChange={formik.handleChange}
                                   value={formik.values[id]}
                                   placeholder="Station Name"
                                   handleChange={formik.handleChange}
                                   error={formik.errors[id]}/>)
                    }
                </div>
                <Button type="submit" disabled={formik.isSubmitting} outerHandler={() => {
                }}>Go</Button>
            </form>

        </div>
    );
}

export default List;
