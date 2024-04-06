import { FC } from "react";
import { PiecePreviewProps, PieceQueueProps } from "./PieceQueue.types";
import { Pieces } from "../../types";

export const PieceQueue: FC<PieceQueueProps> = ({ queue }) => {
  return (
    <div className="flex flex-col w-full items-center">
      {queue.map((piece, i) => (
        <div className="flex flex-col w-100 my-2" key={i}>
          <PiecePreview piece={piece} />
        </div>
      ))}
    </div>
  );
};

export const PiecePreview: FC<PiecePreviewProps> = ({ piece }) => {
  return piece.matrix.map((row, j) => (
    <div className="w-full flex" key={j}>
      {row.map((cell, k) =>
        cell === 1 ? (
          <div
            className="size-5 border-gray-500 border"
            style={{ background: piece.color }}
            key={k}
          />
        ) : (
          <div className="size-5 border-transparent border" key={k} />
        ),
      )}
    </div>
  ));
};

// TODO: remove me
export const PreviewContainer: FC = () => {
  const pieces = Object.values(Pieces);
  return (
    <>
      {pieces.map((p) => (
        <PiecePreview piece={p} />
      ))}
    </>
  );
};
