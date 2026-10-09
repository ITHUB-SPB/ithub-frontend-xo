import { createContext, useMemo, useReducer, type PropsWithChildren } from "react";

import { createBoard, getMover, getOpponent, getStatus } from "@/game";
import type { Board, GameStatus, Move, StorageKey, StoredGame } from "@/types";

type GameState = {
  board: Board;
  status: GameStatus;
};

type GameAction =
  | { type: "move"; index: number }
  | { type: "load"; board: Board; move: Move }
  | { type: "reset" };

type GameContextValue = {
  board: Board;
  status: GameStatus;
  makeMove: (index: number) => void;
  loadGame: (game: StoredGame) => void;
  resetGame: () => void;
};

type StorageContextValue = {
  has: (key: StorageKey) => boolean;
  read: (key: StorageKey) => unknown;
  write: (key: StorageKey, value: unknown) => void;
  remove: (key: StorageKey) => void;
};

function createInitialState(): GameState {
  return { board: createBoard(), status: "x-move" };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "move": {
      const mover = getMover(state.status);

      if (mover === null || state.board[action.index] !== null) {
        return state;
      }

      const board = state.board.map((cell, index) => (index === action.index ? mover : cell));

      return { board, status: getStatus(board, getOpponent(mover)) };
    }
    case "load":
      return { board: action.board, status: `${action.move}-move` };
    case "reset":
      return createInitialState();
  }
}

const storageApi: StorageContextValue = {
  has: (key) => {
    try {
      return localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  },
  read: (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? null : JSON.parse(raw);
    } catch {
      return null;
    }
  },
  write: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  },
};

export const gameContext = createContext<GameContextValue>(undefined!);

export const storageContext = createContext<StorageContextValue>(undefined!);

export function StorageContext({ children }: PropsWithChildren) {
  return <storageContext.Provider value={storageApi}>{children}</storageContext.Provider>;
}

export function GameContext({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  const value = useMemo<GameContextValue>(
    () => ({
      board: state.board,
      status: state.status,
      makeMove: (index) => dispatch({ type: "move", index }),
      loadGame: (game) => dispatch({ type: "load", board: game.board, move: game.move }),
      resetGame: () => dispatch({ type: "reset" }),
    }),
    [state],
  );

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
}
