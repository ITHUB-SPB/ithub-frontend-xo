import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import type { AppState, Board, Move, Players } from "../types";

import BoardComponent from "@/components/board";
import TimerComponent from "@/components/timer";
import LegendComponent from '@/components/legend'

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
  const [currentMove, updateMove] = useState<Move>("x");

  useEffect(() => {
    if (board) {
      localStorage.setItem("xo__game", JSON.stringify(board));
    }
    console.log(checkWinner(board));
  }, [board]);


  return (
    <div>
      <h1>XO</h1>
      <div>
        <LegendComponent />
        <BoardComponent currentMove={currentMove} updateMove={updateMove} />
        <TimerComponent />
      </div>
      <button onClick={() => updateAppState("settings")}>Сбросить игру</button>
    </div>
  );
}
