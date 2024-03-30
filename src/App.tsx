import "./App.css";
import { Board } from "./components/Board";
import { useGameLoop } from "./hooks/useGameLoop";

function App() {
  const state = useGameLoop([11, 16]);
  return (
    <>
      <Board state={state} />
      <p>Game status: {state.status}</p>
      <p>Score: {state.score}</p>
    </>
  );
}

export default App;
