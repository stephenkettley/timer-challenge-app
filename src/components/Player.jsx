import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null)


  const handleClick = (event) => {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""; // you want to avoid using refs to manipulate the DOM (goes against declarative idea)
  }
  return (
    <>
    <section id="player">
      <h2>Welcome { enteredPlayerName ?? "Unknown Player"}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
    </>
  );
}
