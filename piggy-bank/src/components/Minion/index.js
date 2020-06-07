import React, {useEffect, useRef}  from 'react';
import './Minion.css';
import Sprite from '../../components/Sprite';

function Minion(props) {
    const minion = useRef(null);
    useEffect(()=>{
        minion.current.style.width = minion.current.offsetWidth + 'px';
        minion.current.style.height = minion.current.offsetHeight + 'px';
    },[]);

    return (
        <div ref={minion} className="Minion">
            <Sprite {...props}/>
            <span className={`minion-mark ${!props.isBlocked?'hidden':''}`}>?</span>
            <span className="minion-name">{props.isBlocked?'?':props.name}</span>
        </div>
    );
}

export default Minion;
