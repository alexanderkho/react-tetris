import { Dispatch, useReducer } from "react";
import { BoardDim, GameState } from "./types";
import { checkForCollisions, checkForGameOver, createBoard } from "./utils";
import { GameAction, gameReducer } from "./gameReducer";
import { useInterval } from "../useInterval";
import { useKeydown } from "../useKeydown";

export function useGameLoop(size: BoardDim): GameState {
  const [gameState, dispatch] = useReducer(gameReducer, {
    size: size,
    board: createBoard(size),
    tickInterval: 100,
  });
  useArrowKeys(dispatch);

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

enum KeyCode {
  left = "ArrowLeft",
  right = "ArrowRight",
}

function useArrowKeys(dispatch: Dispatch<GameAction>) {
  const moveLeft = () =>
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: "LEFT" });
  const moveRight = () =>
    dispatch({ type: "MOVE_ACTIVE_PIECE", direction: "RIGHT" });

  useKeydown(KeyCode.left, moveLeft);
  useKeydown(KeyCode.right, moveRight);
}
