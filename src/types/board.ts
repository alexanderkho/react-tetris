/**
 * 2-dimensional array representing the board state.
 * 0 = unoccupied square, 1 = occupied by non-falling square
 * e.g. [2, 4] = [w, l]
 *
 * [
 *   [0, 0],
 *   [0, 0],
 *   [0, 0],
 *   [0, 0],
 * ]
 *
 * */
type UnoccupiedSquare = {
  value: 0;
  color?: never;
};

type OccupiedSquare = {
  value: 1;
  color: string;
};

export type Square = UnoccupiedSquare | OccupiedSquare;

export type BoardArray = Array<Array<Square>>;

export type BoardDim = [number, number]; //[width, length]

export interface Pos {
  x: number; // horizontal
  y: number; // vertical
}
