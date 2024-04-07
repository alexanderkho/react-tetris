import { FC } from "react";
import { GameOverlayProps } from "./GameOverlay.types";
import { GameOverlay } from "./GameOverlay";

export const GameStatusOverlay: FC<GameOverlayProps> = ({
  status,
  onNewGame,
}) => {
  if (status === "active") {
    return null;
  }
  const content =
    status === "paused" ? <PausedOverlayContent /> : <GameOverOverlayContent />;

  return (
    <GameOverlay>
      {content}
      <button
        className="bg-blue-600 p-2 rounded mt-4 text-gray-200"
        onClick={onNewGame}
      >
        New Game
      </button>
    </GameOverlay>
  );
};

const PausedOverlayContent = () => {
  return (
    <>
      <h2 className="text-2xl">Game paused</h2>
      <p>Press [esc] to resume</p>
    </>
  );
};

const GameOverOverlayContent = () => {
  return (
    <>
      <h2 className="text-2xl">Game over!</h2>
      <p>Play again?</p>
    </>
  );
};
