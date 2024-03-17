import { useEffect, useRef, useState } from "react";

export type BoardDim = [number, number]; //[width, length]

export type BoardArray = Array<Array<0 | 1>>;

interface GameLoop {
  board: BoardArray;
  tickInterval: number; // ms
  activePiece?: ActivePiece;
}

interface ActivePiece {
  pos: Pos;
}

interface Pos {
  x: number; // horizontal
  y: number; // vertical
}

/**
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
function createBoard(size: BoardDim): BoardArray {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

function createRow(len: number): Array<number> {
  return new Array(len).fill(0);
}

function createActivePiece(size: BoardDim): ActivePiece {
  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { pos: startingPos };
}

export function useGameLoop(size: BoardDim): BoardArray {
  const [gameLoop, setGameLoop] = useState<GameLoop>({
    board: createBoard(size),
    tickInterval: 100,
  });

  function reset() {
    setGameLoop((gl) => ({
      ...gl,
      board: createBoard(size),
      activePiece: undefined,
    }));
  }

  function toggleSquares(...coords: Array<Pos>) {
    const newBoard = [...gameLoop.board];

    coords.forEach((pos) => {
      const newRow = [...newBoard[pos.y]];
      newRow[pos.x] = newRow[pos.x] ? 0 : 1;
      newBoard.splice(pos.y, 1, newRow);
    });

    setGameLoop((gl) => ({ ...gl, board: newBoard }));
  }

  useInterval(function () {
    if (!gameLoop.activePiece) {
      const newPiece = createActivePiece(size);
      if (checkForGameOver(gameLoop.board, newPiece)) {
        alert("GAME OVER");
        reset();
        return;
      }
      toggleSquares(newPiece.pos);
      setGameLoop((gl) => ({ ...gl, activePiece: newPiece }));
      return;
    }
    if (checkForCollisions(gameLoop.board, gameLoop.activePiece.pos)) {
      setGameLoop((gl) => ({
        ...gl,
        activePiece: undefined,
      }));
    } else {
      const { pos } = gameLoop.activePiece;
      const { x: currX, y: currY } = pos;
      const nextPos: Pos = { x: currX, y: currY + 1 };

      toggleSquares(pos, nextPos);
      setGameLoop((gl) => {
        return {
          ...gl,
          activePiece: { ...gl.activePiece, pos: nextPos },
        };
      });
    }
  }, gameLoop.tickInterval);

  return gameLoop.board;
}

function checkForCollisions(board: BoardArray, pos: Pos): boolean {
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

function checkForGameOver(board: BoardArray, newPiece: ActivePiece): boolean {
  const { x, y } = newPiece.pos;
  if (board[y][x] !== 0) {
    return true;
  }
  return false;
}

function useInterval(callback: VoidFunction, delay: number) {
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
