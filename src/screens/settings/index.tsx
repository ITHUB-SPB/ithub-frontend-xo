import {
    useRef,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type SubmitEvent,
} from "react";

import type { AppState, Move, Players } from "@/types";
import classes from "./settings.module.css";

type SettingsScreenProps = {
    players: Players;
    setPlayers: Dispatch<SetStateAction<Players>>;
    updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SettingsScreen({
    players,
    setPlayers,
    updateAppState,
}: SettingsScreenProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const updatePlayer = (
        player: Move,
        field: "name" | "color",
        value: string,
    ) => {
        setPlayers((current) => ({
            ...current,
            [player]: {
                ...current[player],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const xName = players.x.name.trim();
        const oName = players.o.name.trim();

        if (!xName || !oName) {
            return;
        }

        setPlayers((current) => ({
            ...current,
            x: { ...current.x, name: xName },
            o: { ...current.o, name: oName },
        }));

        updateAppState("game");
    };

    return (
        <main className={classes.main}>
            <form onSubmit={handleSubmit}>
                <h2>Настройка игроков</h2>

                <section>
                    <label>
                        Игрок 1 -
                        <input
                            ref={inputRef}
                            type="text"
                            name="namePlayer1"
                            value={players.x.name}
                            onChange={(event) =>
                                updatePlayer("x", "name", event.target.value)
                            }
                            required
                            maxLength={24}
                        />
                    </label>

                    <label>
                        - Цвет крестиков -
                        <input
                            type="color"
                            name="colorPlayer1"
                            value={players.x.color}
                            onChange={(event) =>
                                updatePlayer("x", "color", event.target.value)
                            }
                        />
                    </label>
                </section>

                <section>
                    <label>
                        Игрок 2 -
                        <input
                            type="text"
                            name="namePlayer2"
                            value={players.o.name}
                            onChange={(event) =>
                                updatePlayer("o", "name", event.target.value)
                            }
                            required
                            maxLength={24}
                        />
                    </label>

                    <label>
                        - Цвет ноликов -
                        <input
                            type="color"
                            name="colorPlayer2"
                            value={players.o.color}
                            onChange={(event) =>
                                updatePlayer("o", "color", event.target.value)
                            }
                        />
                    </label>
                </section>

                <button type="submit">Начать</button>
            </form>
        </main>
    );
}
