import type { Board, GameStatus, Move, Player, Players, StoredGame } from "@/types";

export const GAME_KEY = "xo__game";
export const PLAYERS_KEY = "xo__players";
export const TURN_MS = 10000;
export const NAME_MAX_LENGTH = 14;

export const DEFAULT_PLAYERS: Players = {
  x: { name: "Игрок 1", color: "#ff7a59" },
  o: { name: "Игрок 2", color: "#ffd43b" },
};

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export function createBoard(): Board {
  return new Array<Move | null>(9).fill(null);
}

export function getOpponent(move: Move): Move {
  return move === "x" ? "o" : "x";
}

export function getWinLine(board: Board): number[] | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }

  return null;
}

export function getStatus(board: Board, nextMove: Move): GameStatus {
  const line = getWinLine(board);

  if (line !== null) {
    const winner = board[line[0]] as Move;
    return `${winner}-wins`;
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return `${nextMove}-move`;
}

export function getMover(status: GameStatus): Move | null {
  if (status === "x-move") {
    return "x";
  }

  if (status === "o-move") {
    return "o";
  }

  return null;
}

export function getWinner(status: GameStatus): Move | null {
  if (status === "x-wins") {
    return "x";
  }

  if (status === "o-wins") {
    return "o";
  }

  return null;
}

export function countMoves(board: Board): number {
  return board.filter((cell) => cell !== null).length;
}

export function getRandomFreeIndex(board: Board): number | null {
  const free = board.flatMap((cell, index) => (cell === null ? [index] : []));

  if (free.length === 0) {
    return null;
  }

  return free[Math.floor(Math.random() * free.length)];
}

export function getReadableColor(hex: string): string {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000 / 255;

  return brightness > 0.6 ? "#111111" : "#ffffff";
}

function isMove(value: unknown): value is Move {
  return value === "x" || value === "o";
}

function isPlayer(value: unknown): value is Player {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { name, color } = value as Record<string, unknown>;

  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof color === "string" &&
    HEX_COLOR.test(color)
  );
}

export function isPlayers(value: unknown): value is Players {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { x, o } = value as Record<string, unknown>;

  return isPlayer(x) && isPlayer(o);
}

export function isStoredGame(value: unknown): value is StoredGame {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { move, board } = value as Record<string, unknown>;

  if (!isMove(move) || !Array.isArray(board) || board.length !== 9) {
    return false;
  }

  if (!board.every((cell) => cell === null || isMove(cell))) {
    return false;
  }

  const typedBoard = board as Board;
  const xCount = typedBoard.filter((cell) => cell === "x").length;
  const oCount = typedBoard.filter((cell) => cell === "o").length;
  const expectedMove: Move = xCount === oCount ? "x" : "o";

  return (
    (xCount === oCount || xCount === oCount + 1) &&
    expectedMove === move &&
    getWinLine(typedBoard) === null &&
    typedBoard.some((cell) => cell === null)
  );
}

export function hasProgress(game: StoredGame): boolean {
  return game.board.some((cell) => cell !== null);
}
