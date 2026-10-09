import { useContext, type Dispatch, type SetStateAction } from "react";

import o from "@/assets/o.svg";
import x from "@/assets/x.svg";
import { BoardComponent } from "@/components";
import { gameContext, storageContext } from "@/context";
import { GAME_KEY, getWinLine, getWinner } from "@/game";
import type { AppState, Players } from "@/types";
import classes from "./results.module.css";

type ResultsScreenProps = {
  players: Players;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function ResultsScreen({ players, updateAppState }: ResultsScreenProps) {
  const storage = useContext(storageContext);
  const { board, status, resetGame } = useContext(gameContext);
  const winner = getWinner(status);
  const winLine = winner === null ? null : getWinLine(board);

  const handleRestart = () => {
    storage.remove(GAME_KEY);
    resetGame();
    updateAppState("settings");
  };

  return (
    <main className={classes.main}>
      <h2 className={classes.title}>Результаты</h2>
      <div className={classes.result}>
        {winner === null ? (
          <span>Ничья!</span>
        ) : (
          <>
            <img src={winner === "x" ? x : o} className={classes.icon} alt={winner} />
            <span>
              Победил{" "}
              <span className={classes.winner} style={{ color: players[winner].color }}>
                {players[winner].name}
              </span>
              !
            </span>
          </>
        )}
      </div>
      <BoardComponent players={players} winLine={winLine} locked />
      <button className="btn btn--accent" onClick={handleRestart}>
        Начать заново
      </button>
    </main>
  );
}
