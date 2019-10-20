import React, {useState} from 'react';

const Filters: React.FC = () => {
    const [background, setBackground] = useState(true);
    const backgroundClick = () => {
        setBackground(!background)
    };

    const [faceDetection, setFaceDetection] = useState(true);
    const faceDetectionClick = () => {
        setFaceDetection(!faceDetection)
    };

    return (
        <section>
            <p>Filters</p>
            <p>
                <button onClick={backgroundClick}>Background {background ? 'on' : 'off'}</button>
                <button onClick={faceDetectionClick}>Face Detection {faceDetection ? 'on' : 'off'}</button>
            </p>
        </section>
    );
};

export default Filters;
