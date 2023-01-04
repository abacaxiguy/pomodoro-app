import React from "react";
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

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTime={mainTime} />
            <Button
                text="START"
                onClick={(e) => {
                    const body = document.querySelector("body");
                    if (body) body.classList.add("working");

                    const audio = new Audio(
                        "https://pomofocus.io/audios/button-press.wav",
                    );
                    audio.volume = 0.5;
                    audio.play();

                    if (e.target instanceof HTMLButtonElement) {
                        e.target.classList.toggle("active");
                        if (e.target.textContent === "START")
                            e.target.textContent = "PAUSE";
                        else e.target.textContent = "START";
                    }
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
