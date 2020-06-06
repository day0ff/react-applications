import React, { useState, useEffect, useRef } from 'react';
import './Sprite.css';

function Sprite(props) {
    const sprite = useRef(null);
    const [timer, setTimer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [position, setPosition] = useState(props.position);
    const [active, setActive] = useState(false);

    useEffect(() => {
        initSprite();
    }, []);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(animate, props.interval);
            setTimer(id);
            return () => clearInterval(id);
        }
    }, [isRunning, position]);

    function initSprite() {
        sprite.current.style.backgroundImage = `url('./images/minions/${props.picture}.png')`;
        sprite.current.style.backgroundPosition = `${position}px 0px`;
    }

    function startAnimation() {
        setIsRunning(true);
    }

    function stopAnimation() {
        if(!active){
            clearInterval(timer);
            setIsRunning(false);
        }
    }

    function animate() {
        const newPosition = position < props.width - props.step ? position + props.step : 0;
        setPosition(newPosition);
        sprite.current.style.backgroundPosition = `${position}px 0px`;
    }

    function activate(){
        setActive(!active);
    }

    return (
        <span ref={sprite} id={props.id} className="Sprite" onMouseEnter={startAnimation} onMouseLeave={stopAnimation} onClick={activate}>
        </span>
    );
}

export default Sprite;
