import { useEffect, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { useInterval } from "../useInterval";
import { useKeydown } from "../useKeydown";
import { Keys } from "../useKeydown/keys";
import { BoardDim, GameState } from "../../types";
import {
  checkForClearedRows,
  checkForCollisions,
  checkForGameOver,
  createBoard,
} from "../../utils";
import { Direction } from "./gameReducer.utils";

export function useGameLoop(size: BoardDim): GameState {
  const [gameState, dispatch] = useReducer(gameReducer, {
    size: size,
    board: createBoard(size),
    tickInterval: 400,
    status: "active",
    score: 0,
  });

  // keydown handlers
  useKeydown(Keys.left, () =>
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: Direction.LEFT }),
  );
  useKeydown(Keys.right, () =>
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: Direction.RIGHT }),
  );
  useKeydown(Keys.down, () => {
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: Direction.DOWN });
  });

  useKeydown(Keys.space, () => {
    dispatch({ type: "ROTATE_ACTIVE_PIECE" });
  });

  useKeydown(Keys.esc, () => {
    dispatch({ type: "PAUSE" });
  });

  useInterval(
    () => {
      if (checkForCollisions(gameState)) {
        dispatch({ type: "SAVE_PIECE_POSITION" });
      }
      dispatch({ type: "NEXT_TICK" });
    },

    gameState.status === "paused" ? null : gameState.tickInterval,
  );

  useEffect(() => {
    if (checkForGameOver(gameState)) {
      console.log("game over", gameState);
      dispatch({ type: "GAME_OVER" });
    } else if (!gameState.activePiece) {
      dispatch({ type: "CREATE_ACTIVE_PIECE" });
      return;
    }

    const clearedRows = checkForClearedRows(gameState);
    if (clearedRows.length) {
      dispatch({ type: "CLEAR_ROWS", rows: clearedRows });
    }
  });

  return gameState;
}
