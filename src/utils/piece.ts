import {
  BoardDim,
  Coords,
  PieceMatrix,
  PieceProto,
  PieceState,
  Pieces,
  Pos,
} from "../types";

export function randomPiece(): PieceProto {
  const keys = Object.keys(Pieces);
  const randomPieceIdx = Math.floor(Math.random() * keys.length);
  return Pieces[keys[randomPieceIdx]];
}

export function newPiece(size: BoardDim): PieceState {
  const proto = randomPiece();

  const boardWidth = size[0];
  const startingPos: Pos = {
    x: Math.floor(boardWidth / 2),
    y: 0,
  };

  return { proto, pos: startingPos, layout: proto.matrix };
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

export function rotatePiece(layout: PieceMatrix): PieceMatrix {
  const roatatedMatrix: PieceMatrix = [];

  for (let x = 0; x < layout[0].length; x++) {
    const newRow: Array<0 | 1> = [];
    for (let y = layout.length - 1; y >= 0; y--) {
      newRow.push(layout[y][x]);
    }
    roatatedMatrix.push(newRow);
  }

  return roatatedMatrix;
}
