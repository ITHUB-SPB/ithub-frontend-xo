import {
  useRef,
  useEffect,
  type SubmitEvent,
  type InputEvent,
} from "react";

import { useBoundStore } from "@/store";

import type { Move } from "@/types";
import classes from "./settings.module.css";

export default function SettingsScreen() {
  const inputRef = useRef<HTMLInputElement>(undefined!);

  const players = useBoundStore((store) => store.players)
  const setPlayers = useBoundStore((store) => store.setPlayers)
  const updateAppState = useBoundStore((store) => store.updateAppState)

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const data = new FormData(event.target);

    setPlayers({
      x: {
        name: data.get("namePlayer1")!.toString(),
        color: data.get("colorPlayer1")!.toString(),
      },
      o: {
        name: data.get("namePlayer2")!.toString(),
        color: data.get("colorPlayer2")!.toString(),
      },
    });

    updateAppState("game");
  };

  const handlePlayerColorInput = (event: InputEvent<HTMLInputElement>, player: Move) => {
    setPlayers({
      ...players,
      [player]: {
        ...players[player],
        color: (event.target as HTMLInputElement).value,
      },
    }
    );
  };

  return (
    <main className={classes.main}>
      <form action="" method="post" onSubmit={handleSubmit}>
        <h2>Стартовый экран</h2>
        <section>
          <input ref={inputRef} type="text" name="namePlayer1" value={players?.x.name} required />
          <input
            value={players?.x.color}
            onInput={(event) => {
              handlePlayerColorInput(event, "x");
            }}
            type="color"
            name="colorPlayer1"
          />
        </section>
        <section>
          <input type="text" name="namePlayer2" value={players?.o.name} required />
          <input
            value={players?.o.color}
            onInput={(event) => {
              handlePlayerColorInput(event, "o");
            }}
            type="color"
            name="colorPlayer2"
          />
        </section>
        <button type="submit">Начать</button>
      </form>
    </main>
  );
}
