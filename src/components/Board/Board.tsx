import { FC } from "react";
import { BoardProps } from "./Board.types";
import { ActiveBlock, Block, OccupiedBlock } from "../Block";
import "./Board.css";
import { pieceToBoardCoordinates } from "../../utils/piece";

export const Board: FC<BoardProps> = ({ state }) => {
  const { board, activePiece } = state;
  const coords = activePiece ? pieceToBoardCoordinates(activePiece) : null;
  return (
    <>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((value, j) => {
              const isActivePieceSquare =
                coords?.find((c) => c.x === j && c.y === i) !== undefined;
              if (isActivePieceSquare) {
                return <ActiveBlock key={j} />;
              } else if (value) {
                return <OccupiedBlock key={j} />;
              } else {
                return <Block key={j} />;
              }
            })}
          </div>
        ))}
      </div>
    </>
  );
};
