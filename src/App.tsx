import { Board } from "./components/Board";
import { PieceQueue } from "./components/PieceQueue";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="flex justify-center">
      <Board state={state} />
      <div>
        <PieceQueue queue={state.pieceQueue} />
        <p>Game status: {state.status}</p>
        <p>Score: {state.score}</p>
        <button onClick={newGame} className="bg-emerald-300 p-2 rounded">
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
