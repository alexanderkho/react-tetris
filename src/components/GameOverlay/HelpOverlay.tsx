import { FC, useEffect, useRef, useState } from "react";
import { GameOverlay } from "./GameOverlay";
import { HelpOverlayProps } from "./GameOverlay.types";
import { useKeydown } from "../../hooks/useKeydown";
import { Keys } from "../../hooks/useKeydown/keys";

export const HelpOverlay: FC<HelpOverlayProps> = ({ pauseGame }) => {
  const [helpOpen, setHelpOpen] = useState(false);

  useKeydown(Keys.h, () => {
    setHelpOpen(true);
    // TODO: this should be idempotent
    pauseGame();
  });

  const onOverlayClose = () => {
    console.log("um hi");
    setHelpOpen(false);
    // TODO: this should be unpause game
    pauseGame();
  };

  return helpOpen ? <HelpOverlayComponent onClose={onOverlayClose} /> : null;
};

const HelpOverlayComponent: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [el, setEl] = useState<HTMLHeadingElement>();
  useKeydown(Keys.esc, onClose);
  useEffect(() => {
    console.log("le hmmm", ref.current);
    if (ref.current) {
      setEl(ref.current);
    }
  }, [ref]);

  return (
    <GameOverlay>
      <h2 ref={ref}>What is this?</h2>
      <p>
        This is a simple Tetris implementation built with React + TypeScript
      </p>
      <button onClick={onClose}>Resume</button>
      <p>Controls:</p>
      <ul>
        <li>Move the piece with the arrow keys</li>
        <li>Use the Space key to rotate the piece</li>
        <li>Use the [Up] arrow key to drop the piece</li>
        <li>Use the shift key to hold the current piece</li>
        <li>Use the escape key to pause</li>
      </ul>
    </GameOverlay>
  );
};
