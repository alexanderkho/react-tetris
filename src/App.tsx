import { Board } from "./components/Board";
import { GameOverlay } from "./components/GameOverlay/GameOverlay";
import { PieceQueue } from "./components/PieceQueue";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="flex justify-center">
      <Board state={state} />
      <div className="ml-2">
        <PieceQueue queue={state.pieceQueue} />
        <p>Game status: {state.status}</p>
        <p>Score: {state.score}</p>
      </div>
      <GameOverlay status={state.status} onNewGame={newGame} />
    </div>
  );
}

export default App;
