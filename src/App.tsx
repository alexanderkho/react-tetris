import "./App.css";
import { Board } from "./components/Board";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([11, 16]);
  return (
    <div className="game-container">
      <div className="board-container">
        <Board state={state} />
        <p>Game status: {state.status}</p>
        <p>Score: {state.score}</p>
        <button onClick={newGame}>New Game</button>
      </div>
      <div className="queue-container">
        <ul>
          {state.pieceQueue.map((p, i) => (
            // TODO: don't use index as key
            <li key={i}>{p.proto.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
