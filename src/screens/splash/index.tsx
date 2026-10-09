import { useContext, useState, type Dispatch, type SetStateAction } from "react";

import logo from "@/assets/logo.png";
import o from "@/assets/o.svg";
import x from "@/assets/x.svg";
import { DialogComponent } from "@/components";
import { gameContext, storageContext } from "@/context";
import { GAME_KEY, hasProgress, isStoredGame } from "@/game";
import type { AppState, StoredGame } from "@/types";
import classes from "./splash.module.css";

type SplashScreenProps = {
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SplashScreen({ updateAppState }: SplashScreenProps) {
  const storage = useContext(storageContext);
  const { loadGame } = useContext(gameContext);
  const [savedGame, setSavedGame] = useState<StoredGame | null>(() => {
    const saved = storage.read(GAME_KEY);
    return isStoredGame(saved) && hasProgress(saved) ? saved : null;
  });

  const handleContinue = () => {
    if (savedGame === null) {
      return;
    }

    loadGame(savedGame);
    updateAppState("progress");
  };

  const handleNewGame = () => {
    storage.remove(GAME_KEY);
    setSavedGame(null);
    updateAppState("settings");
  };

  return (
    <main className={classes.main}>
      <img src={x} className={classes.bgIconX} alt="" />
      <img src={o} className={classes.bgIconO} alt="" />
      <img
        onClick={() => updateAppState("settings")}
        className={classes.logo}
        src={logo}
        alt="logo"
      />
      {savedGame !== null && (
        <DialogComponent
          title="Продолжить игру?"
          description="Найдена незавершённая игра. Можно вернуться к ней или начать новую."
          confirmLabel="Продолжить"
          cancelLabel="Новая игра"
          closeOnEscape={false}
          onConfirm={handleContinue}
          onCancel={handleNewGame}
        />
      )}
    </main>
  );
}
