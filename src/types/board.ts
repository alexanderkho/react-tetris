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
export type BoardArray = Array<Array<0 | 1>>;

export type BoardDim = [number, number]; //[width, length]

export interface Pos {
  x: number; // horizontal
  y: number; // vertical
}
