import { createFileRoute } from '@tanstack/react-router'
import {
  useRef,
  useEffect,
  useContext,
  type SubmitEvent,
  type InputEvent,
} from "react";

import type { Move, Players } from "@/types";
import { gameContext } from '@/context';
import classes from "../styles/settings.module.css"

export const Route = createFileRoute('/settings')({
  loader: (): Players => {
    const storagePlayers = localStorage.getItem("xo__players");
    return storagePlayers !== null
      ? JSON.parse(storagePlayers)
      : {
        x: { name: "Игрок 1", color: "salmon" },
        o: { name: "Игрок 2", color: "magenta" },
      }
  },
  component: SettingsScreen,
})

function SettingsScreen() {
  const players = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const { updatePlayers } = useContext(gameContext)

  const inputRef = useRef<HTMLInputElement>(undefined!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const data = new FormData(event.target);

    updatePlayers({
      x: {
        name: data.get("namePlayer1")!.toString(),
        color: data.get("colorPlayer1")!.toString(),
      },
      o: {
        name: data.get("namePlayer2")!.toString(),
        color: data.get("colorPlayer2")!.toString(),
      },
    });

    navigate({ to: "/game" });
  };

  const handlePlayerColorInput = (event: InputEvent<HTMLInputElement>, player: Move) => {
    updatePlayers((currentState) => {
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
