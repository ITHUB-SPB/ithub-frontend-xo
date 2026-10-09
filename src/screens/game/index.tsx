import { useState, useEffect, useContext, type Dispatch, type SetStateAction } from "react";
import type { AppState, Board, Move, Players } from "@/types";

import { BoardComponent, TimerComponent, LegendComponent } from "@/components";
import { gameContext } from "@/context";
import classes from "./game.module.css";

type GameScreenProps = {
  players: Players | null;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

function checkWinner(board: Board): Move | null {
  if (board[0] && board[0] === board[1] && board[1] === board[2]) {
    return board[0];
  }

  return null;
}

export default function GameScreen({ players, updateAppState }: GameScreenProps) {
  const { board, updateBoard } = useContext(gameContext);
  const [currentMove, updateMove] = useState<Move>("x");

  useEffect(() => {
    if (board) {
      localStorage.setItem("xo__game", JSON.stringify(board));
    }
  }, [board]);

  return (
    <main className={classes.main}>
      <h1>XO</h1>
      <div>
        <LegendComponent />
        <BoardComponent currentMove={currentMove} updateMove={updateMove} />
      </div>
      <TimerComponent />

      <button
        onClick={() => {
          updateAppState("settings");
          localStorage.removeItem("xo__game");
          updateBoard(Array(9).fill(null));
        }}
      >
        Сбросить игру
      </button>
    </main>
  );
}
