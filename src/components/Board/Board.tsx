import { FC } from "react";
import { BoardProps } from "./Board.types";
import { Block } from "../Block";
import "./Board.css";
import { useGameLoop } from "../hooks/useGameLoop";

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
