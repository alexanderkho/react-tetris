import { FC } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { PiecePreview, PieceQueue } from "./components/PieceQueue";
import { useGameLoop } from "./hooks/useGameLoop";
import { Pieces } from "./types";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="game-container">
      <div className="board-container">
        <PreviewContainer />
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

const PreviewContainer: FC = () => {
  const pieces = Object.values(Pieces);
  return (
    <>
      {pieces.map((p) => (
        <PiecePreview piece={p} />
      ))}
    </>
  );
};
