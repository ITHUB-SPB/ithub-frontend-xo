import {
    useEffect,
    useContext,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { AppState, Players } from "@/types";

import { BoardComponent, TimerComponent, LegendComponent } from "@/components";
import { gameContext } from "@/context";
import classes from "./game.module.css";

type GameScreenProps = {
    players: Players | null;
    updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function GameScreen({ updateAppState }: GameScreenProps) {
    const { status, resetGame } = useContext(gameContext);

    const isGameOver = status === "draw" || status.endsWith("-wins");

    useEffect(() => {
        if (isGameOver) {
            updateAppState("results");
        }
    }, [isGameOver, updateAppState]);

    const handleRestart = () => {
        resetGame();
        updateAppState("settings");
    };

    return (
        <main className={classes.main}>
            <h1>XO</h1>

            <div>
                <LegendComponent />
                <BoardComponent />
                <TimerComponent />
            </div>

            {status === "x-move" && <p>Ход крестиков</p>}
            {status === "o-move" && <p>Ход ноликов</p>}
            {status === "x-wins" && <p>Победили крестики</p>}
            {status === "o-wins" && <p>Победили нолики</p>}
            {status === "draw" && <p>Ничья</p>}

            <button onClick={handleRestart}>Сбросить игру</button>
        </main>
    );
}
