import {
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
  type InputEvent,
} from "react";

import type { AppState, Move, Players } from "@/types";
import classes from "./settings.module.css";

type SettingsScreenProps = {
  players: Players | null;
  setPlayers: Dispatch<SetStateAction<Players | null>>;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SettingsScreen({
  players,
  setPlayers,
  updateAppState,
}: SettingsScreenProps) {
  const inputRef = useRef<HTMLInputElement>(undefined!);

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

    updateAppState("progress");
  };

  const handlePlayerColorInput = (event: InputEvent<HTMLInputElement>, player: Move) => {
    setPlayers((currentState) => {
      if (!currentState) {
        return currentState;
      }

      const newColor = (event.target as HTMLInputElement).value;

      return {
        ...currentState,
        [player]: {
          ...currentState[player],
          color: newColor,
        },
      };
    });
  };

  return (
    <main className={classes.main}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <header className={classes.header}>
          <span>XO</span>
          <div><p>Настройка игроков</p><h1>Кто сегодня победит?</h1></div>
        </header>
        <section className={classes.player}>
          <div className={`${classes.symbol} ${classes.x}`}>X</div>
          <label><span>Игрок за крестики</span>
          <input ref={inputRef} type="text" name="namePlayer1" defaultValue={players?.x.name} maxLength={24} required />
          </label>
          <label className={classes.colorLabel}><span>Цвет</span>
          <input
            value={players?.x.color ?? "#2563eb"}
            onInput={(event) => {
              handlePlayerColorInput(event, "x");
            }}
            type="color"
            name="colorPlayer1"
          />
          </label>
        </section>
        <section className={classes.player}>
          <div className={`${classes.symbol} ${classes.o}`}>O</div>
          <label><span>Игрок за нолики</span>
          <input type="text" name="namePlayer2" defaultValue={players?.o.name} maxLength={24} required />
          </label>
          <label className={classes.colorLabel}><span>Цвет</span>
          <input
            value={players?.o.color ?? "#e11d48"}
            onInput={(event) => {
              handlePlayerColorInput(event, "o");
            }}
            type="color"
            name="colorPlayer2"
          />
          </label>
        </section>
        <button className="button" type="submit">Начать игру <span>→</span></button>
      </form>
    </main>
  );
}
