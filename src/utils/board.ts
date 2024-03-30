import { BoardArray, BoardDim, Square } from "../types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

export function createRow(len: number): Array<Square> {
  return new Array(len).fill({ value: 0 });
}
