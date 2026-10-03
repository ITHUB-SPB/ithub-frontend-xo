import { useRef, useEffect, type SubmitEvent } from "react";

import type { Players } from "@/types";
import classes from "./settings.module.css";

type SettingsScreenProps = {
  players: Players | null;
  setPlayers: any;
  updateScreen: any;
};

export default function SettingsScreen({ players, setPlayers, updateScreen }: SettingsScreenProps) {
  const inputRef = useRef<HTMLInputElement>(undefined!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const data = new FormData(event.target);

    setPlayers({
      player1: {
        name: data.get("namePlayer1"),
        color: data.get("colorPlayer1"),
      },
      player2: {
        name: data.get("namePlayer2"),
        color: data.get("colorPlayer2"),
      },
    });

    updateScreen("game");
  };

  return (
    <main className={classes.main}>
      <form action="" method="post" onSubmit={handleSubmit}>
        <h2>Стартовый экран</h2>
        <section>
          <input ref={inputRef} type="text" name="namePlayer1" placeholder="Игрок 1" required />
          <input type="color" name="colorPlayer1" />
        </section>
        <section>
          <input type="text" name="namePlayer2" placeholder="Игрок 2" required />
          <input type="color" name="colorPlayer2" />
        </section>
        <button type="submit">Начать</button>
      </form>
    </main>
  );
}
