import { useContext, type Dispatch, type SetStateAction } from "react";
import type { AppState, Players } from "@/types";

import { gameContext } from "@/context";

type ResultScreenProps = {
  players: Players | null;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "../splash/splash.module.css";

export default function ResultsScreen({ players, updateAppState }: ResultScreenProps) {
  const { updateBoard } = useContext(gameContext);

  return (
    <main className={classes.main}>
      <h2>Результаты</h2>
      <img src={x} className={classes.bgIcon} />
      <img src={o} className={classes.bgIcon} />

      <button
        onClick={() => {
          updateAppState("settings");
          updateBoard(Array(9).fill(null));
        }}
      >
        Start new game
      </button>
    </main>
  );
}
