import { FC } from "react";
import { GameState } from "../../types";
import { PiecePreview, PieceQueue } from "../PieceQueue";

export const GameStatus: FC<{ state: GameState }> = ({ state }) => {
  return (
    <div className="text-left border-2 border-gray-500 divide-y divide-gray-500 p-4 rounded-md ml-2">
      <p>Score: {state.score}</p>
      <PieceQueue queue={state.pieceQueue} />
      {state.holdPiece && (
        <div className="items-center">
          <p>Hold</p>
          <PiecePreview piece={state.holdPiece} />
        </div>
      )}
    </div>
  );
};
