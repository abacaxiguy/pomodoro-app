import React, { useEffect, useState } from "react";
import { useInterval } from "../hooks/use-interval";
import { secondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Details } from "./details";
import { Timer } from "./timer";

interface Props {
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [started, setStarted] = useState(false);
    const [working, setWorking] = useState(true);
    const [shortBreak, setShortBreak] = useState(false);
    const [longBreak, setLongBreak] = useState(false);
    const [cycles, setCycles] = useState(0);
    const [pomodoros, setPomodoros] = useState(0);

    const body = document.body.classList;

    useEffect(() => {
        working ? body.add("working") : body.remove("working");
        shortBreak ? body.add("short-break") : body.remove("short-break");
        longBreak ? body.add("long-break") : body.remove("long-break");
    }, [working, shortBreak, longBreak]);

    useEffect(() => {
        if (started)
            document.title = `${secondsToTime(mainTime)} - ${
                working ? "Working!" : "Resting!"
            }`;

        if (mainTime <= 0) {
            playAlarm();
            if (working) {
                setWorking(false);
                setPomodoros(pomodoros + 1);

                if (pomodoros % props.cycles === 0 && pomodoros !== 0) {
                    setCycles(cycles + 1);
                    setLongBreak(true);
                    setMainTime(props.longBreakTime);
                } else {
                    setShortBreak(true);
                    setMainTime(props.shortBreakTime);
                }
            } else {
                setWorking(true);
                shortBreak ? setShortBreak(false) : setLongBreak(false);
                setMainTime(props.pomodoroTime);
            }
        }
    }, [started, mainTime, working]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    const playClackSound = () => {
        const audio = new Audio("https://pomofocus.io/audios/button-press.wav");
        audio.volume = 0.5;
        audio.play();
    };

    const playAlarm = () => {
        const audio = new Audio(
            "https://pomofocus.io/audios/alarms/alarm-kitchen.mp3",
        );
        audio.play();
    };

    const togglePomodoro = () => {
        if (!working) {
            setWorking(true);
            setShortBreak(false);
            setLongBreak(false);
            setMainTime(props.pomodoroTime);
            setTimeCounting(false);
        }
    };

    const toggleShortBreak = () => {
        if (!shortBreak) {
            setWorking(false);
            setShortBreak(true);
            setLongBreak(false);
            setMainTime(props.shortBreakTime);
            setTimeCounting(false);
        }
    };

    const toggleLongBreak = () => {
        if (!longBreak) {
            setWorking(false);
            setShortBreak(false);
            setLongBreak(true);
            setMainTime(props.longBreakTime);
            setTimeCounting(false);
        }
    };

    return (
        <>
            <div className="pomodoro">
                <div className="controls">
                    <Button
                        className={working ? "status active" : "status"}
                        text="Pomodoro"
                        onClick={togglePomodoro}
                    />
                    <Button
                        className={shortBreak ? "status active" : "status"}
                        text="Short Break"
                        onClick={toggleShortBreak}
                    />
                    <Button
                        className={longBreak ? "status active" : "status"}
                        text="Long Break"
                        onClick={toggleLongBreak}
                    />
                </div>
                <Timer mainTime={mainTime} />
                <Button
                    text={timeCounting ? "PAUSE" : "START"}
                    className={timeCounting ? "active start" : "start"}
                    onClick={() => {
                        playClackSound();
                        setTimeCounting(!timeCounting);
                        setStarted(true);
                    }}
                />
            </div>
            <Details cycles={cycles} pomodoros={pomodoros} working={working} />
        </>
    );
}
