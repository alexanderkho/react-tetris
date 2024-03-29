import { Pos } from "./board";

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

export interface PieceState {
  proto: PieceProto;
  pos: Pos;
  layout: PieceMatrix;
}

export type Coords = Array<Pos>;
