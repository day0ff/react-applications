import React from 'react';
import { useHistory } from "react-router-dom";
import './Button.css';

function Button({label='Submit', path, outerHandler}) {
    let history = useHistory();

    function handleClick() {
        outerHandler ? outerHandler() : path && history.push(path);
    }

    return <button type="button" onClick={handleClick}>{label}</button>;
}

export default Button;
