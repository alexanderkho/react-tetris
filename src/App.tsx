import "./App.css";
import { Board } from "./components/Board";
import { PieceQueue } from "./components/PieceQueue";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="game-container">
      <div className="board-container">
        <Board state={state} />
      </div>
      <div className="queue-container">
        <PieceQueue queue={state.pieceQueue} />
        <p>Game status: {state.status}</p>
        <p>Score: {state.score}</p>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default App;
