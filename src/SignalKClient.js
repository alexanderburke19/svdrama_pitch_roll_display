import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import PitchDisplay from "./PitchDisplay";
import RollDisplay from "./RollDisplay";


// Replace with the SignalK WebSocket URL (probably http://<raspberry_pi_ip>:3000/signalk/v1/stream)
const client = new W3CWebSocket("ws://10.10.10.1:3000/signalk/v1/stream");


const SignalKClient = () => {
    const [pitch, setPitch] = useState(null);
    const [roll, setRoll] = useState(null);

    useEffect(() => {
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };

        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.updates) {
                data.updates.forEach((update) => {
                    update.values.forEach((value) => {
                        if (value.path === "navigation.attitude.pitch") {
                            setPitch(value.value);
                        }
                        if (value.path === "navigation.attitude.roll") {
                            setRoll(value.value);
                        }
                    });
                });
            }
        };

        client.onclose = () => {
            console.log("WebSocket Client Disconnected");
        };
    }, []);

    return (
        <div>
            <h1>Sailboat Pitch and Roll</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {pitch !== null && <PitchDisplay pitch={pitch} />}
                {roll !== null && <RollDisplay roll={roll} />}
            </div>
        </div>
    );
};

export default SignalKClient;