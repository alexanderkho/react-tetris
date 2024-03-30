import "./App.css";
import { Board } from "./components/Board";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const { state, newGame } = useGameLoop([11, 16]);
  return (
    <>
      <Board state={state} />
      <p>Game status: {state.status}</p>
      <p>Score: {state.score}</p>
      <button onClick={newGame}>New Game</button>
    </>
  );
}

export default App;
