export interface PieceProps {
  piece: PieceData;
}

export enum PieceType {
  Square = "square",
  LineL = "line-l",
}

export type PieceData = {
  matrix: DotMatrix;
  type: PieceType;
};

export type DotMatrix = Array<Array<DotMatrixValue>>;

// 0 = empty, 1 = filled
export type DotMatrixValue = 0 | 1;

export const square: PieceData = {
  matrix: [
    [1, 1],
    [1, 1],
  ],
  type: PieceType.Square,
};

export const lineL: PieceData = {
  matrix: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  type: PieceType.LineL,
};
