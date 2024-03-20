import { GameState, Pos } from "./types";
import { createActivePiece, createBoard } from "./utils";

type Action =
  | { type: "CREATE_ACTIVE_PIECE" }
  | { type: "SAVE_PIECE_POSITION" }
  | { type: "GAME_OVER" }
  | { type: "NEXT_TICK" };

export function gameReducer(state: GameState, action: Action): GameState {
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
      const { pos } = state.activePiece!;
      const { x: currX, y: currY } = pos;
      const nextPos: Pos = { x: currX, y: currY + 1 };

      return {
        ...state,
        activePiece: { ...state.activePiece, pos: nextPos },
      };
    }
    default:
      return state;
  }
}
