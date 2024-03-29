import { BoardDim, Pos } from "../hooks/useGameLoop";

export type PieceMatrix = Array<Array<0 | 1>>;

export interface PieceProto {
  matrix: PieceMatrix;
  color: string;
  origin: [number, number]; // [col, row]
}

export const Pieces: Record<string, PieceProto> = {
  square: {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "blue",
    origin: [0, 0],
  },
  line: {
    matrix: [[1], [1], [1], [1]],
    color: "orange",
    origin: [0, 0],
  },
  skew: {
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
    origin: [0, 1],
  },
  skewReverse: {
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "yellow",
    origin: [0, 1],
  },
  tee: {
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "cyan",
    origin: [0, 1],
  },
  ell: {
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "red",
    origin: [0, 0],
  },
  ellReverse: {
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "magenta",
    origin: [0, 0],
  },
};

export function randomPiece(): PieceProto {
  const keys = Object.keys(Pieces);
  const randomPieceIdx = Math.floor(Math.random() * keys.length);
  return Pieces[keys[randomPieceIdx]];
}

export interface PieceState {
  proto: PieceProto;
  pos: Pos;
  layout: PieceMatrix;
}

export function newPiece(size: BoardDim): PieceState {
  const proto = randomPiece();

  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { proto, pos: startingPos, layout: proto.matrix };
}

type Coords = Array<Pos>;

export function pieceToBoardCoordinates(piece: PieceState): Coords {
  const {
    proto: { origin },
    pos,
    layout,
  } = piece;

  return layout.reduce((acc, row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const offsetX = x - origin[1];
        const offsetY = y - origin[0];
        acc.push({ x: pos.x + offsetX, y: pos.y + offsetY });
      }
    });
    return acc;
  }, [] as Array<Pos>);
}

export function rotatePiece(layout: PieceMatrix): PieceMatrix {
  const roatatedMatrix: PieceMatrix = [];

  for (let x = 0; x < layout[0].length; x++) {
    const newRow: Array<0 | 1> = [];
    for (let y = layout.length - 1; y >= 0; y--) {
      newRow.push(layout[y][x]);
    }
    roatatedMatrix.push(newRow);
  }

  return roatatedMatrix;
}
