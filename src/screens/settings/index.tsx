import { useContext, useState, type SubmitEvent } from "react";

import { gameContext } from "@/context";
import Icon from "@/components/icon";
import type { Move, Player } from "@/types";
import classes from "./settings.module.css";

type PlayerSettingsProps = {
  mark: Move;
  player: Player;
  onChange: (player: Player) => void;
};

function PlayerSettings({ mark, player, onChange }: PlayerSettingsProps) {
  const title = mark === "x" ? "Крестики" : "Нолики";

  return (
    <fieldset className={classes.player}>
      <legend>{title}</legend>
      <Icon mark={mark} color={player.color} className={classes.icon} />
      <label className={classes.label} htmlFor={`name-${mark}`}>
        Имя игрока
      </label>
      <input
        id={`name-${mark}`}
        name={`name-${mark}`}
        type="text"
        value={player.name}
        maxLength={30}
        required
        autoComplete="off"
        onChange={(event) => {
          event.target.setCustomValidity("");
          onChange({ ...player, name: event.target.value });
        }}
      />
      <label className={classes.color}>
        <input
          type="color"
          name={`color-${mark}`}
          value={player.color}
          onChange={(event) => onChange({ ...player, color: event.target.value })}
        />
        <span>Цвет {mark === "x" ? "крестиков" : "ноликов"}</span>
      </label>
    </fieldset>
  );
}

export default function SettingsScreen() {
  const { players, dispatch } = useContext(gameContext);
  const [draft, setDraft] = useState(players);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const mark of ["x", "o"] as const) {
      if (!draft[mark].name.trim()) {
        const input = event.currentTarget.elements.namedItem(`name-${mark}`) as HTMLInputElement;
        input.setCustomValidity("Введите имя, а не только пробелы.");
        input.reportValidity();
        return;
      }
    }

    dispatch({
      type: "start",
      players: {
        x: { ...draft.x, name: draft.x.name.trim() },
        o: { ...draft.o, name: draft.o.name.trim() },
      },
    });
  };

  return (
    <main className={classes.main}>
      <header className="screen-heading">
        <p className="eyebrow">Перед первым ходом</p>
        <h1>Кто играет?</h1>
        <p>Выберите имена и цвета. Крестики начинают!</p>
      </header>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.players}>
          <PlayerSettings
            mark="x"
            player={draft.x}
            onChange={(player) => setDraft((current) => ({ ...current, x: player }))}
          />
          <span className={classes.versus} aria-hidden="true">
            VS
          </span>
          <PlayerSettings
            mark="o"
            player={draft.o}
            onChange={(player) => setDraft((current) => ({ ...current, o: player }))}
          />
        </div>
        <button className="button" type="submit">
          Начать
        </button>
      </form>
      <p className="hint">10 секунд на ход. Не успели? Походит случайная клетка.</p>
    </main>
  );
}
