import { useContext, type Dispatch, type SetStateAction } from "react";

import { gameContext } from "@/context";
import type { Move, Players } from "@/types";
import Field from "../field";
import classes from "./board.module.css";

type BoardProps = {
  currentMove: Move;
  updateMove: Dispatch<SetStateAction<Move>>;
  players: Players;
  winningCells?: number[];
  readOnly?: boolean;
  onMove?: (nextMove: Move) => void;
};

export default function Board({
  currentMove,
  updateMove,
  players,
  winningCells = [],
  readOnly = false,
  onMove,
}: BoardProps) {
  const { board, updateBoard } = useContext(gameContext);

  const handleClick = (fieldIndex: number) => {
    if (readOnly || board[fieldIndex]) return;
    const nextMove = currentMove === "o" ? "x" : "o";
    updateBoard((state) => {
      return [...state.slice(0, fieldIndex), currentMove, ...state.slice(fieldIndex + 1)];
    });
    updateMove(nextMove);
    onMove?.(nextMove);
  };

  return (
    <main className={classes.board}>
      {board.map((field, ix) => (
        <Field
          key={`field-${ix}`}
          onClick={() => handleClick(ix)}
          value={field}
          color={field ? players[field].color : undefined}
          isWinning={winningCells.includes(ix)}
          readOnly={readOnly}
        />
      ))}
    </main>
  );
}
