import React from "react";
import "./RollDisplay.css";

const RollDisplay = ({ roll }) => {
    const scale = 180;
    const adjustedRoll = Math.max(Math.min(roll, scale), -scale);

    return (
        <div className="roll-display-container">
            <div className="roll-scale">
                {[...Array(37)].map((_, i) => {
                    const degree = i * 10 - 180;
                    return (
                        <div
                            key={i}
                            className="roll-tick"
                            style={{
                                transform: `rotate(${degree}deg) translate(150px) rotate(-${degree}deg)`,
                            }}
                        >
                            {degree}°
                        </div>
                    );
                })}
            </div>
            <div
                className="sailboat-roll"
                style={{ transform: `rotate(${adjustedRoll}deg)` }}
            >
                <div className="boat-body"></div>
            </div>
            <h3>Roll: {roll.toFixed(1)}°</h3>
        </div>
    );
};

export default RollDisplay;