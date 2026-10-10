import { createFileRoute } from '@tanstack/react-router'

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "../styles/splash.module.css";
import type { Board } from "@/types";

export const Route = createFileRoute('/')({
    loader: () => {
        const storageGame = localStorage.getItem("xo__game");

        if (storageGame === null) {
            return {
                board: null
            }
        }

        const storageBoard: Board = JSON.parse(storageGame);

        if (storageBoard.some((cell) => cell !== null)) {
            return {
                board: storageBoard
            }
        }

        return {
            board: null
        }
    },
    component: SplashScreen,
})

function SplashScreen() {
    const { board } = Route.useLoaderData()
    const navigate = Route.useNavigate()

    if (board) {
        return <dialog>Хотите продолжить?</dialog>
    }

    return (
        <main className={classes.main}>
            <img src={x} className={classes.bgIconX} />
            <img src={o} className={classes.bgIconO} />
            <img
                onClick={() => navigate({ to: '/settings' })}
                className={classes.logo}
                src={logo}
                alt="logo"
            />
        </main>
    );
}
