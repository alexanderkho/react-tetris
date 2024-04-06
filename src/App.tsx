import { Board } from "./components/Board";
import { GameOverlay } from "./components/GameOverlay/GameOverlay";
import { GameStatus } from "./components/GameStatus";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([10, 20]);
  return (
    <div className="flex justify-center">
      <Board state={state} />
      <GameOverlay status={state.status} onNewGame={newGame} />
      <GameStatus state={state} />
    </div>
  );
}

export default App;
