import { GameState, Pos } from "./types";
import { createActivePiece, createBoard, createRow } from "./utils";

export type GameAction =
  | { type: "CREATE_ACTIVE_PIECE" }
  | { type: "SAVE_PIECE_POSITION" }
  | { type: "GAME_OVER" }
  | { type: "NEXT_TICK" }
  | { type: "MOVE_ACTIVE_PIECE"; direction: "LEFT" | "RIGHT" }
  | { type: "CLEAR_ROWS"; rows: Array<number> };

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
        activePiece: createActivePiece(state.size),
      };
    case "SAVE_PIECE_POSITION": {
      if (state.activePiece === undefined) {
        return state;
      }
      const newBoard = [...state.board];

      const { pos } = state.activePiece;
      const newRow = [...newBoard[pos.y]];
      newRow[pos.x] = newRow[pos.x] ? 0 : 1;
      newBoard.splice(pos.y, 1, newRow);

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
      const { pos } = state.activePiece!;
      const { x: currX, y: currY } = pos;
      const nextPos: Pos = { x: currX, y: currY + 1 };

      return {
        ...state,
        activePiece: { ...state.activePiece, pos: nextPos },
      };
    }
    case "MOVE_ACTIVE_PIECE": {
      // guard against race condition where action is called before a new piece exists
      if (!state.activePiece) {
        return state;
      }
      const { pos } = state.activePiece;
      const nextPos = { ...pos };

      if (action.direction === "LEFT") {
        nextPos.x = pos.x > 0 ? pos.x - 1 : pos.x;
      } else {
        const colLimit = state.board[0].length - 1;
        nextPos.x = pos.x < colLimit ? pos.x + 1 : pos.x;
      }
      return {
        ...state,
        activePiece: { ...state.activePiece, pos: nextPos },
      };
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
    default:
      return state;
  }
}
