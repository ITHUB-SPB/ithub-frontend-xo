import { createContext, useState, type PropsWithChildren } from "react";

import type { Board, GameStatus, Move } from "@/types";
import { getWinner, isDraw } from "./utils/game";

type GameContextValue = {
    board: Board;
    status: GameStatus;
    playMove: (index: number) => void;
    resetGame: () => void;
    restoreGame: (board: Board, move: Move) => void;
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

        updateBoard(nextBoard);

        const winner = getWinner(nextBoard);

        if (winner) {
            updateStatus(`${winner}-wins`);
            return;
        }

        if (isDraw(nextBoard)) {
            updateStatus("draw");
            return;
        }

        updateStatus(currentMove === "x" ? "o-move" : "x-move");
    };

    const resetGame = () => {
        updateBoard(Array(9).fill(null));
        updateStatus("x-move");
    };

    const restoreGame = (savedBoard: Board, move: Move) => {
        updateBoard([...savedBoard]);
        updateStatus(`${move}-move`);
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
