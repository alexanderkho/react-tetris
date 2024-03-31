import { PieceProto, PieceState } from "../../types";

export interface PieceQueueProps {
  queue: Array<PieceState>;
}

export interface PiecePreviewProps {
  piece: PieceProto;
}
