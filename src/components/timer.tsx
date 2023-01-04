import React from "react";
import { secondsToTime } from "../utils/seconds-to-time";

interface Props {
    mainTime: number;
}

export function Timer(props: Props): JSX.Element {
    return (
        <div className="timer">
            <h2>{secondsToTime(props.mainTime)}</h2>
        </div>
    );
}
