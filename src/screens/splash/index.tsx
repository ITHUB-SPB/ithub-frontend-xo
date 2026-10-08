import { useEffect, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AppState, Board } from "@/types";

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import { gameContext } from "../../context";

import classes from "./splash.module.css";

type SplashScreenProps = {
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SplashScreen({ updateAppState }: SplashScreenProps) {
  const [savedBoard, setSavedBoard] = useState<Board | null>(null);
  const { updateBoard } = useContext(gameContext);

  useEffect(() => {
    const storageGame = localStorage.getItem("xo__game");

    if (storageGame !== null) {
      const storageBoard: Board = JSON.parse(storageGame);
      if (storageBoard.some((cell) => cell !== null)) {
        setSavedBoard(storageBoard);
      }
    } else setSavedBoard(null);
  }, []);

  return (
    <main className={classes.main}>
      {savedBoard === null && (
        <>
          <img src={x} className={classes.bgIconX} />
          <img src={o} className={classes.bgIconO} />
          <img
            onClick={() => updateAppState("settings")}
            className={classes.logo}
            src={logo}
            alt="logo"
          />
        </>
      )}
      {savedBoard !== null && (
        <>
          <button onClick={() => updateAppState("settings")}>
            Start new game
          </button>

          <button
            onClick={() => {
              updateBoard(savedBoard);
              updateAppState("game");
            }}
          >
            Continue
          </button>
        </>
      )}
    </main>
  );
}
