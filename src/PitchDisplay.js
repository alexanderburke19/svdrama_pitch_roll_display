import React from "react";
import "./PitchDisplay.css";

const PitchDisplay = ({ pitch }) => {
    const scale = 90;
    const adjustedPitch = Math.max(Math.min(pitch, scale), -scale);

    return (
        <div className="pitch-display-container">
            <div className="pitch-scale">
                {[...Array(19)].map((_, i) => {
                    const degree = i * 10 - 90;
                    return (
                        <div
                            key={i}
                            className="pitch-tick"
                            style={{
                                transform: `rotate(${degree}deg) translate(120px) rotate(-${degree}deg)`,
                            }}
                        >
                            {degree}°
                        </div>
                    );
                })}
            </div>
            <div
                className="sailboat-pitch"
                style={{ transform: `rotate(${adjustedPitch}deg)` }}
            >
                <div className="boat-body"></div>
            </div>
            <h3>Pitch: {pitch.toFixed(1)}°</h3>
        </div>
    );
};

export default PitchDisplay;