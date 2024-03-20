export interface GameState {
  board: BoardArray;
  /**
   * the currently in-play piece
   * holds it's own own x/y position
   * */
  activePiece?: ActivePiece;
  /**
   * fall rate in ms
   * */
  tickInterval: number;
  /**
   * board size
   * */
  size: BoardDim;
}

export type BoardDim = [number, number]; //[width, length]

/**
 * 2-dimensional array representing the board.
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

export interface ActivePiece {
  pos: Pos;
}

export interface Pos {
  x: number; // horizontal
  y: number; // vertical
}
