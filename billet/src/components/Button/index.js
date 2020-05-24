import React from 'react';
import { useHistory } from "react-router-dom";
import './Button.css';

function Button({label='Submit', disabled=false, path, className, outerHandler}) {
    let history = useHistory();

    function handleClick() {
        outerHandler ? outerHandler() : path && history.push(path);
    }

    return <button type="button" className={`Button ${className}`} onClick={handleClick} disabled={disabled}>{label}</button>;
}

export default Button;
