import { useContext } from "react";

import { gameContext } from "@/context";
import { BoardComponent } from "@/components";
import type { Players } from "@/types";
import classes from "../splash/splash.module.css";

type ResultsScreenProps = {
    players: Players;
    onNewGame: () => void;
};

export default function ResultsScreen({
    players,
    onNewGame,
}: ResultsScreenProps) {
    const { status } = useContext(gameContext);

    const winner =
        status === "x-wins"
            ? players.x
            : status === "o-wins"
              ? players.o
              : null;

    return (
        <main className={classes.main}>
            <section className={classes.dialog}>
                <h2>Результаты</h2>

                {winner ? <p>Победитель — {winner.name}!</p> : <p>Ничья!</p>}

                <BoardComponent compact />

                <button type="button" onClick={onNewGame}>
                    Новая игра
                </button>
            </section>
        </main>
    );
}
