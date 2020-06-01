import React from 'react';
import { useHistory } from "react-router-dom";
import './Button.css';

function Button({type="button", disabled=false, path, className, outerHandler, children}) {
    let history = useHistory();

    function handleClick() {
        outerHandler ? outerHandler() : path && history.push(path);
    }

    return <button type={type} className={`Button ${className}`} onClick={handleClick} disabled={disabled}>{children}</button>;
}

export default Button;
