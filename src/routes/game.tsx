import { createFileRoute, Link, getRouteApi } from '@tanstack/react-router'
import { useState, useEffect, useContext, type Dispatch, type SetStateAction } from "react";
import type { AppState, Board, Move, Players } from "@/types";

import { BoardComponent, TimerComponent, LegendComponent } from "@/components";
import { gameContext } from "@/context";
import classes from "../styles/game.module.css";

export const Route = createFileRoute('/game')({
  loader: (): Players => {
    const storagePlayers = localStorage.getItem("xo__players");
    return storagePlayers !== null
      ? JSON.parse(storagePlayers)
      : {
        x: { name: "Игрок 1", color: "salmon" },
        o: { name: "Игрок 2", color: "magenta" },
      }
  },
  component: GameScreen,
})

function checkWinner(board: Board): Move | null {
  if (board[0] && board[0] === board[1] && board[1] === board[2]) {
    return board[0];
  }

  return null;
}

function GameScreen() {
  // доступ к лоадеру по другому пути
  const splashRoute = getRouteApi('/')
  const { board } = splashRoute.useLoaderData()

  const players = Route.useLoaderData()
  console.log(players)

  // const { board } = useContext(gameContext);
  const [currentMove, updateMove] = useState<Move>("x");

  useEffect(() => {
    if (board) {
      localStorage.setItem("xo__game", JSON.stringify(board));
    }
    console.log(checkWinner(board));
  }, [board]);

  return (
    <main className={classes.main}>
      <h1>XO</h1>
      <div>
        <LegendComponent />
        <BoardComponent currentMove={currentMove} updateMove={updateMove} />
        <TimerComponent />
      </div>
      <Link to='/settings'>Сбросить игру</Link>
    </main>
  );
}
