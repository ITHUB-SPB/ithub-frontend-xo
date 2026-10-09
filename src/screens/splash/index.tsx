import type { Dispatch, SetStateAction } from "react";
import type { AppState } from "@/types";

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "./splash.module.css";

type SplashScreenProps = {
    updateAppState: Dispatch<SetStateAction<AppState>>;
    hasSavedGame: boolean;
    onContinue: () => void;
    onNewGame: () => void;
};

export default function SplashScreen({
    updateAppState,
    hasSavedGame,
    onContinue,
    onNewGame,
}: SplashScreenProps) {
    return (
        <main className={classes.main}>
            <img src={x} className={classes.bgIconX} />
            <img src={o} className={classes.bgIconO} />
            <img
                onClick={() => {
                    if (!hasSavedGame) {
                        updateAppState("settings");
                    }
                }}
                className={classes.logo}
                src={logo}
                alt="logo"
            />

            {hasSavedGame && (
                <section
                    className={classes.dialog}
                    role="dialog"
                    aria-modal="true"
                >
                    <h2>У вас есть незавершенная игра</h2>
                    <p>Хотите продолжить с того места, где остановились?</p>

                    <div className={classes.dialogActions}>
                        <button type="button" onClick={onContinue}>
                            Продолжить
                        </button>

                        <button type="button" onClick={onNewGame}>
                            Новая игра
                        </button>
                    </div>
                </section>
            )}
        </main>
    );
}
