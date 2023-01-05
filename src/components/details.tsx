import React from "react";

interface Props {
    cycles: number;
    pomodoros: number;
    working: boolean;
}

export function Details(props: Props): JSX.Element {
    return (
        <div className="details">
            <h2>{props.working ? "Time to focus!" : "Time for a break!"}</h2>
            <div className="info">
                <p>#{props.pomodoros}</p>
                <p>Cycle {props.cycles}</p>
            </div>
        </div>
    );
}
