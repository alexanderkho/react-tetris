import { FC, useEffect, useRef, useState } from "react";
import { BoardArray, BoardDim, BoardProps } from "./Board.types";
import { Block } from "../Block";
import "./Board.css";

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

function createBoard(size: BoardDim) {
  const [w, l] = size;
  return new Array(l).fill([...createRow(w)]);
}

function createRow(len: number): Array<number> {
  return new Array(len).fill(0);
}

export const Board: FC<BoardProps> = ({ size }) => {
  const board = useGameLoop(size);
  return board.map((row, i) => (
    <div key={i} className="row">
      {row.map((value, j) => (
        <Block key={j} value={value} />
      ))}
    </div>
  ));
};

interface GameLoop {
  board: BoardArray;
  tickInterval: number; // ms
  activePiece?: ActivePiece;
}

interface ActivePiece {
  pos: Pos;
}

type Pos = [number, number]; // x, y

function createActivePiece(size: BoardDim): ActivePiece {
  const boardWidth = size[0];
  const startingXPos = Math.floor(boardWidth / 2);

  return { pos: [startingXPos, 0] };
}

function useGameLoop(size: BoardDim) {
  const [gameLoop, setGameLoop] = useState<GameLoop>({
    board: createBoard(size),
    tickInterval: 500,
  });

  useInterval(function () {
    if (!gameLoop.activePiece) {
      const newPiece = createActivePiece(size);
      const [newX, newY] = newPiece.pos;
      setGameLoop((gl) => {
        const newBoard = [...gl.board];
        const newRow = [...newBoard[newY]];
        newRow[newX] = 1;
        newBoard.splice(newY, 1, newRow);
        return { ...gl, activePiece: newPiece, board: newBoard };
      });
      return;
    }
    const { pos } = gameLoop.activePiece;
    const [currX, currY] = pos;

    if (checkForGameOver(gameLoop.board)) {
      alert("GAME OVER");
      window.location.reload();
    }

    if (checkForCollisions(gameLoop.board, pos)) {
      setGameLoop((gl) => ({
        ...gl,
        activePiece: undefined,
      }));
    } else {
      const nextPos: Pos = [currX, currY + 1];
      setGameLoop((gl) => {
        const newBoard = [...gl.board];
        // unset current pos, set next pos
        const currRowNextState = [...newBoard[currY]];
        const nextRowNextState = [...newBoard[nextPos[1]]];
        currRowNextState[currX] = 0;
        nextRowNextState[currX] = 1;
        newBoard.splice(currY, 1, currRowNextState);
        newBoard.splice(nextPos[1], 1, nextRowNextState);
        return {
          ...gl,
          board: newBoard,
          activePiece: { ...gl.activePiece, pos: nextPos },
        };
      });
    }
  }, gameLoop.tickInterval);

  return gameLoop.board;
}

function checkForCollisions(board: BoardArray, pos: Pos): boolean {
  const [x, y] = pos;
  const boardHeight = board.length - 1;

  if (y >= boardHeight) {
    return true;
  }

  if (board[y + 1][x] !== 0) {
    return true;
  }

  return false;
}

function checkForGameOver(board: BoardArray): boolean {
  // for now, just check if anything is touching the top row
  board;
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
