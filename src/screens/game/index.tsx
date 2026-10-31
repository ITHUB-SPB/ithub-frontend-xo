import { useState } from "react";

import { useBoundStore } from "@/store";
import { BoardComponent, TimerComponent, LegendComponent } from "@/components";
import classes from "./game.module.css";
import type { Move } from "@/types";

export default function GameScreen() {
  const updateAppState = useBoundStore(store => store.updateAppState)
  const [currentMove, updateMove] = useState<Move>("x");

  return (
    <main className={classes.main}>
      <h1>XO</h1>
      <div>
        <LegendComponent />
        <BoardComponent currentMove={currentMove} updateMove={updateMove} />
        <TimerComponent />
      </div>
      <button onClick={() => updateAppState("settings")}>Сбросить игру</button>
    </main>
  );
}
