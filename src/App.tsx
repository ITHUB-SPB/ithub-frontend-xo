import { useContext, useState } from "react";

import { storageContext } from "./context";
import { DEFAULT_PLAYERS, PLAYERS_KEY, isPlayers } from "@/game";
import { SplashScreen, SettingsScreen, GameScreen, ResultsScreen } from "@/screens";
import type { AppState, Players } from "@/types";

export default function App() {
  const storage = useContext(storageContext);
  const [appState, updateAppState] = useState<AppState>("idle");
  const [players, setPlayers] = useState<Players>(() => {
    const saved = storage.read(PLAYERS_KEY);
    return isPlayers(saved) ? saved : DEFAULT_PLAYERS;
  });

  const screens = {
    idle: <SplashScreen updateAppState={updateAppState} />,
    settings: (
      <SettingsScreen players={players} setPlayers={setPlayers} updateAppState={updateAppState} />
    ),
    progress: <GameScreen players={players} updateAppState={updateAppState} />,
    results: <ResultsScreen players={players} updateAppState={updateAppState} />,
  };

  return screens[appState];
}
