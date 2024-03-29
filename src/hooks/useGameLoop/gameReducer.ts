import { newPiece, pieceToBoardCoordinates } from "../../types";
import { GameState, Pos } from "./types";
import { createBoard, createRow } from "./utils";

export type GameAction =
  | { type: "CREATE_ACTIVE_PIECE" }
  | { type: "SAVE_PIECE_POSITION" }
  | { type: "GAME_OVER" }
  | { type: "NEXT_TICK" }
  | { type: "MOVE_ACTIVE_PIECE"; direction: "LEFT" | "RIGHT" | "DOWN" }
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
      if (!state.activePiece) {
        return state;
      }
      const { pos } = state.activePiece;
      const coords = pieceToBoardCoordinates(state.activePiece);
      let newPos: Pos;

      if (action.direction === "LEFT") {
        const isPieceAtLeftBound = coords.some((c) => c.x === 0);
        newPos = isPieceAtLeftBound ? pos : { ...pos, x: pos.x - 1 };
      } else if (action.direction === "RIGHT") {
        const isPieceAtRightBound = coords.some(
          (c) => c.x === state.board[0].length - 1,
        );
        newPos = isPieceAtRightBound ? pos : { ...pos, x: pos.x + 1 };
      } else {
        newPos = { ...pos, y: pos.y + 1 };
      }
      return {
        ...state,
        activePiece: { ...state.activePiece, pos: newPos },
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
    case "ROTATE_ACTIVE_PIECE": {
      // TODO:
      console.log("ROTATE!");
      return state;
    }
    default:
      return state;
  }
}
