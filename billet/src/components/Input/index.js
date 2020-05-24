import React from 'react';
import './Input.css';

function Input({label, type = 'text', placeholder = 'Station name', name, value, className, error, outerHandler}) {
    function handleChange({target:{value}}) {
        outerHandler(name, value);
    }

    return (
        <div className={`Input ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} value={value} onChange={handleChange}/>
            <p className="error">{error}</p>
        </div>
    );
}

export default Input;
