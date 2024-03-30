import { Pos } from "./board";

export type PieceMatrix = Array<Array<0 | 1>>;

export interface PieceProto {
  name: string;
  matrix: PieceMatrix;
  color: string;
  origin: [number, number]; // [col, row]
}

export const Pieces: Record<string, PieceProto> = {
  square: {
    name: "Square",
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "#5879db",
    origin: [0, 0],
  },
  line: {
    name: "Line",
    matrix: [[1], [1], [1], [1]],
    color: "#fcba03",
    origin: [0, 0],
  },
  skew: {
    name: "Skew",
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#edf55b",
    origin: [0, 1],
  },
  skewReverse: {
    name: "Skew reverse",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#5dbf08",
    origin: [0, 1],
  },
  tee: {
    name: "Tee",
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "#09e8d2",
    origin: [0, 1],
  },
  ell: {
    name: "L",
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "#e3104f",
    origin: [0, 0],
  },
  ellReverse: {
    name: "L reverse",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "#9210e8",
    origin: [0, 0],
  },
};

export interface PieceState {
  proto: PieceProto;
  pos: Pos;
  layout: PieceMatrix;
}

export type Coords = Array<Pos>;
