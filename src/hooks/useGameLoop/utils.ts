import { pieceToBoardCoordinates } from "../../types";
import { BoardArray, BoardDim, GameState } from "./types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

export function createRow(len: number): Array<0 | 1> {
  return new Array(len).fill(0);
}

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

// interface Rect {
//   l: Pos; // x/y coord of upper left corner
//   r: Pos; // x/y coord of bottom right corner
// }

// export function rotatePiece(piece: PieceState): PieceState {
//   // find bounding rect of piece
//   const xCoords = piece.coords.map(c => c.x)
//   const yCoords = piece.coords.map(c => c.y)
//   const boundingRect: Rect = {
//     l: {x: Math.min(...xCoords), y: Math.min(...yCoords)},
//     r: {x: Math.max(...xCoords), y: Math.max(...yCoords)}
//   }
//
//
//   min
// }
