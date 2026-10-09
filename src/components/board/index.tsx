import { useContext } from "react";

import { gameContext } from "@/context";
import { FieldComponent } from "@/components";
import classes from "./board.module.css";

type BoardProps = {
    compact?: boolean;
};

export default function Board({ compact = false }: BoardProps) {
    const { board, status, playMove } = useContext(gameContext);

    const isGameOver = status === "draw" || status.endsWith("-wins");

    return (
        <main className={`${classes.board} ${compact ? classes.compact : ""}`}>
            {board.map((field, ix) => (
                <FieldComponent
                    key={`field-${ix}`}
                    value={field}
                    disabled={isGameOver}
                    onClick={() => playMove(ix)}
                />
            ))}
        </main>
    );
}
