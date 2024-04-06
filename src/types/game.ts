import { createBoard, initializePieceQueue } from "../utils";
import { BoardArray, BoardDim } from "./board";
import { PieceState } from "./piece";

export type GameStatus = "active" | "paused" | "game-over";

export interface GameState {
  board: BoardArray;
  /**
   * the currently in-play piece
   * holds it's own own x/y position
   * */
  activePiece?: PieceState;
  /**
   * fall rate in ms
   * */
  tickInterval: number;
  /**
   * board size
   * */
  size: BoardDim;
  /**
   * current game status
   * */
  status: GameStatus;
  /**
   * number of lines cleared
   * */
  score: number;
  /**
   * queue of upcoming pieces
   * */
  pieceQueue: Array<PieceState>;
}

export function newDefaultGameState(size: BoardDim): GameState {
  return {
    size: size,
    board: createBoard(size),
    tickInterval: 400,
    status: "active",
    score: 0,
    pieceQueue: initializePieceQueue(size),
  };
}
