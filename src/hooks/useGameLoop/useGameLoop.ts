import { useEffect, useReducer } from "react";
import { gameReducer, GameAction } from "./gameReducer";
import { useInterval } from "../useInterval";
import { useKeydown } from "../useKeydown";
import { Keys } from "../useKeydown/keys";
import { BoardDim, GameState, newDefaultGameState } from "../../types";
import {
  checkForClearedRows,
  checkForCollisions,
  checkForGameOver,
} from "../../utils";
import { Direction } from "./gameReducer.utils";

interface UseGameLoopReturn {
  state: GameState;
  newGame: VoidFunction;
}

export function useGameLoop(size: BoardDim): UseGameLoopReturn {
  const [gameState, dispatch] = useReducer(gameReducer, size, () =>
    newDefaultGameState(size),
  );

  const isGameActive = gameState.status === "active";
  useGameKeys(dispatch, isGameActive);

  useInterval(
    () => {
      if (checkForCollisions(gameState)) {
        dispatch({ type: "SAVE_PIECE_POSITION" });
      }
      dispatch({ type: "NEXT_TICK" });
    },
    isGameActive ? gameState.tickInterval : null,
  );

  // TODO: pull me into a separate hook
  // useGameEffects or something
  useEffect(() => {
    if (!isGameActive) {
      return;
    }
    if (checkForGameOver(gameState)) {
      console.log("game over", gameState);
      dispatch({ type: "GAME_OVER" });
    } else if (!gameState.activePiece) {
      dispatch({ type: "NEXT_PIECE" });
      return;
    }

    const clearedRows = checkForClearedRows(gameState);
    if (clearedRows.length) {
      dispatch({ type: "CLEAR_ROWS", rows: clearedRows });
    }
  });

  return { state: gameState, newGame: () => dispatch({ type: "NEW_GAME" }) };
}

function useGameKeys(dispatch: React.Dispatch<GameAction>, enabled: boolean) {
  useKeydown(
    Keys.left,
    () => dispatch({ type: "MOVE_ACTIVE_PIECE", direction: Direction.LEFT }),
    enabled,
  );
  useKeydown(
    Keys.right,
    () => dispatch({ type: "MOVE_ACTIVE_PIECE", direction: Direction.RIGHT }),
    enabled,
  );
  useKeydown(
    Keys.down,
    () => dispatch({ type: "MOVE_ACTIVE_PIECE", direction: Direction.DOWN }),
    enabled,
  );

  useKeydown(
    Keys.space,
    () => dispatch({ type: "ROTATE_ACTIVE_PIECE" }),
    enabled,
  );

  useKeydown(Keys.up, () => dispatch({ type: "DROP_PIECE" }), enabled);

  useKeydown(Keys.esc, () => dispatch({ type: "PAUSE" }));

  useKeydown(Keys.shiftLeft, () => dispatch({ type: "HOLD_PIECE" }), enabled);
}
