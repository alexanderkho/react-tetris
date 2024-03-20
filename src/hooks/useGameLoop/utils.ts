import { useEffect, useRef } from "react";
import { ActivePiece, BoardArray, BoardDim, GameState, Pos } from "./types";

export function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

function createRow(len: number): Array<number> {
  return new Array(len).fill(0);
}

export function createActivePiece(size: BoardDim): ActivePiece {
  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { pos: startingPos };
}

export function checkForCollisions(board: BoardArray, pos: Pos): boolean {
  const { x, y } = pos;
  const boardHeight = board.length - 1;

  if (y >= boardHeight) {
    return true;
  }

  if (board[y + 1][x] !== 0) {
    return true;
  }

  return false;
}

export function checkForGameOver(state: GameState): boolean {
  const { board, activePiece } = state;
  if (!activePiece) {
    return false;
  }
  const { x, y } = activePiece.pos;
  if (board[y][x] !== 0) {
    return true;
  }
  return false;
}

export function useInterval(callback: VoidFunction, delay: number) {
  const savedCallback = useRef<VoidFunction>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
