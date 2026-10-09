import { useContext } from "react";

import { gameContext } from "@/context";
import type { Players } from "@/types";
import Field from "../field";
import classes from "./board.module.css";

type BoardProps = {
  players: Players;
  winLine?: number[] | null;
  locked?: boolean;
  onSelect?: (index: number) => void;
};

export default function GameBoard({ players, winLine = null, locked = false, onSelect }: BoardProps) {
  const { board } = useContext(gameContext);

  return (
    <section className={classes.board}>
      {board.map((cell, index) => (
        <Field
          key={`field-${index}`}
          value={cell}
          color={cell ? players[cell].color : undefined}
          highlighted={winLine?.includes(index) ?? false}
          locked={locked}
          onClick={() => onSelect?.(index)}
        />
      ))}
    </section>
  );
}
