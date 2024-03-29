import React from "react";
import { PomodoroTimer } from "./components/pomodoro-timer";

function App(): JSX.Element {
    return (
        <div className="container">
            <PomodoroTimer
                pomodoroTime={1500}
                shortBreakTime={300}
                longBreakTime={600}
                cycles={4}
            />
        </div>
    );
}

export default App;
