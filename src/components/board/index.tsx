import { useContext, type Dispatch, type SetStateAction } from "react";

import { gameContext } from "@/context";
import type { Board, Move } from "@/types";
import classes from "./board.module.css";

type BoardProps = {
  currentMove: Move;
  updateMove: Dispatch<SetStateAction<Move>>;
};

export default function Board({ currentMove, updateMove }: BoardProps) {
  const { board, updateBoard } = useContext(gameContext);

  const handleClick = (fieldIndex: number) => {
    updateBoard((state) => {
      return [
        ...state.slice(0, fieldIndex),
        currentMove,
        ...state.slice(fieldIndex + 1),
      ];

      // const newState = [...state]
      // newState[fieldIndex] = currentMove
      // return newState
    });

    updateMove((state) => (state === "o" ? "x" : "o"));
  };

  function handleColorChange() {
    let players = JSON.parse(localStorage.getItem("xo__players")!);
    let playerColor = players[currentMove].color;
    return playerColor;
  }

  return (
    <main className={classes.board}>
      {board.map((field, ix) => (
        <button
          key={`field-${ix}`}
          className={classes.field}
          onClick={() => handleClick(ix)}
          onMouseUp={(event) => {
            const newColor = handleColorChange();
            event.currentTarget.style.background = newColor;
          }}
          disabled={Boolean(field)}
        >
          {field}
        </button>
      ))}
    </main>
  );
}
