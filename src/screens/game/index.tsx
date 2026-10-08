import { useState, useEffect, useContext, useCallback, type Dispatch, type SetStateAction } from "react";
import type { AppState, Board, Move, Players } from "@/types";

import { BoardComponent, TimerComponent, LegendComponent } from "@/components";
import { gameContext } from "@/context";
import classes from "./game.module.css";

type GameScreenProps = {
  players: Players | null;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

function checkWinner(board: Board): Move | null {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

export default function GameScreen({ players, updateAppState }: GameScreenProps) {
  const { board, status, updateBoard, updateStatus } = useContext(gameContext);
  const [currentMove, updateMove] = useState<Move>(status === "o-move" ? "o" : "x");
  const [turnKey, setTurnKey] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      updateStatus(`${winner}-wins`);
      localStorage.removeItem("xo__game");
      updateAppState("results");
      return;
    }
    if (board.every(Boolean)) {
      updateStatus("draw");
      localStorage.removeItem("xo__game");
      updateAppState("results");
      return;
    }
    if (board.some(Boolean)) {
      localStorage.setItem("xo__game", JSON.stringify({ move: currentMove, board }));
    }
    updateStatus(`${currentMove}-move`);
  }, [board, currentMove, updateAppState, updateStatus]);

  const registerMove = (nextMove: Move) => {
    setTurnKey((value) => value + 1);
    updateStatus(`${nextMove}-move`);
  };

  const makeRandomMove = useCallback(() => {
    const emptyCells = board.map((cell, index) => cell === null ? index : -1).filter((index) => index >= 0);
    if (!emptyCells.length) return;
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const nextMove = currentMove === "x" ? "o" : "x";
    updateBoard((state) => state.map((cell, index) => index === randomIndex ? currentMove : cell));
    updateMove(nextMove);
    registerMove(nextMove);
  }, [board, currentMove, updateBoard, updateStatus]);

  const resetGame = () => {
    localStorage.removeItem("xo__game");
    updateBoard(Array(9).fill(null));
    updateStatus("x-move");
    updateAppState("settings");
  };

  if (!players) return null;

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <span className={classes.logo}>XO</span>
        <div><small>Крестики-нолики</small><h1>Игра в процессе</h1></div>
      </header>
      <div className={classes.gameCard}>
        <LegendComponent players={players} currentMove={currentMove} />
        <BoardComponent currentMove={currentMove} updateMove={updateMove} players={players} onMove={registerMove} />
        <div className={classes.timer}><span>⏱</span><div><small>Время на ход</small><TimerComponent turnKey={turnKey} onTimeout={makeRandomMove} /></div></div>
      </div>
      <button className="button buttonSecondary" onClick={() => setShowResetDialog(true)}>↻ Начать заново</button>
      {showResetDialog && (
        <div className="dialogBackdrop" role="presentation" onMouseDown={() => setShowResetDialog(false)}>
          <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title" onMouseDown={(event) => event.stopPropagation()}>
            <span className="dialogMark">!</span><h2 id="reset-title">Начать заново?</h2>
            <p>Текущий прогресс будет удалён. Это действие нельзя отменить.</p>
            <div className="dialogActions"><button className="button buttonSecondary" onClick={() => setShowResetDialog(false)}>Отмена</button><button className="button buttonDanger" onClick={resetGame}>Начать заново</button></div>
          </section>
        </div>
      )}
    </main>
  );
}
