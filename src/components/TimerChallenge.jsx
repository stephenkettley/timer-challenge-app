import { useRef, useState } from "react";

const TimerChallenge = (props) => {
    const timer = useRef();
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const handleStart = () => {
        setTimerStarted(true)
        timer.current = setTimeout(() => {
            setTimerExpired(true)
        }, props.targetTime * 1000);
    }

    const handleStop = () => {
        clearTimeout(timer.current);
    }

    return (
        <section className="challenge">
            <h2>{props.title}</h2>
            {timerExpired && <p>You Lost!</p>}
            <p className="challenge-time">{props.targetTime} second{props.targetTime > 1 ? "s" : ""}</p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerStarted ? "active" : undefined}>
                {timerStarted ? "Timer is running..." : "Timer inactive."}
            </p>
        </section>
    )
};

export default TimerChallenge;