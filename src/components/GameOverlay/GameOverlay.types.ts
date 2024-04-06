import { GameStatus } from "../../types";

export interface GameOverlayProps {
  status: GameStatus;
  onNewGame: VoidFunction;
}
