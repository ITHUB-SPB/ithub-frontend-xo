import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { BoardComponent, DialogComponent, LegendComponent, TimerComponent } from "@/components";
import { gameContext, storageContext } from "@/context";
import { GAME_KEY, countMoves, getMover, getRandomFreeIndex } from "@/game";
import type { AppState, Players } from "@/types";
import classes from "./game.module.css";

type GameScreenProps = {
  players: Players;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function GameScreen({ players, updateAppState }: GameScreenProps) {
  const storage = useContext(storageContext);
  const { board, status, makeMove, resetGame } = useContext(gameContext);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const mover = getMover(status);

  useEffect(() => {
    if (mover === null) {
      storage.remove(GAME_KEY);
      updateAppState("results");
      return;
    }

    storage.write(GAME_KEY, { move: mover, board });
  }, [board, mover, storage, updateAppState]);

  const handleExpire = () => {
    const index = getRandomFreeIndex(board);

    if (index !== null) {
      makeMove(index);
    }
  };

  const handleRestart = () => {
    storage.remove(GAME_KEY);
    resetGame();
    updateAppState("settings");
  };

  return (
    <main className={classes.main}>
      <h1 className={classes.title}>XO</h1>
      <LegendComponent players={players} currentMove={mover} />
      <BoardComponent players={players} onSelect={makeMove} />
      <TimerComponent key={countMoves(board)} paused={isConfirmOpen} onExpire={handleExpire} />
      <button className="btn" onClick={() => setConfirmOpen(true)}>
        Начать заново
      </button>
      {isConfirmOpen && (
        <DialogComponent
          title="Начать заново?"
          description="Текущая партия будет сброшена, а вы вернётесь к настройке игроков."
          confirmLabel="Да, сбросить"
          cancelLabel="Продолжить игру"
          onConfirm={handleRestart}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </main>
  );
}
