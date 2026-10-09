import { useContext, type Dispatch, type SetStateAction } from "react";
import type { AppState, Players } from "@/types";

import { gameContext } from "@/context";

type ResultScreenProps = {
  players: Players | null;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};


import classes from "../splash/splash.module.css";

export default function ResultsScreen({ players, updateAppState }: ResultScreenProps) {
  const { updateBoard, status } = useContext(gameContext);
function handleVictory() {
  const players = JSON.parse(localStorage.getItem("xo__players")!)
  if (status === "draw") {
    return "draw"
  }
  if (status === "o-wins")
    return `${players.o.name} wins!!`
  if (status === "x-wins")
    return `${players.x.name} wins!!`
}

  return (
    <main className={classes.main}>
      <h2>Результаты</h2>
      <h1>{handleVictory()}</h1>      
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
