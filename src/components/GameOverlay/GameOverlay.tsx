import { FC, PropsWithChildren } from "react";
import { GameOverlayProps } from "./GameOverlay.types";

const OverlayWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed left-0 top-0 w-full h-full backdrop-blur-md z-10 text-center">
      {children}
    </div>
  );
};

export const GameOverlay: FC<GameOverlayProps> = ({ status, onNewGame }) => {
  if (status === "active") {
    return null;
  }
  const content =
    status === "paused" ? <PausedOverlayContent /> : <GameOverOverlayContent />;

  return (
    <OverlayWrapper>
      <div className="mt-80">
        {content}
        <button
          className="bg-blue-600 p-2 rounded mt-4 text-gray-200"
          onClick={onNewGame}
        >
          New Game
        </button>
      </div>
    </OverlayWrapper>
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
