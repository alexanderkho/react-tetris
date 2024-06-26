import {
  BoardDim,
  Coords,
  GameState,
  PieceName,
  PieceProto,
  PieceState,
  Pieces,
  Pos,
} from "../types";

export function getRandomPieceProto(): PieceProto {
  const keys = Object.keys(PieceName) as Array<PieceName>;
  const randomPieceIdx = Math.floor(Math.random() * keys.length);
  return Pieces[keys[randomPieceIdx]];
}

export function initializePieceStateFromProto(
  size: BoardDim,
  proto: PieceProto,
): PieceState {
  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { proto, pos: startingPos, layout: proto.matrix };
}

export function initializePieceQueue(queueSize: number = 4): Array<PieceProto> {
  const queue = [];
  for (let i = 0; i < queueSize; i++) {
    queue.push(getRandomPieceProto());
  }
  return queue;
}

export function pieceToBoardCoordinates(piece: PieceState): Coords {
  const {
    proto: { origin },
    pos,
    layout,
  } = piece;

  return layout.reduce((acc, row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const offsetX = x - origin[1];
        const offsetY = y - origin[0];
        acc.push({ x: pos.x + offsetX, y: pos.y + offsetY });
      }
    });
    return acc;
  }, [] as Array<Pos>);
}

export function getTerminalPiecePosition(state: GameState): Pos {
  if (!state.activePiece) {
    throw new Error("no active piece!");
  }

  const pos = state.activePiece.pos;
  const coords = pieceToBoardCoordinates(state.activePiece);
  let dropPos: Pos | undefined = undefined;
  let i = 0;
  while (!dropPos) {
    const nextOffset = i + 1;
    const nextCoords = coords.map((c) => ({ ...c, y: c.y + nextOffset }));
    if (nextCoords.some((c) => state.board[c.y]?.[c.x]?.value === 1)) {
      dropPos = { ...pos, y: pos.y + i };
    } else if (nextCoords.some((c) => c.y === state.board.length - 1)) {
      dropPos = { ...pos, y: pos.y + nextOffset };
    }
    i++;
  }

  return dropPos;
}

export function getPieceProjectionCoords(state: GameState): Coords | null {
  if (!state.activePiece) {
    return null;
  }
  const terminalPieceState: PieceState = {
    ...state.activePiece,
    pos: getTerminalPiecePosition(state),
  };
  return pieceToBoardCoordinates(terminalPieceState);
}
