import { Board } from "./components/Board";
import { GameOverlay } from "./components/GameOverlay/GameOverlay";
import { PiecePreview, PieceQueue } from "./components/PieceQueue";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="flex justify-center">
      <Board state={state} />
      <div className="text-left border-2 border-gray-500 divide-y divide-gray-500 p-4 rounded-md ml-2">
        <p>Score: {state.score}</p>
        <PieceQueue queue={state.pieceQueue} />
        {state.holdPiece && (
          <div className="items-center">
            <p>Hold</p>
            <PiecePreview piece={state.holdPiece} />
          </div>
        )}
      </div>
      <GameOverlay status={state.status} onNewGame={newGame} />
    </div>
  );
}

export default App;
