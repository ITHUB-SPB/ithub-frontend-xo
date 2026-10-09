import type { CSSProperties } from "react";

import oIcon from "@/assets/o.svg";
import xIcon from "@/assets/x.svg";
import { getReadableColor } from "@/game";
import type { Move, Players } from "@/types";
import classes from "./legend.module.css";

type LegendProps = {
  players: Players;
  currentMove: Move | null;
};

const ICONS: Record<Move, string> = { x: xIcon, o: oIcon };
const MOVES: Move[] = ["x", "o"];

export default function Legend({ players, currentMove }: LegendProps) {
  return (
    <section className={classes.legend}>
      {MOVES.map((move) => {
        const player = players[move];
        const isActive = currentMove === move;
        const style = {
          "--player-color": player.color,
          "--player-ink": getReadableColor(player.color),
        } as CSSProperties;

        return (
          <section
            key={move}
            className={`${classes.legend__item} ${isActive ? classes.active : classes.inactive}`}
            style={style}
          >
            <img src={ICONS[move]} className={classes.legend__icon} alt={move} />
            <span className={classes.name}>{player.name}</span>
            <span className={classes.turn}>{isActive ? "Ваш ход" : "Ожидает"}</span>
          </section>
        );
      })}
    </section>
  );
}
