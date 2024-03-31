import { FC } from "react";
import { PiecePreviewProps, PieceQueueProps } from "./PieceQueue.types";
import "./PieceQueue.css";

export const PieceQueue: FC<PieceQueueProps> = ({ queue }) => {
  return (
    <div className="piece-queue">
      {queue.map((piece, i) => (
        <div className="queue-item" key={i}>
          <PiecePreview piece={piece.proto} />
        </div>
      ))}
    </div>
  );
};

export const PiecePreview: FC<PiecePreviewProps> = ({ piece }) => {
  return piece.matrix.map((row, j) => (
    <div className="queue-row" key={j}>
      {row.map((cell, k) =>
        cell === 1 ? (
          <div
            className="queue-block occupied"
            style={{ background: piece.color }}
            key={k}
          />
        ) : (
          <div className="queue-block" key={k} />
        ),
      )}
    </div>
  ));
};
