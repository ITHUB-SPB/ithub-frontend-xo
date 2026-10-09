import { useEffect, useState, useContext } from "react";

import { gameContext } from "./context";
import { SplashScreen, SettingsScreen, GameScreen, ResultsScreen } from "@/screens";
import type { AppState, Board, Move, Players } from "@/types";

// function checkWinner(board: Board): Move | null {
//   if (board[0] && board[0] === board[1] && board[1] === board[2]) {
//     return board[0];
//   }

//   return null;
// }

export default function App() {
  const [appState, updateAppState] = useState<AppState>("idle");
  const [players, setPlayers] = useState<Players | null>(null);

  useEffect(() => {
    const storagePlayers = localStorage.getItem("xo__players");

    setPlayers(
      storagePlayers !== null
        ? JSON.parse(storagePlayers)
        : {
            x: { name: "Игрок 1", color: "salmon" },
            o: { name: "Игрок 2", color: "magenta" },
          },
    );
  }, []);

  useEffect(() => {
    if (players) {
      localStorage.setItem("xo__players", JSON.stringify(players));
    }
  }, [players]);

  const screens = {
    idle: <SplashScreen updateAppState={updateAppState} />,
    settings: (
      <SettingsScreen players={players} setPlayers={setPlayers} updateAppState={updateAppState} />
    ),
    game: <GameScreen players={players} updateAppState={updateAppState} />,
    results: <ResultsScreen players={players} updateAppState={updateAppState} />,
  };

  return screens[appState];
}
