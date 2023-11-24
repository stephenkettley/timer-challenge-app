import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = (props) => {
    const dialog = useRef();
    const timer = useRef();
    const [timeRemaining, setTimeRemaining] = useState(props.targetTime * 1000);
    const timerActive = (timeRemaining > 0) && (timeRemaining < props.targetTime * 1000);

     if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
     }

    function handleTimeReset() {
        setTimeRemaining(props.targetTime * 1000)
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10)
        }, 10);
    }

    const handleStop = () => {
        clearInterval(timer.current);
        dialog.current.open();

    }

    return (
        <>
        <ResultModal ref={dialog} targetTime={props.targetTime} timeRemaining={timeRemaining} onReset={handleTimeReset}/>
        <section className="challenge">
            <h2>{props.title}</h2>
            <p className="challenge-time">{props.targetTime} second{props.targetTime > 1 ? "s" : ""}</p>
            <p>
                <button onClick={timerActive ? handleStop : handleStart}>
                    {timerActive ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerActive ? "active" : undefined}>
                {timerActive ? "Timer is running..." : "Timer inactive."}
            </p>
        </section>
        </>
    )
};

export default TimerChallenge;