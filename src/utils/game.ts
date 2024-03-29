import { GameState } from "../types";
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
