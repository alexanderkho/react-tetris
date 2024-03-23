import { ActivePiece, BoardArray, BoardDim, GameState, Pos } from "./types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

export function createRow(len: number): Array<0 | 1> {
  return new Array(len).fill(0);
}

export function createActivePiece(size: BoardDim): ActivePiece {
  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { pos: startingPos };
}

export function checkForCollisions(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const { pos } = activePiece;
  const { x, y } = pos;
  const boardHeight = board.length - 1;

  if (y >= boardHeight) {
    return true;
  }

  if (board[y + 1][x] !== 0) {
    return true;
  }

  return false;
}

export function checkForGameOver(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const { x, y } = activePiece.pos;
  if (board[y][x] !== 0) {
    return true;
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
