import { GameState, newDefaultGameState } from "../../types";
import { newPiece, rotatePiece } from "../../utils";
import {
  Direction,
  clearRows,
  moveActivePiece,
  saveActivePiecePosition,
} from "./gameReducer.utils";

export type GameAction =
  | { type: "NEXT_PIECE" }
  | { type: "SAVE_PIECE_POSITION" }
  | { type: "GAME_OVER" }
  | { type: "NEXT_TICK" }
  | { type: "MOVE_ACTIVE_PIECE"; direction: Direction }
  | { type: "CLEAR_ROWS"; rows: Array<number> }
  | { type: "ROTATE_ACTIVE_PIECE" }
  | { type: "PAUSE" }
  | { type: "NEW_GAME" };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "GAME_OVER":
      return {
        ...state,
        status: "game-over",
      };
    case "NEXT_PIECE": {
      const nextQueue = [...state.pieceQueue];
      const nextPiece = nextQueue.shift();
      nextQueue.push(newPiece(state.size));
      return {
        ...state,
        activePiece: nextPiece,
        pieceQueue: nextQueue,
      };
    }
    case "SAVE_PIECE_POSITION":
      return saveActivePiecePosition(state);
    case "NEXT_TICK": {
      // guard against race condition where action is called before a new piece exists
      if (!state.activePiece) {
        return state;
      }

      const currentPos = state.activePiece.pos;
      return {
        ...state,
        activePiece: {
          ...state.activePiece,
          pos: { ...currentPos, y: currentPos.y + 1 },
        },
      };
    }
    case "MOVE_ACTIVE_PIECE":
      return moveActivePiece(state, action.direction);
    // TODO: animation effect on row clear
    case "CLEAR_ROWS":
      return clearRows(state, action.rows);
    case "ROTATE_ACTIVE_PIECE": {
      // TODO:
      if (!state.activePiece) {
        return state;
      }

      return {
        ...state,
        activePiece: {
          ...state.activePiece,
          layout: rotatePiece(state.activePiece.layout),
        },
      };
    }
    case "PAUSE": {
      return {
        ...state,
        status:
          state.status === "paused"
            ? "active"
            : state.status === "active"
              ? "paused"
              : state.status,
      };
    }
    case "NEW_GAME": {
      return newDefaultGameState(state.size);
    }
    default:
      return state;
  }
}
