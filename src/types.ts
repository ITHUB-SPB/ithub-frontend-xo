export type AppState = "idle" | "settings" | "game" | "results";

export type Move = "x" | "o";

export type GameStatus = `${Move}-move` | `${Move}-wins` | "draw";

export type Board = Array<Move | null>;

export type Player = {
  name: string;
  color: string; // or emoji: string;
};

export type Players = {
  x: Player;
  o: Player;
};
