import { FC } from "react";
import { BoardProps } from "./Board.types";
import { ActiveBlock, Block, OccupiedBlock, ProjectionBlock } from "../Block";
import "./Board.css";
import {
  getPieceProjectionCoords,
  pieceToBoardCoordinates,
} from "../../utils/piece";

export const Board: FC<BoardProps> = ({ state }) => {
  const { board, activePiece } = state;
  const pieceCoords = activePiece ? pieceToBoardCoordinates(activePiece) : null;
  const projectionCoords = getPieceProjectionCoords(state);
  return (
    <>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((value, j) => {
              const isActivePieceSquare =
                pieceCoords?.find((c) => c.x === j && c.y === i) !== undefined;

              const isPieceProjectionSquare =
                projectionCoords?.find((c) => c.x === j && c.y === i) !==
                undefined;
              if (isActivePieceSquare) {
                return <ActiveBlock key={j} />;
              } else if (value) {
                return <OccupiedBlock key={j} />;
              } else if (isPieceProjectionSquare) {
                return <ProjectionBlock key={j} />;
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
