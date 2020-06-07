import React, { useState, useEffect, useRef } from 'react';
import './Sprite.css';

function Sprite(props) {
    const sprite = useRef(null);
    const [timer, setTimer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [position, setPosition] = useState(props.position);
    const [width, setWidth] = useState(props.width);
    const [step, setStep] = useState(props.step);
    const [active, setActive] = useState(false);

    useEffect(() => {
        initSprite();
    }, []);

    useEffect(() => {
        if (isRunning) {
            const id = setTimeout(animate, props.interval);
            setTimer(id);
            return () => clearTimeout(id);
        }
    }, [isRunning, position]);

    function initSprite() {
        const offsetWidth = sprite.current.offsetWidth;
        setWidth(Math.round(width * offsetWidth / step));
        setStep(offsetWidth);
        sprite.current.style.backgroundImage = `url('./images/minions/${props.picture}.png')`;
        sprite.current.style.backgroundPosition = `${position}px 0px`;
    }

    function startAnimation() {
        props.isBlocked || setIsRunning(true);
    }

    function stopAnimation() {
        !active && setIsRunning(false);
    }

    function animate() {
        const newPosition = -position < width - step ? position - step : 0;
        setPosition(newPosition);
        sprite.current.style.backgroundPosition = `${position}px 0px`;
    }

    function activate() {
        setActive(!active);
    }

    return (
        <span ref={sprite} id={props.id} className={`Sprite ${props.isBlocked?'blocked':''}`} onMouseEnter={startAnimation} onMouseLeave={stopAnimation}
              onClick={activate}>
        </span>
    );
}

export default Sprite;
