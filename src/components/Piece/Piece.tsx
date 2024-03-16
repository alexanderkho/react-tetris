import { FC } from "react";
import "./Piece.css";
import { PieceProps } from "./Piece.types";

export const Piece: FC<PieceProps> = ({ piece }) => {
  return (
    <>
      {piece.matrix.map((row, i) => (
        <div className="row" key={i}>
          {row.map((dot, j) => (
            <div
              key={j}
              className={`${piece.type} dot${dot ? " filled" : ""}`}
            />
          ))}
        </div>
      ))}
    </>
  );
};
