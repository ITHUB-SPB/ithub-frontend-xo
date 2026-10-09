import { useEffect, useState, useContext } from "react";

import { gameContext } from "./context";
import {
    SplashScreen,
    SettingsScreen,
    GameScreen,
    ResultsScreen,
} from "@/screens";
import type { AppState, Move, Players, SavedGame } from "@/types";

const defaultPlayers: Players = {
    x: { name: "Игрок 1", color: "#ff6b6b" },
    o: { name: "Игрок 2", color: "#b56bff" },
};

function isMove(value: unknown): value is Move {
    return value === "x" || value === "o";
}

function isSavedGame(value: unknown): value is SavedGame {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const game = value as Record<string, unknown>;

    return (
        isMove(game.move) &&
        Array.isArray(game.board) &&
        game.board.length === 9 &&
        game.board.every((cell) => cell === null || isMove(cell))
    );
}

function isPlayers(value: unknown): value is Players {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const data = value as Record<string, unknown>;

    return (["x", "o"] as const).every((key) => {
        const player = data[key];

        if (typeof player !== "object" || player === null) {
            return false;
        }

        const item = player as Record<string, unknown>;

        return (
            typeof item.name === "string" &&
            typeof item.color === "string" &&
            /^#[0-9a-f]{6}$/i.test(item.color)
        );
    });
}

export default function App() {
    const [appState, updateAppState] = useState<AppState>("idle");
    const [players, setPlayers] = useState<Players>(defaultPlayers);
    const [savedGame, setSavedGame] = useState<SavedGame | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const { resetGame, restoreGame } = useContext(gameContext);

    useEffect(() => {
        try {
            const storedPlayers = localStorage.getItem("xo__players");
            const storedGame = localStorage.getItem("xo__game");

            if (storedPlayers) {
                const parsedPlayers: unknown = JSON.parse(storedPlayers);

                if (isPlayers(parsedPlayers)) {
                    setPlayers(parsedPlayers);
                }
            }

            if (storedGame) {
                const parsedGame: unknown = JSON.parse(storedGame);

                if (isSavedGame(parsedGame)) {
                    setSavedGame(parsedGame);
                } else {
                    localStorage.removeItem("xo__game");
                }
            }
        } catch {
            localStorage.removeItem("xo__game");
            localStorage.removeItem("xo__players");
        } finally {
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("xo__players", JSON.stringify(players));
        }
    }, [players, isInitialized]);

    const startNewGame = () => {
        resetGame();
        setSavedGame(null);
        updateAppState("settings");
    };

    const continueGame = () => {
        if (!savedGame) {
            return;
        }

        restoreGame(savedGame);
        setSavedGame(null);
        updateAppState("game");
    };

    if (!isInitialized) {
        return null;
    }

    const screens = {
        idle: (
            <SplashScreen
                hasSavedGame={savedGame !== null}
                onContinue={continueGame}
                onNewGame={startNewGame}
                updateAppState={updateAppState}
            />
        ),
        settings: (
            <SettingsScreen
                players={players}
                setPlayers={setPlayers}
                updateAppState={updateAppState}
            />
        ),
        game: <GameScreen players={players} updateAppState={updateAppState} />,
        results: <ResultsScreen players={players} onNewGame={startNewGame} />,
    };

    return screens[appState];
}
