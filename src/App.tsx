import { useEffect, useState } from "react";
import { useBoundStore } from "./store";

import { SplashScreen, SettingsScreen, GameScreen, ResultsScreen } from "@/screens";
import type { AppState, Board, Move } from "@/types";

function checkWinner(board: Board): Move | null {
  if (board[0] && board[0] === board[1] && board[1] === board[2]) {
    return board[0];
  }

  return null;
}

export default function App() {
  const [appState, updateAppState] = useState<AppState>("idle");
  const board = useBoundStore(store => store.board)

  useEffect(() => {
    if (board.some((cell) => cell !== null)) {
      updateAppState("game");
    }
  }, []);

  const screens = {
    idle: <SplashScreen updateAppState={updateAppState} />,
    settings: (
      <SettingsScreen updateAppState={updateAppState} />
    ),
    game: <GameScreen updateAppState={updateAppState} />,
    results: <ResultsScreen />,
  };

  return screens[appState];
}
