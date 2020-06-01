import React from 'react';
import './Login.css';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import auth from '../../auth/Auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Must be more than 8 characters')
                .required('Required')
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            auth.authenticate();
            history.push('/');
        },
    });

    let history = useHistory();

    return (
        <div className="Login">
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input id="email"
                       name="email"
                       type="email"
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       placeholder="Email Address"
                       handleChange={formik.handleChange}
                       error={formik.errors.email}/>
                <Input id="password"
                       name="password"
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.password}
                       placeholder="Password"
                       handleChange={formik.handleChange}
                       error={formik.errors.password}/>
                <Button type="submit" disabled={formik.isSubmitting} outerHandler={()=>{}}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
