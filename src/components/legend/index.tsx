import { useContext } from "react";

import { gameContext } from "@/context";
import type { Move, Player } from "@/types";
import Icon from "@/components/icon";
import classes from "./legend.module.css";

type PlayerInfoProps = {
  mark: Move;
  player: Player;
  active: boolean;
  playing: boolean;
};

function PlayerInfo({ mark, player, active, playing }: PlayerInfoProps) {
  return (
    <div className={`${classes.player} ${playing && !active ? classes.inactive : ""}`}>
      <Icon mark={mark} color={player.color} className={classes.icon} />
      <div className={classes.info}>
        <span className={classes.name}>{player.name}</span>
        <span className={classes.caption}>
          {playing && active ? "Сейчас ходит" : mark === "x" ? "Крестики" : "Нолики"}
        </span>
      </div>
    </div>
  );
}

export default function Legend() {
  const { players, status, appState } = useContext(gameContext);
  const playing = appState === "progress";

  return (
    <section className={classes.legend} aria-label="Игроки">
      <PlayerInfo mark="x" player={players.x} active={status === "x-move"} playing={playing} />
      <span className={classes.versus} aria-hidden="true">
        VS
      </span>
      <PlayerInfo mark="o" player={players.o} active={status === "o-move"} playing={playing} />
    </section>
  );
}
