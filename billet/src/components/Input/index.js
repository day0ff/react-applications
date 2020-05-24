import React from 'react';
import './Input.css';

function Input({label, type = 'text', placeholder = 'Station name', name, value, className}) {
    return (
        <div className={`Input ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} value={value}/>
            <p className="error">&nbsp;ASDA</p>
        </div>
    );
}

export default Input;
