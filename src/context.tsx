import {
  createContext,
  useState,
  useEffect,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

import type { Board, GameStatus, Players } from "@/types";

export const gameContext = createContext<{
  board: Board;
  status: GameStatus;
  players: Players | null;
  updateBoard: Dispatch<SetStateAction<Board>>;
  updateStatus: Dispatch<SetStateAction<GameStatus>>;
  updatePlayers: Dispatch<SetStateAction<Players | null>>;
}>(undefined!);

export function GameContext({ children }: PropsWithChildren) {
  const [board, updateBoard] = useState<Board>(Array(9).fill(null));
  const [status, updateStatus] = useState<GameStatus>("x-move");
  const [players, updatePlayers] = useState<Players | null>(null)

  useEffect(() => {
    if (players) {
      localStorage.setItem("xo__players", JSON.stringify(players));
    }
  }, [players]);

  return (
    <gameContext.Provider value={{ board, updateBoard, status, updateStatus, players, updatePlayers }}>
      {children}
    </gameContext.Provider>
  );
}
