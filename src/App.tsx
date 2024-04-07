import { Board } from "./components/Board";
import { GameStatusOverlay } from "./components/GameOverlay";
import { HelpOverlay } from "./components/GameOverlay/HelpOverlay";
import { GameStatus } from "./components/GameStatus";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame, pauseGame } = useGameLoop([10, 20]);

  return (
    <div className="flex justify-center">
      <Board state={state} />
      <GameStatusOverlay status={state.status} onNewGame={newGame} />
      <GameStatus state={state} />
      <HelpOverlay pauseGame={pauseGame} />
    </div>
  );
}

export default App;
