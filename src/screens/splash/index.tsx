import { useEffect, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AppState, Board, Players } from "@/types";

import logo from "@/assets/logo.png";

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
    }
  }, []);

  return (
    <main className={classes.main}>
      {savedBoard === null ? (
        <>
          <img
            onClick={() => updateAppState("settings")}
            className={classes.logo}
            src={logo}
            alt="logo"
          />
        </>
      ) : (
        <div className={classes.resumeBox}>
          <button
            onClick={() => {
              updateAppState("settings");
            }}
            className={classes.button}
          >
            Start new game
          </button>

          <button
            onClick={() => {
              updateBoard(savedBoard);
              updateAppState("game");
            }}
            className={classes.button}
          >
            Continue
          </button>
        </div>
      )}
    </main>
  );
}
