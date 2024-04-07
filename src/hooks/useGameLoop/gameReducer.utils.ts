import { GameState, PieceMatrix, PieceState, Pos } from "../../types";
import {
  createRow,
  getRandomPieceProto,
  getTerminalPiecePosition,
  initializePieceStateFromProto,
  pieceToBoardCoordinates,
} from "../../utils";

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
}

const directionToOffset: Record<Direction, Pos> = {
  LEFT: { y: 0, x: -1 },
  RIGHT: { y: 0, x: 1 },
  DOWN: { y: 1, x: 0 },
};

export function moveActivePiece(
  state: GameState,
  direction: Direction,
): GameState {
  // guard against race condition where action is called before a new piece exists
  if (!state.activePiece) {
    return state;
  }
  const { pos } = state.activePiece;

  const offset = directionToOffset[direction];
  const requestedPos = { x: pos.x + offset.x, y: pos.y + offset.y };
  const requestedPieceState: PieceState = {
    ...state.activePiece,
    pos: requestedPos,
  };

  const canMove = isLegalMove(state, requestedPieceState);

  const newPos = canMove ? requestedPos : pos;

  return {
    ...state,
    activePiece: { ...state.activePiece, pos: newPos },
  };
}

export function saveActivePiecePosition(state: GameState): GameState {
  if (state.activePiece === undefined) {
    return state;
  }
  const newBoard = [...state.board];

  const coords = pieceToBoardCoordinates(state.activePiece);

  // TODO: can update each row at once to speedup/simplify this
  for (const { x, y } of coords) {
    const newRow = [...newBoard[y]];
    newRow[x] = { value: 1, color: state.activePiece.proto.color };

    newBoard.splice(y, 1, newRow);
  }

  return {
    ...state,
    board: newBoard,
    activePiece: undefined,
  };
}

export function clearRows(state: GameState, rows: Array<number>): GameState {
  const newBoard = [...state.board];
  const boardWidth = state.size[0];

  const rowCount = rows.length;

  for (let y = 0; y <= rows[rows.length - 1]; y++) {
    if (y - rowCount >= 0) {
      newBoard[y] = state.board[y - rowCount];
    } else {
      newBoard[y] = createRow(boardWidth);
    }
  }

  return {
    ...state,
    board: newBoard,
    score: state.score + rowCount,
  };
}

export function dropPiece(state: GameState): GameState {
  if (!state.activePiece) {
    return state;
  }

  const dropPos = getTerminalPiecePosition(state);

  const nextState: GameState = {
    ...state,
    activePiece: {
      ...state.activePiece,
      pos: dropPos,
    },
  };

  return saveActivePiecePosition(nextState);
}

export function nextActivePiece(state: GameState): GameState {
  const nextQueue = [...state.pieceQueue];
  const nextPiece = initializePieceStateFromProto(
    state.size,
    nextQueue.shift()!,
  );
  nextQueue.push(getRandomPieceProto());
  return {
    ...state,
    activePiece: nextPiece,
    pieceQueue: nextQueue,
  };
}

export function holdPiece(state: GameState): GameState {
  if (!state.activePiece) {
    return state;
  }
  console.log("HOLD PIECE");
  if (!state.holdPiece) {
    return {
      ...nextActivePiece(state),
      holdPiece: state.activePiece.proto,
    };
  } else {
    return {
      ...state,
      activePiece: initializePieceStateFromProto(state.size, state.holdPiece),
      holdPiece: state.activePiece.proto,
    };
  }
}

export function rotatePiece(state: GameState): GameState {
  if (!state.activePiece) {
    return state;
  }
  const roatatedMatrix: PieceMatrix = [];
  const { layout } = state.activePiece;

  for (let x = 0; x < layout[0].length; x++) {
    const newRow: Array<0 | 1> = [];
    for (let y = layout.length - 1; y >= 0; y--) {
      newRow.push(layout[y][x]);
    }
    roatatedMatrix.push(newRow);
  }

  const rotatedPiece: PieceState = {
    ...state.activePiece,
    layout: roatatedMatrix,
  };

  const canRotate = isLegalMove(state, rotatedPiece);

  return canRotate ? { ...state, activePiece: rotatedPiece } : state;
}

function isLegalMove(prevState: GameState, requestedPieceState: PieceState) {
  const requestedCoords = pieceToBoardCoordinates(requestedPieceState);
  return requestedCoords.every(
    (c) =>
      c.x >= 0 &&
      c.x < prevState.board[0].length &&
      c.y < prevState.board.length &&
      prevState.board[c.y]?.[c.x] !== undefined &&
      prevState.board[c.y][c.x].value === 0,
  );
}
