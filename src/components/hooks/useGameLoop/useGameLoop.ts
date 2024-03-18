import { useEffect, useRef, useState } from "react";

export type BoardDim = [number, number]; //[width, length]

export type BoardArray = Array<Array<0 | 1>>;

interface GameState {
  /**
   * 2-dimensional array representing the board.
   * 0 = unoccupied square, 1 = occupied by non-falling square
   * */
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

export function useGameLoop(size: BoardDim): GameState {
  const [gameState, setGameState] = useState<GameState>({
    board: createBoard(size),
    tickInterval: 100,
  });

  function reset() {
    setGameState((prev) => ({
      ...prev,
      board: createBoard(size),
      activePiece: undefined,
    }));
  }

  function toggleSquares(...coords: Array<Pos>) {
    const newBoard = [...gameState.board];

    coords.forEach((pos) => {
      const newRow = [...newBoard[pos.y]];
      newRow[pos.x] = newRow[pos.x] ? 0 : 1;
      newBoard.splice(pos.y, 1, newRow);
    });

    setGameState((prev) => ({ ...prev, board: newBoard }));
  }

  useInterval(function () {
    // add an active piece if one does not exist
    if (!gameState.activePiece) {
      const newPiece = createActivePiece(size);
      if (checkForGameOver(gameState.board, newPiece)) {
        alert("GAME OVER");
        reset();
        return;
      }
      setGameState((prev) => ({ ...prev, activePiece: newPiece }));
      return;
    }
    // if there is a collision:
    // - save the current active piece pos to board state
    // - remove the active piece
    if (checkForCollisions(gameState.board, gameState.activePiece.pos)) {
      setGameState((prev) => ({
        ...prev,
        activePiece: undefined,
      }));
      toggleSquares(gameState.activePiece.pos);
      // otherwise, move active piece down one square
    } else {
      const { pos } = gameState.activePiece;
      const { x: currX, y: currY } = pos;
      const nextPos: Pos = { x: currX, y: currY + 1 };

      setGameState((prev) => {
        return {
          ...prev,
          activePiece: { ...prev.activePiece, pos: nextPos },
        };
      });
    }
  }, gameState.tickInterval);

  return gameState;
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
