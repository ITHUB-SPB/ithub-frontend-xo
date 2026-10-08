export type AppState = "idle" | "settings" | "progress" | "results";

export type Move = "x" | "o";

export type GameStatus = `${Move}-move` | `${Move}-wins` | "draw";

export type Board = Array<Move | null>;

export type SavedGame = {
  move: Move;
  board: Board;
};

export type Player = {
  name: string;
  color: string; // or emoji: string;
};

export type Players = {
  x: Player;
  o: Player;
};
