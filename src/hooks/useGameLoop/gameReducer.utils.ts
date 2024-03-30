import { GameState, Pos } from "../../types";
import { createRow, pieceToBoardCoordinates } from "../../utils";

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
}

const directionToOffset: Record<Direction, Pos> = {
  LEFT: { y: 0, x: -1 },
  RIGHT: { y: 0, x: 1 },
  DOWN: { y: 1, x: 0 },
};

export function moveActivePiece(
  state: GameState,
  direction: Direction,
): GameState {
  // guard against race condition where action is called before a new piece exists
  if (!state.activePiece) {
    return state;
  }
  const { pos } = state.activePiece;
  const coords = pieceToBoardCoordinates(state.activePiece);

  const offset = directionToOffset[direction];
  const requestedPos = { x: pos.x + offset.x, y: pos.y + offset.y };
  const requestedCoords = coords.map((c) => ({
    x: c.x + offset.x,
    y: c.y + offset.y,
  }));

  const canMove = requestedCoords.every(
    (c) =>
      c.x >= 0 &&
      c.x < state.board[0].length &&
      c.y < state.board.length &&
      state.board[c.y][c.x] === 0,
  );

  const newPos = canMove ? requestedPos : pos;

  return {
    ...state,
    activePiece: { ...state.activePiece, pos: newPos },
  };
}

export function saveActivePiecePosition(state: GameState): GameState {
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

export function clearRows(state: GameState, rows: Array<number>): GameState {
  const newBoard = [...state.board];
  const boardWidth = state.size[0];

  const rowCount = rows.length;

  for (let y = 0; y <= rows[rows.length - 1]; y++) {
    if (y - rowCount >= 0) {
      newBoard[y] = state.board[y - rowCount];
    } else {
      newBoard[y] = createRow(boardWidth);
    }
  }

  return {
    ...state,
    board: newBoard,
    score: state.score + rowCount,
  };
}
