import {
  useState,
  useEffect,
  useContext,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { AppState, Board, Move, Players } from "@/types";

import { BoardComponent, TimerComponent, LegendComponent } from "@/components";
import { gameContext } from "@/context";
import classes from "./game.module.css";

type GameScreenProps = {
  players: Players | null;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

function checkWinner(board: Board): Move | null | "draw" {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a] as Move;
    }
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}

export default function GameScreen({ players, updateAppState }: GameScreenProps) {
  const { board, updateBoard, updateStatus } = useContext(gameContext);
  const [currentMove, updateMove] = useState<Move>("x");

  useEffect(() => {
    if (board) {
      localStorage.setItem("xo__game", JSON.stringify(board));
    }
    const result = checkWinner(board);
    if (result === "draw") {
      updateStatus("draw");
    } else if (result !== null) {
      updateStatus(`${result}-wins`);
    }
    if (result) {
      updateAppState("results");
    }
  }, [board, updateStatus]);

  const makeRandomMove = useCallback(() => {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = currentMove;

    updateBoard(newBoard);
    updateMove(currentMove === "x" ? "o" : "x");
  }, [board, currentMove, updateBoard]);

  return (
    <main className={classes.main}>
      <TimerComponent onTimeEnd={makeRandomMove} currentMove={currentMove} />{" "}
      <div>
        <LegendComponent />
        <BoardComponent currentMove={currentMove} updateMove={updateMove} />
      </div>
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
