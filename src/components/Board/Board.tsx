import { FC } from "react";
import { BoardProps } from "./Board.types";
import { ActiveBlock, Block, OccupiedBlock } from "../Block";
import "./Board.css";
import { useGameLoop } from "../hooks/useGameLoop";

export const Board: FC<BoardProps> = ({ size }) => {
  const { board, activePiece } = useGameLoop(size);
  const { x: activeX, y: activeY } = activePiece?.pos ?? {};
  return board.map((row, i) => (
    <div key={i} className="row">
      {row.map((value, j) => {
        if (i === activeY && j === activeX) {
          return <ActiveBlock key={j} />;
        } else if (value) {
          return <OccupiedBlock key={j} />;
        } else {
          return <Block key={j} />;
        }
      })}
    </div>
  ));
};
