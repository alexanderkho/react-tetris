import { GameStatus } from "../../types";

export interface GameOverlayProps {
  status: GameStatus;
  onNewGame: VoidFunction;
}

export interface HelpOverlayProps {
  pauseGame: VoidFunction;
}
