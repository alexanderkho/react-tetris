import { Board } from "./components/Board";
import { PieceQueue } from "./components/PieceQueue";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="flex">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <Board state={state} />
      </div>
      <div>
        <PieceQueue queue={state.pieceQueue} />
        <p>Game status: {state.status}</p>
        <p>Score: {state.score}</p>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default App;
