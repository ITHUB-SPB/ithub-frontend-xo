import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AppState, Board, GameStatus, Players } from "@/types";

type GameSlice = typeof initialGameState & {
    updateBoard: (newBoard: Board) => void,
    updateStatus: (newStatus: GameStatus) => void,
    checkWinner: () => keyof Players | null,
    reset: () => void,
}

type PlayersSlice = typeof initialPlayersState & {
    setPlayers: (newPlayers: Players) => void;
}

type AppSlice = typeof initialAppState & {
    updateAppState: (newState: AppState) => void;
}

const initialAppState = {
    appState: "idle" as AppState
}

const initialPlayersState = {
    players: {
        x: { name: "Игрок 1", color: "salmon" },
        o: { name: "Игрок 2", color: "magenta" }
    }
}

const initialGameState = {
    board: Array(9).fill(null) as Board,
    status: "x-move" as GameStatus,
}

const createGameSlice: StateCreator<GameSlice, [], [], GameSlice> = (set, get) => ({
    ...initialGameState,
    checkWinner: () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        const board = get().board

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]
            }
        }

        return null;
    },
    updateBoard: (newBoard) => set(() => ({ board: newBoard })),
    updateStatus: (newStatus) => set(() => ({ status: newStatus })),
    reset: () => set(initialGameState)
})

const createPlayersSlice: StateCreator<PlayersSlice, [], [], PlayersSlice> = (set) => ({
    ...initialPlayersState,
    setPlayers: (newPlayers) => set(() => ({ players: newPlayers }))
})

const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (set) => ({
    ...initialAppState,
    updateAppState: (newState) => set(() => ({ appState: newState }))
})

// TODO: partialize persistance
export const useBoundStore = create<GameSlice & PlayersSlice & AppSlice>()(
    persist(
        devtools(
            (...a) => ({
                ...createGameSlice(...a),
                ...createPlayersSlice(...a),
                ...createAppSlice(...a)
            })
        ),
        { name: "xo" }
    )
)
