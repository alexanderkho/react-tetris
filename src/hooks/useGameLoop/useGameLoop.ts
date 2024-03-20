import { useReducer } from "react";
import { BoardDim, GameState } from "./types";
import {
  checkForCollisions,
  checkForGameOver,
  createBoard,
  useInterval,
} from "./utils";
import { gameReducer } from "./gameReducer";

export function useGameLoop(size: BoardDim): GameState {
  const [gameState, dispatch] = useReducer(gameReducer, {
    size: size,
    board: createBoard(size),
    tickInterval: 100,
  });

  useInterval(function () {
    if (checkForGameOver(gameState)) {
      dispatch({ type: "GAME_OVER" });
      return;
    }
    if (!gameState.activePiece) {
      dispatch({ type: "CREATE_ACTIVE_PIECE" });
      return;
    }
    if (checkForCollisions(gameState.board, gameState.activePiece.pos)) {
      dispatch({ type: "SAVE_PIECE_POSITION" });
    } else {
      dispatch({ type: "NEXT_TICK" });
    }
  }, gameState.tickInterval);

  return gameState;
}

// helpers
