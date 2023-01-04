import React, { useEffect } from "react";
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Timer } from "./timer";

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [working, setWorking] = React.useState(false);

    useEffect(() => {
        if (working) document.body.classList.add("working");
    }, [working]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    const playAudio = () => {
        const audio = new Audio("https://pomofocus.io/audios/button-press.wav");
        audio.volume = 0.5;
        audio.play();
    };

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTime={mainTime} />
            <Button
                text={timeCounting ? "PAUSE" : "START"}
                className={timeCounting ? "active" : ""}
                onClick={() => {
                    playAudio();
                    setTimeCounting(!timeCounting);
                    setWorking(true);
                }}
            />

            <div className="details">
                <p>Testando: Abc</p>
                <p>Testando: Abc</p>
                <p>Testando: Abc</p>
            </div>
        </div>
    );
}
