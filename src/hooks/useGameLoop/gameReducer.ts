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

      const { coords } = state.activePiece;

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
      const { coords } = state.activePiece;
      const newCoords: Array<Pos> = coords.map((c) => ({
        x: c.x,
        y: c.y + 1,
      }));

      return {
        ...state,
        activePiece: { ...state.activePiece, coords: newCoords },
      };
    }
    case "MOVE_ACTIVE_PIECE": {
      // guard against race condition where action is called before a new piece exists
      if (!state.activePiece) {
        return state;
      }
      const { coords } = state.activePiece;
      let newCoords: Array<Pos>;

      if (action.direction === "LEFT") {
        const isPieceAtLeftBound = coords.some((c) => c.x === 0);
        newCoords = isPieceAtLeftBound
          ? coords
          : coords.map((c) => ({ ...c, x: c.x - 1 }));
      } else {
        const isPieceAtRightBound = coords.some(
          (c) => c.x === state.board[0].length - 1,
        );
        newCoords = isPieceAtRightBound
          ? coords
          : coords.map((c) => ({ ...c, x: c.x + 1 }));
      }
      return {
        ...state,
        activePiece: { ...state.activePiece, coords: newCoords },
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
