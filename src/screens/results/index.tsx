import { useContext } from "react";

import { gameContext } from "@/context";
import Board from "@/components/board";
import Legend from "@/components/legend";
import ResetButton from "@/components/reset-button";
import classes from "../game/game.module.css";

function ResultInfo() {
  const { status, players } = useContext(gameContext);
  const winner = status === "x-wins" ? players.x : status === "o-wins" ? players.o : null;

  return (
    <header className="screen-heading" role="status">
      <p className="eyebrow">Партия завершена</p>
      <h1>{winner ? "Победа!" : "Ничья!"}</h1>
      <p>{winner ? `Победитель — ${winner.name}` : "Силы равны. Сыграем ещё?"}</p>
    </header>
  );
}

export default function ResultsScreen() {
  const { dispatch, status } = useContext(gameContext);

  return (
    <main className={classes.main}>
      <ResultInfo />
      <Legend />
      <Board />
      <p className="hint">
        {status === "draw"
          ? "Все клетки заняты — никто не уступил!"
          : "Три в ряд. Красиво сыграно!"}
      </p>
      <ResetButton onClick={() => dispatch({ type: "settings" })} />
    </main>
  );
}
