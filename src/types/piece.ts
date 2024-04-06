import { Pos } from "./board";

export type PieceMatrix = Array<Array<0 | 1>>;

export interface PieceProto {
  name: string;
  matrix: PieceMatrix;
  color: string;
  origin: [number, number]; // [col, row]
}

export enum PieceName {
  square = "square",
  line = "line",
  skew = "skew",
  skewReverse = "skewReverse",
  tee = "tee",
  ell = "ell",
  ellReverse = "ellReverse",
}

export const Pieces: Record<PieceName, PieceProto> = {
  square: {
    name: "Square",
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "#facc15",
    origin: [0, 0],
  },
  line: {
    name: "Line",
    matrix: [[1], [1], [1], [1]],
    color: "#059669",
    origin: [0, 0],
  },
  skew: {
    name: "Skew",
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#1d4ed8",
    origin: [0, 1],
  },
  skewReverse: {
    name: "Skew reverse",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#ef4444",
    origin: [0, 1],
  },
  tee: {
    name: "Tee",
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "#d946ef",
    origin: [0, 1],
  },
  ell: {
    name: "L",
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "#f97316",
    origin: [0, 0],
  },
  ellReverse: {
    name: "L reverse",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "#22d3ee",
    origin: [0, 0],
  },
};

export interface PieceState {
  proto: PieceProto;
  pos: Pos;
  layout: PieceMatrix;
}

export type Coords = Array<Pos>;
