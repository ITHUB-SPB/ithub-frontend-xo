import { createContext, useState, type PropsWithChildren } from "react";

import type { Board, GameStatus, Move, SavedGame } from "@/types";
import { getWinner, isDraw } from "./utils/game";

type GameContextValue = {
    board: Board;
    status: GameStatus;
    playMove: (index: number) => void;
    resetGame: () => void;
    restoreGame: (savedGame: SavedGame) => void;
};

export const gameContext = createContext<GameContextValue>(undefined!);

export function GameContext({ children }: PropsWithChildren) {
    const [board, updateBoard] = useState<Board>(Array(9).fill(null));
    const [status, updateStatus] = useState<GameStatus>("x-move");

    const playMove = (index: number) => {
        if (status !== "x-move" && status !== "o-move") {
            return;
        }

        if (index < 0 || index >= board.length || board[index] !== null) {
            return;
        }

        const currentMove: Move = status === "x-move" ? "x" : "o";

        const nextBoard = board.map((cell, cellIndex) =>
            cellIndex === index ? currentMove : cell,
        );

        const winner = getWinner(nextBoard);
        const nextStatus: GameStatus = winner
            ? `${winner}-wins`
            : isDraw(nextBoard)
              ? "draw"
              : currentMove === "x"
                ? "o-move"
                : "x-move";

        updateBoard(nextBoard);
        updateStatus(nextStatus);

        if (nextStatus === "draw" || nextStatus.endsWith("-wins")) {
            localStorage.removeItem("xo__game");
        } else {
            const savedGame: SavedGame = {
                move: nextStatus === "x-move" ? "x" : "o",
                board: nextBoard,
            };

            localStorage.setItem("xo__game", JSON.stringify(savedGame));
        }
    };

    const resetGame = () => {
        updateBoard(Array(9).fill(null));
        updateStatus("x-move");
        localStorage.removeItem("xo__game");
    };

    const restoreGame = (savedGame: SavedGame) => {
        updateBoard([...savedGame.board]);
        updateStatus(`${savedGame.move}-move`);
    };

    return (
        <gameContext.Provider
            value={{
                board,
                status,
                playMove,
                resetGame,
                restoreGame,
            }}
        >
            {children}
        </gameContext.Provider>
    );
}
