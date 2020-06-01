import React from 'react';
import { useHistory } from 'react-router-dom';
import './List.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

function List() {
    const formik = useFormik({
        initialValues: {
            station1: '',
            station2: ''
        },
        validationSchema: Yup.object().shape({
            station1: Yup.string()
                .required('Please, enter station name.'),
            station2: Yup.string()
                .required('Please, enter station name.')
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            console.log(formik);
            history.push('station');
        }
    });


    let history = useHistory();


    return (
        <div className="List">
            <h1>List</h1>
            <p>Please, come up with names for the Stations.</p>
            <form className="stationsForm" onSubmit={formik.handleSubmit}>
                <div className="stations">
                    <Input id="station1"
                           name="station1"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.station1}
                           placeholder="First station name"
                           handleChange={formik.handleChange}
                           error={formik.errors.station1}/>
                    <Input id="station2"
                           name="station2"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.station2}
                           placeholder="Second station name"
                           handleChange={formik.handleChange}
                           error={formik.errors.station2}/>
                </div>
                <Button type="submit" disabled={formik.isSubmitting} outerHandler={() => {
                }}>Go</Button>
            </form>

        </div>
    );
}

export default List;
