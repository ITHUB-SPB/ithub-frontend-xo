import { createContext, useEffect, useReducer, type Dispatch, type PropsWithChildren } from "react";

import type { AppState, Board, GameStatus, Move, Players, SavedGame } from "@/types";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinningCells(board: Board): number[] {
  const lines = winningLines.filter(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
  );
  return [...new Set(lines.flat())];
}

function getStatus(board: Board, nextMove: Move): GameStatus {
  const cells = getWinningCells(board);

  if (cells.length) {
    return `${board[cells[0]]!}-wins`;
  }

  return board.every((cell) => cell !== null) ? "draw" : `${nextMove}-move`;
}

const defaultPlayers: Players = {
  x: { name: "Игрок 1", color: "#ffcf24" },
  o: { name: "Игрок 2", color: "#ff83ad" },
};

function readStorage(key: string): unknown {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function isPlayer(value: unknown): value is Players["x"] {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    value.name.length <= 30 &&
    "color" in value &&
    typeof value.color === "string" &&
    /^#[0-9a-f]{6}$/i.test(value.color)
  );
}

function isPlayers(value: unknown): value is Players {
  return (
    typeof value === "object" &&
    value !== null &&
    "x" in value &&
    "o" in value &&
    isPlayer(value.x) &&
    isPlayer(value.o)
  );
}

function isSavedGame(value: unknown): value is SavedGame {
  if (
    typeof value !== "object" ||
    value === null ||
    !("move" in value) ||
    !("board" in value) ||
    (value.move !== "x" && value.move !== "o") ||
    !Array.isArray(value.board) ||
    value.board.length !== 9 ||
    !value.board.every((cell: unknown) => cell === null || cell === "x" || cell === "o")
  ) {
    return false;
  }

  const board: Board = value.board;
  const xCount = board.filter((cell) => cell === "x").length;
  const oCount = board.filter((cell) => cell === "o").length;
  const correctMove =
    (value.move === "x" && xCount === oCount) || (value.move === "o" && xCount === oCount + 1);

  return correctMove && getStatus(board, value.move) === `${value.move}-move`;
}

type State = {
  appState: AppState;
  players: Players;
  board: Board;
  status: GameStatus;
  savedGame: SavedGame | null;
};

type Action =
  | { type: "settings" }
  | { type: "continue" }
  | { type: "start"; players: Players }
  | { type: "move"; index: number };

function createState(): State {
  const players = readStorage("xo__players");
  const game = readStorage("xo__game");

  return {
    appState: "idle",
    players: isPlayers(players) ? players : defaultPlayers,
    board: Array(9).fill(null),
    status: "x-move",
    savedGame: isSavedGame(game) ? game : null,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "settings":
      return {
        ...state,
        appState: "settings",
        board: Array(9).fill(null),
        status: "x-move",
        savedGame: null,
      };
    case "continue":
      if (!state.savedGame) return state;
      return {
        ...state,
        appState: "progress",
        board: state.savedGame.board,
        status: `${state.savedGame.move}-move`,
        savedGame: null,
      };
    case "start":
      return {
        ...state,
        appState: "progress",
        players: action.players,
        board: Array(9).fill(null),
        status: "x-move",
        savedGame: null,
      };
    case "move": {
      if (state.appState !== "progress" || state.board[action.index] !== null) return state;

      const move = state.status === "x-move" ? "x" : "o";
      const board = [...state.board];
      board[action.index] = move;
      const status = getStatus(board, move === "x" ? "o" : "x");

      return {
        ...state,
        board,
        status,
        appState: status.endsWith("-move") ? "progress" : "results",
      };
    }
  }
}

export const gameContext = createContext<
  State & { dispatch: Dispatch<Action>; winningCells: number[] }
>(undefined!);

export function GameContext({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, undefined, createState);

  useEffect(() => {
    try {
      if (state.appState === "progress") {
        localStorage.setItem("xo__players", JSON.stringify(state.players));
        localStorage.setItem(
          "xo__game",
          JSON.stringify({
            move: state.status === "x-move" ? "x" : "o",
            board: state.board,
          }),
        );
      } else if (!state.savedGame) {
        localStorage.removeItem("xo__game");
      }
    } catch {
      return;
    }
  }, [state]);

  return (
    <gameContext.Provider
      value={{ ...state, dispatch, winningCells: getWinningCells(state.board) }}
    >
      {children}
    </gameContext.Provider>
  );
}
