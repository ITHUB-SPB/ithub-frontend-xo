import type { Move, Players } from "@/types";
import classes from "./legend.module.css";

type LegendProps = {
  players: Players;
  currentMove: Move;
};

function PlayerName({ name }: { name: string }) {
  return (
    <span className={classes.name}>{name}</span>
  );
}

export default function Legend({ players, currentMove }: LegendProps) {
  return (
    <section className={classes.legend}>
      <section className={`${classes.legend__item} ${currentMove === "x" ? classes.active : ""}`}>
        <span className={classes.legend__icon} style={{ color: players.x.color }}>X</span>
        <div><PlayerName name={players.x.name} /><small>{currentMove === "x" ? "Сейчас ходит" : "Ожидает"}</small></div>
      </section>
      <span className={classes.vs}>VS</span>
      <section className={`${classes.legend__item} ${currentMove === "o" ? classes.active : ""}`}>
        <span className={classes.legend__icon} style={{ color: players.o.color }}>O</span>
        <div><PlayerName name={players.o.name} /><small>{currentMove === "o" ? "Сейчас ходит" : "Ожидает"}</small></div>
      </section>
    </section>
  );
}
