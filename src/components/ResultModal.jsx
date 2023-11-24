import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const ResultModal = forwardRef(function ResultModal(props, ref) {
    const dialog = useRef();
    const userLost = props.timeRemaining <= 0;
    const formattedRemainingTime = (props.timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - props.timeRemaining / (props.targetTime * 1000)) * 100);

    
    useImperativeHandle(ref,() => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={props.onReset}>
             {userLost && <h2>You Lost!</h2>}
             {!userLost && <h2>Your Score: {score}</h2>}
             <p>The target time was <strong>{props.targetTime}</strong> seconds</p>
             {!userLost && <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong> on the clock!</p>}
             {userLost && <p>Time is up! There are <strong>0 seconds left!</strong></p>}
             <form method="dialog" onSubmit={props.onReset}>
                <button>Close</button>
             </form>
        </dialog>,
        document.getElementById("modal")
    )
})

export default ResultModal;