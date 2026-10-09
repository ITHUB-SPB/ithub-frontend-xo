import type { Board, Move } from "@/types";

export const winningLines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function getWinningLine(board: Board): number[] | null {
    for (const line of winningLines) {
        const [a, b, c] = line;

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return line;
        }
    }

    return null;
}

export function getWinner(board: Board): Move | null {
    const line = getWinningLine(board);
    return line ? board[line[0]] : null;
}

export function isDraw(board: Board): boolean {
    return board.every((cell) => cell !== null) && !getWinner(board);
}
