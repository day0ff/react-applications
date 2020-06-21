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
    }, [props.picture]);

    useEffect(() => {
        if (isRunning && !props.isBlocked) {
            const id = setTimeout(animate, props.interval);
            setTimer(id);
            return () => clearTimeout(id);
        }
    }, [isRunning, position]);


    function initSprite() {
        const startPosition = props.position * props.step * 100 / (props.width - props.step);
        const step = props.step * 100 / (props.width - props.step);
        setPosition(startPosition);
        setStep(step);
        setWidth(100);
        sprite.current.style.backgroundImage = `url('./images/sprites/${props.picture}.png')`;
        sprite.current.style.backgroundPosition = `${startPosition}% 0%`;
    }

    function startAnimation() {
        props.isBlocked || setIsRunning(true);
    }

    function stopAnimation() {
        !active && setIsRunning(false);
    }

    function animate() {
        const newPosition = position <= width ? position + step : 0;
        setPosition(newPosition);
        sprite.current.style.backgroundPosition = `${newPosition}% 0%`;
    }

    function activate() {
        setActive(!active);
    }

    return (
        <span ref={sprite} id={props.id} className={`Sprite ${props.isBlocked ? 'blocked' : ''}`}
              onMouseEnter={startAnimation} onMouseLeave={stopAnimation}
              onClick={activate}>
        </span>
    );
}

export default Sprite;
