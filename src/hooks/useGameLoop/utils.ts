import { randomPiece } from "../../types";
import { PieceState, BoardArray, BoardDim, GameState, Pos } from "./types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

export function createRow(len: number): Array<0 | 1> {
  return new Array(len).fill(0);
}

export function createActivePiece(size: BoardDim): PieceState {
  const { matrix, color } = randomPiece();

  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { origin: startingPos, matrix, color };
}

export function checkForCollisions(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const { matrix } = activePiece;
  const lastRow = board.length - 1;

  // TODO: can probably just iterate over bottom row here
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!matrix[y][x]) return false;

      if (y >= lastRow) {
        return true;
      }

      if (board[y + 1][x] !== 0) {
        return true;
      }
    }
  }

  return false;
}

export function checkForGameOver(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const { matrix } = activePiece;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      // TODO: this is definitely wrong
      if (board[y][x] !== 0) {
        return true;
      }
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
