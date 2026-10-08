import { useEffect, useState, useContext } from "react";

import { gameContext } from "./context";
import { SplashScreen, SettingsScreen, GameScreen, ResultsScreen } from "@/screens";
import type { AppState, Players, SavedGame } from "@/types";

export default function App() {
  const [appState, updateAppState] = useState<AppState>("idle");
  const [players, setPlayers] = useState<Players | null>(null);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const { board, status, updateBoard, updateStatus } = useContext(gameContext);

  useEffect(() => {
    const storagePlayers = localStorage.getItem("xo__players");
    const storageGame = localStorage.getItem("xo__game");

    try {
      setPlayers(
        storagePlayers
          ? JSON.parse(storagePlayers)
          : {
              x: { name: "Игрок 1", color: "#2563eb" },
              o: { name: "Игрок 2", color: "#e11d48" },
            },
      );

      if (storageGame) {
        const savedGame: SavedGame = JSON.parse(storageGame);
        if (
          Array.isArray(savedGame.board) &&
          savedGame.board.length === 9 &&
          savedGame.board.some((cell) => cell !== null) &&
          (savedGame.move === "x" || savedGame.move === "o")
        ) {
          setHasSavedGame(true);
        }
      }
    } catch {
      localStorage.removeItem("xo__game");
      localStorage.removeItem("xo__players");
      setPlayers({
        x: { name: "Игрок 1", color: "#2563eb" },
        o: { name: "Игрок 2", color: "#e11d48" },
      });
    }
  }, []);

  useEffect(() => {
    if (players) {
      localStorage.setItem("xo__players", JSON.stringify(players));
    }
  }, [players]);

  const continueGame = () => {
    const storageGame = localStorage.getItem("xo__game");
    if (!storageGame) return;

    const savedGame: SavedGame = JSON.parse(storageGame);
    updateBoard(savedGame.board);
    updateStatus(`${savedGame.move}-move`);
    updateAppState("progress");
  };

  const startNewGame = () => {
    localStorage.removeItem("xo__game");
    updateBoard(Array(9).fill(null));
    updateStatus("x-move");
    setHasSavedGame(false);
    updateAppState("settings");
  };

  const screens = {
    idle: (
      <SplashScreen
        updateAppState={updateAppState}
        hasSavedGame={hasSavedGame}
        continueGame={continueGame}
        startNewGame={startNewGame}
      />
    ),
    settings: (
      <SettingsScreen players={players} setPlayers={setPlayers} updateAppState={updateAppState} />
    ),
    progress: <GameScreen players={players} updateAppState={updateAppState} />,
    results: (
      <ResultsScreen
        players={players}
        board={board}
        status={status}
        startNewGame={startNewGame}
      />
    ),
  };

  return screens[appState];
}
