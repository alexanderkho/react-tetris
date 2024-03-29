import { useEffect, useReducer } from "react";
import { GameState } from "./types";
import { gameReducer } from "./gameReducer";
import { useInterval } from "../useInterval";
import { useKeydown } from "../useKeydown";
import { Keys } from "../useKeydown/keys";
import { BoardDim } from "../../types";
import {
  checkForClearedRows,
  checkForCollisions,
  checkForGameOver,
  createBoard,
} from "../../utils";

export function useGameLoop(size: BoardDim): GameState {
  const [gameState, dispatch] = useReducer(gameReducer, {
    size: size,
    board: createBoard(size),
    tickInterval: 800,
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
