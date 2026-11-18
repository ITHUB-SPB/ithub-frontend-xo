import { useContext } from "react";

import { gameContext } from "./context";
import { SplashScreen, SettingsScreen, GameScreen, ResultsScreen } from "@/screens";

export default function App() {
  const { appState } = useContext(gameContext);

  const screens = {
    idle: <SplashScreen />,
    settings: <SettingsScreen />,
    progress: <GameScreen />,
    results: <ResultsScreen />,
  };

  return screens[appState];
}
