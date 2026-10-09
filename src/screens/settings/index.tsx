import { useContext, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

import { PlayerSettingsComponent } from "@/components";
import { gameContext, storageContext } from "@/context";
import { DEFAULT_PLAYERS, PLAYERS_KEY } from "@/game";
import type { AppState, Move, Player, Players } from "@/types";
import classes from "./settings.module.css";

type SettingsScreenProps = {
  players: Players;
  setPlayers: Dispatch<SetStateAction<Players>>;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SettingsScreen({
  players,
  setPlayers,
  updateAppState,
}: SettingsScreenProps) {
  const storage = useContext(storageContext);
  const { resetGame } = useContext(gameContext);
  const [draft, setDraft] = useState<Players>(players);

  const handleChange = (move: Move, player: Player) => {
    setDraft((current) => ({ ...current, [move]: player }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Players = {
      x: { ...draft.x, name: draft.x.name.trim() || DEFAULT_PLAYERS.x.name },
      o: { ...draft.o, name: draft.o.name.trim() || DEFAULT_PLAYERS.o.name },
    };

    storage.write(PLAYERS_KEY, next);
    setPlayers(next);
    resetGame();
    updateAppState("progress");
  };

  return (
    <main className={classes.main}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Настройка игроков</h2>
        <PlayerSettingsComponent
          move="x"
          player={draft.x}
          autoFocus
          onChange={(player) => handleChange("x", player)}
        />
        <PlayerSettingsComponent
          move="o"
          player={draft.o}
          onChange={(player) => handleChange("o", player)}
        />
        <button type="submit" className="btn btn--accent">
          Начать
        </button>
      </form>
    </main>
  );
}
