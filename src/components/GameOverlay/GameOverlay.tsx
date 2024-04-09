import { FC, PropsWithChildren } from "react";
import { GameStatus } from "../../types";

export interface GameOverlayProps {
  status: GameStatus;
  onNewGame: VoidFunction;
}

export const GameOverlay: FC<GameOverlayProps> = ({ status, onNewGame }) => {
  if (status === "active") {
    return null;
  }
  const content =
    status === "paused" ? <PausedOverlayContent /> : <GameOverOverlayContent />;

  const title = status == "paused" ? "Game paused" : "Game over!";

  return (
    <div className="fixed left-0 top-0 w-full h-full backdrop-blur-md z-10 text-center">
      <OverlayModal title={title}>
        {content}
        <button
          className="bg-indigo-600 py-2 px-16 rounded mt-4 text-white"
          onClick={onNewGame}
        >
          New Game
        </button>
      </OverlayModal>
    </div>
  );
};

interface OverlayModalProps {
  title: string;
}

const OverlayModal: FC<PropsWithChildren<OverlayModalProps>> = ({
  children,
  title,
}) => {
  return (
    <div className="mt-40 w-2/3 ml-auto mr-auto opacity-90 rounded-lg border-indigo-600 border-4 bg-neutral-200">
      <div className="p-4 bg-indigo-600 text-white">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export const PausedOverlayContent = () => {
  return (
    <>
      <h3 className="text-xl font-semibold">What is this?</h3>
      <p>
        A simple Tetris implementation built with React + TypeScript.
        <br />
        Built by{" "}
        <a
          href="https://www.linkedin.com/in/alexander-k-ho/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          me
        </a>
      </p>
      <div className="mt-4 text-left">
        <h4 className="font-semibold">Controls:</h4>
        <ul>
          <li>Move the piece with the arrow keys</li>
          <li>Use the Space key to rotate the piece</li>
          <li>Use the [Up] arrow key to drop the piece</li>
          <li>Use the shift key to hold the current piece</li>
          <li>Use the escape key to pause</li>
        </ul>
      </div>
      <p className="font-semibold">Press [esc] to resume</p>
    </>
  );
};

export const GameOverOverlayContent = () => {
  return (
    <>
      <p>Play again?</p>
    </>
  );
};
