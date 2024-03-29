import { BoardArray, BoardDim } from "../types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

export function createRow(len: number): Array<0 | 1> {
  return new Array(len).fill(0);
}
