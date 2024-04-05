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
      <div className="board flex flex-col">
        {board.map((row, i) => (
          <div key={i} className="flex w-full grow">
            {row.map((square, j) => {
              const isActivePieceSquare =
                pieceCoords?.find((c) => c.x === j && c.y === i) !== undefined;

              const isPieceProjectionSquare =
                projectionCoords?.find((c) => c.x === j && c.y === i) !==
                undefined;
              if (isActivePieceSquare) {
                return <ActiveBlock key={j} color={activePiece?.proto.color} />;
              } else if (square.value) {
                return <OccupiedBlock key={j} color={board[i][j].color} />;
              } else if (isPieceProjectionSquare) {
                return (
                  <ProjectionBlock key={j} color={activePiece?.proto.color} />
                );
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
