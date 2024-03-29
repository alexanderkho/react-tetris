import {
  Direction,
  createBoard,
  createRow,
  moveActivePiece,
  newPiece,
  pieceToBoardCoordinates,
  rotatePiece,
} from "../../utils";
import { GameState } from "./types";

export type GameAction =
  | { type: "CREATE_ACTIVE_PIECE" }
  | { type: "SAVE_PIECE_POSITION" }
  | { type: "GAME_OVER" }
  | { type: "NEXT_TICK" }
  | { type: "MOVE_ACTIVE_PIECE"; direction: Direction }
  | { type: "CLEAR_ROWS"; rows: Array<number> }
  | { type: "ROTATE_ACTIVE_PIECE" };

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
    case "SAVE_PIECE_POSITION": {
      if (state.activePiece === undefined) {
        return state;
      }
      const newBoard = [...state.board];

      const coords = pieceToBoardCoordinates(state.activePiece);

      // TODO: can update each row at once to speedup/simplify this
      for (const { x, y } of coords) {
        const newRow = [...newBoard[y]];
        newRow[x] = newRow[x] ? 0 : 1;
        newBoard.splice(y, 1, newRow);
      }

      return {
        ...state,
        board: newBoard,
        activePiece: undefined,
      };
    }
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
    case "MOVE_ACTIVE_PIECE": {
      // guard against race condition where action is called before a new piece exists
      return moveActivePiece(state, action.direction);
    }
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
