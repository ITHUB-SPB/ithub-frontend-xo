import { useContext } from "react";

import { gameContext } from "@/context";
import Field from "@/components/field";
import classes from "./board.module.css";

export default function Board() {
  const { board, players, appState, dispatch, winningCells } = useContext(gameContext);

  return (
    <div className={classes.board} role="group" aria-label="Игровое поле">
      {board.map((value, index) => (
        <Field
          key={index}
          value={value}
          index={index}
          color={value ? players[value].color : undefined}
          winning={winningCells.includes(index)}
          disabled={appState !== "progress"}
          onClick={() => dispatch({ type: "move", index })}
        />
      ))}
    </div>
  );
}
