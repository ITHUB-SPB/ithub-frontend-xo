import {
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
  type InputEvent,
  type ChangeEvent,
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
    const storagePlayers = localStorage.getItem("xo__players");

    if (storagePlayers) {
      setPlayers(JSON.parse(storagePlayers));
    }
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

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>, player: Move) => {
    setPlayers((currentState) => {
      if (!currentState) {
        return currentState;
      }

      const newName = (event.target as HTMLInputElement).value;

      return {
        ...currentState,
        [player]: {
          ...currentState[player],
          name: newName,
        },
      };
    });
  };

  return (
    <main className={classes.main}>
      <form action="" method="post" onSubmit={handleSubmit}>
        <h2>Стартовый экран</h2>
        <section>
          <input
            ref={inputRef}
            type="text"
            name="namePlayer1"
            value={players?.x.name}
            onChange={(event) => handlePlayerNameChange(event, "x")}
            required
          />
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
          <input
            type="text"
            name="namePlayer2"
            value={players?.o.name}
            onChange={(event) => handlePlayerNameChange(event, "o")}
            required
          />
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
