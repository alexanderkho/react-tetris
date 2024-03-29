import { GameState, Pos } from "../types";
import { pieceToBoardCoordinates } from "./piece";

export function checkForCollisions(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const coords = pieceToBoardCoordinates(activePiece);
  const lastRow = board.length - 1;

  // TODO: can probably just iterate over bottom row here
  for (const { x, y } of coords) {
    if (y >= lastRow) {
      return true;
    }

    if (board[y + 1][x] !== 0) {
      return true;
    }
  }

  return false;
}

export function checkForGameOver(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const coords = pieceToBoardCoordinates(activePiece);
  for (const { x, y } of coords) {
    // TODO: this is probably wrong
    if (board[y][x] !== 0) {
      return true;
    }
  }
  return false;
}

// returns an array with the indices of cleared rows
export function checkForClearedRows(state: GameState): Array<number> {
  const { board } = state;

  return board.reduce((acc, row, i) => {
    if (row.every((s) => s === 1)) {
      acc.push(i);
    }
    return acc;
  }, [] as Array<number>);
}

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

// reducers
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
