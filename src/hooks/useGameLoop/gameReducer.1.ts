import { createBoard, createRow, newPiece, rotatePiece } from "../../utils";
import { moveActivePiece, saveActivePiecePosition } from "./gameReducer.utils";
import { GameState } from "./types";
import { GameAction } from "./gameReducer";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "GAME_OVER":
      return {
        ...state,
        board: createBoard(state.size),
        activePiece: undefined,
      };
    case "CREATE_ACTIVE_PIECE":
      return {
        ...state,
        activePiece: newPiece(state.size),
      };
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
    case "CLEAR_ROWS": {
      const newBoard = [...state.board];
      const boardWidth = state.size[0];

      action.rows.forEach((r) => {
        newBoard[r] = createRow(boardWidth);
      });

      return {
        ...state,
        board: newBoard,
      };
    }
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
    default:
      return state;
  }
}
