export type PieceMatrix = Array<Array<0 | 1>>;

interface Piece {
  matrix: PieceMatrix;
  color: string;
}

export const Pieces: Record<string, Piece> = {
  square: {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "blue",
  },
  line: {
    matrix: [[1], [1], [1], [1]],
    color: "orange",
  },
  skew: {
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
  skewReverse: {
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "yellow",
  },
  tee: {
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "cyan",
  },
  ell: {
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "red",
  },
  ellReverse: {
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "magenta",
  },
};

export function randomPiece(): Piece {
  const keys = Object.keys(Pieces);
  const randomPieceIdx = Math.floor(Math.random() * keys.length);
  return Pieces[keys[randomPieceIdx]];
}
