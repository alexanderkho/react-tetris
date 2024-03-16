export type BoardDim = [number, number]; //[width, length]

export type BoardArray = Array<Array<0 | 1>>;

export interface BoardProps {
  size: BoardDim;
}
