import { useState } from "react";
import type { Board, GameStatus, Players } from "@/types";
import { BoardComponent } from "@/components";
import classes from "../game/game.module.css";

type ResultsScreenProps = { players: Players | null; board: Board; status: GameStatus; startNewGame: () => void };

export default function ResultsScreen({ players, board, status, startNewGame }: ResultsScreenProps) {
  const [, updateMove] = useState<"x" | "o">("x");
  if (!players) return null;
  const winner = status === "x-wins" ? "x" : status === "o-wins" ? "o" : null;
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const winningCells = winner ? lines.find(([a,b,c]) => board[a] === winner && board[b] === winner && board[c] === winner) ?? [] : [];

  return (
    <main className={classes.main}>
      <header className={classes.header}><span className={classes.logo}>XO</span><div><small>Партия завершена</small><h1>Результаты игры</h1></div></header>
      <section className={classes.resultCard}>
        <div className={classes.resultText}><span className={classes.trophy}>{winner ? "★" : "="}</span><p>{winner ? "Победа!" : "Ничья"}</p><h2>{winner ? players[winner].name : "Силы оказались равны"}</h2><small>{winner ? `Игрок ${winner.toUpperCase()} собрал три в ряд` : "На поле не осталось свободных клеток"}</small></div>
        <BoardComponent currentMove="x" updateMove={updateMove} players={players} winningCells={winningCells} readOnly />
      </section>
      <button className="button" onClick={startNewGame}>Новая игра →</button>
    </main>
  );
}
