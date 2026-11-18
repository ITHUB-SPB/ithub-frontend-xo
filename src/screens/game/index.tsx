import { useCallback, useContext, useState } from "react";

import { gameContext } from "@/context";
import Board from "@/components/board";
import Legend from "@/components/legend";
import Timer from "@/components/timer";
import Dialog from "@/components/dialog";
import ResetButton from "@/components/reset-button";
import classes from "./game.module.css";

export default function GameScreen() {
  const { board, status, players, dispatch } = useContext(gameContext);
  const [showReset, setShowReset] = useState(false);
  const currentMove = status === "x-move" ? "x" : "o";
  const moveCount = board.filter((cell) => cell !== null).length;

  const randomMove = useCallback(() => {
    const emptyCells = board.flatMap((cell, index) => (cell === null ? [index] : []));
    if (emptyCells.length === 0) return;
    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    dispatch({ type: "move", index });
  }, [board, dispatch]);

  return (
    <main className={classes.main}>
      <header className="screen-heading">
        <p className="eyebrow">Крестики-нолики</p>
        <h1>Ваш ход!</h1>
        <p aria-live="polite">Ходит {players[currentMove].name}</p>
      </header>
      <Legend />
      <Board />
      <Timer key={moveCount} paused={showReset} onExpire={randomMove} />
      <ResetButton onClick={() => setShowReset(true)} />
      <p className="hint">Три в ряд по горизонтали, вертикали или диагонали.</p>
      {showReset && (
        <Dialog
          title="Начать заново?"
          confirmText="Да, начать заново"
          cancelText="Продолжить игру"
          onConfirm={() => dispatch({ type: "settings" })}
          onCancel={() => setShowReset(false)}
        >
          Текущая партия будет удалена. Имена и цвета игроков останутся.
        </Dialog>
      )}
    </main>
  );
}
