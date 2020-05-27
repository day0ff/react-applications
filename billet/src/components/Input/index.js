import React from 'react';
import './Input.css';

function Input({id, label, type = 'text', placeholder = 'Station name', name, value, className, error, outerHandler}) {
    function handleChange({target:{value}}) {
        outerHandler(id, value);
    }

    return (
        <div className={`Input ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input type={type} id={id} placeholder={placeholder} name={name} value={value} onChange={handleChange}/>
            <p className="error">{error}</p>
        </div>
    );
}

export default Input;
