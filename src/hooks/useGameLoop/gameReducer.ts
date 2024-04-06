import { GameState, newDefaultGameState } from "../../types";
import {
  getRandomPieceProto,
  initializePieceStateFromProto,
  rotatePiece,
} from "../../utils";
import {
  Direction,
  clearRows,
  dropPiece,
  holdPiece,
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
  | { type: "NEW_GAME" }
  | { type: "DROP_PIECE" }
  | { type: "HOLD_PIECE" };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "GAME_OVER":
      return {
        ...state,
        status: "game-over",
      };
    case "NEXT_PIECE": {
      const nextQueue = [...state.pieceQueue];
      const nextPiece = initializePieceStateFromProto(
        state.size,
        nextQueue.shift()!,
      );
      nextQueue.push(getRandomPieceProto());
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
    case "DROP_PIECE":
      return dropPiece(state);
    case "HOLD_PIECE":
      return holdPiece(state);
    default:
      return state;
  }
}
