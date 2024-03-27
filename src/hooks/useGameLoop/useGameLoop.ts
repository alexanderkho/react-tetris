import { useEffect, useReducer } from "react";
import { BoardDim, GameState } from "./types";
import {
  checkForClearedRows,
  checkForCollisions,
  checkForGameOver,
  createBoard,
} from "./utils";
import { gameReducer } from "./gameReducer";
import { useInterval } from "../useInterval";
import { useKeydown } from "../useKeydown";
import { Keys } from "../useKeydown/keys";

export function useGameLoop(size: BoardDim): GameState {
  const [gameState, dispatch] = useReducer(gameReducer, {
    size: size,
    board: createBoard(size),
    tickInterval: 200,
  });

  // keydown handlers
  useKeydown(Keys.left, () =>
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: "LEFT" }),
  );
  useKeydown(Keys.right, () =>
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: "RIGHT" }),
  );
  useKeydown(Keys.down, () => {
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: "DOWN" });
  });

  useKeydown(Keys.space, () => {
    dispatch({ type: "ROTATE_ACTIVE_PIECE" });
  });

  useInterval(() => dispatch({ type: "NEXT_TICK" }), gameState.tickInterval);

  useEffect(() => {
    if (checkForGameOver(gameState)) {
      dispatch({ type: "GAME_OVER" });
    } else if (!gameState.activePiece) {
      dispatch({ type: "CREATE_ACTIVE_PIECE" });
      return;
    } else if (checkForCollisions(gameState)) {
      dispatch({ type: "SAVE_PIECE_POSITION" });
    }

    const clearedRows = checkForClearedRows(gameState);
    if (clearedRows.length) {
      dispatch({ type: "CLEAR_ROWS", rows: clearedRows });
    }
  });

  return gameState;
}
