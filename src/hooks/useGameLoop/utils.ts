import { ActivePiece, BoardArray, BoardDim, GameState, Pos } from "./types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

export function createRow(len: number): Array<0 | 1> {
  return new Array(len).fill(0);
}

type Piece = Array<Array<0 | 1>>;

const pieces: Record<string, Piece> = {
  square: [
    [1, 1],
    [1, 1],
  ],
  line: [[1], [1], [1], [1]],
};

function randomPiece(): Piece {
  const keys = Object.keys(pieces);
  const randomPieceIdx = Math.floor(Math.random() * keys.length);
  return pieces[keys[randomPieceIdx]];
}

export function createActivePiece(size: BoardDim): ActivePiece {
  const piece = randomPiece();
  piece;

  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  // TODO: stop hard coding this
  const coords: Array<Pos> = [
    startingPos,
    { ...startingPos, y: startingPos.y + 1 },
    { ...startingPos, x: startingPos.x + 1 },
    { y: startingPos.y + 1, x: startingPos.x + 1 },
  ];

  return { coords };
}

export function checkForCollisions(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const { coords } = activePiece;
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
  const { coords } = activePiece;
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
